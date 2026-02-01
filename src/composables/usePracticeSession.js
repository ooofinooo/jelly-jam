import { ref } from 'vue'
import { useSessionStore } from '../stores/sessionStore'
import { useAudioEngine } from './useAudioEngine'
import { getChordFromRomanNumeral } from '../modules/musicTheory'

export function usePracticeSession() {
  const store = useSessionStore()
  const audioEngine = useAudioEngine()

  const scheduledEventId = ref(null)
  let beatCount = 0
  let chordIndex = 0

  function generateNextChord() {
    if (store.selectedNumerals.length === 0) return null

    const numeral = store.selectedNumerals[chordIndex % store.selectedNumerals.length]
    chordIndex++

    return getChordFromRomanNumeral(
      store.selectedKey,
      store.selectedMode,
      numeral,
      store.use7ths
    )
  }

  function advanceChord() {
    const chord = store.nextChord || generateNextChord()
    if (chord) {
      store.setCurrentChord(chord)
      store.setNextChord(generateNextChord())
      if (store.droneEnabled) {
        audioEngine.playChord(chord.notes)
      } else {
        audioEngine.releaseChord()
      }
    }
  }

  function onBeat(time) {
    const currentBeatInMeasure = beatCount % store.beatsPerChord
    store.setCurrentBeat(currentBeatInMeasure + 1)

    const isDownbeat = currentBeatInMeasure === 0
    audioEngine.playMetronomeClick(isDownbeat, store.metronomeEnabled)

    if (isDownbeat) {
      advanceChord()
    }

    beatCount++
  }

  async function start() {
    if (store.selectedNumerals.length === 0) {
      store.setError('Please select at least one chord')
      return
    }

    store.setLoading(true)
    store.setError(null)

    try {
      await audioEngine.initialize()

      beatCount = 0
      chordIndex = 0
      audioEngine.setTempo(store.tempo)
      audioEngine.setDroneVolume(store.droneVolume)
      audioEngine.setMetronomeVolume(store.metronomeVolume)

      scheduledEventId.value = audioEngine.scheduleRepeat(onBeat, '4n')

      audioEngine.startTransport()
      store.setPlaying(true)
    } catch (err) {
      console.error('Failed to start session:', err)
      store.setError(`Audio error: ${err.message || 'Please tap Play again to enable audio.'}`)
    } finally {
      store.setLoading(false)
    }
  }

  function stop() {
    // Clear our scheduled event first
    if (scheduledEventId.value !== null) {
      audioEngine.clearSchedule(scheduledEventId.value)
      scheduledEventId.value = null
    }

    // Stop transport (also cancels all events)
    audioEngine.stopTransport()

    // Release chord immediately
    audioEngine.releaseChord()

    // Release again after a tick to catch any stragglers
    setTimeout(() => {
      audioEngine.releaseChord()
    }, 50)

    beatCount = 0
    chordIndex = 0
    store.reset()
  }

  function cleanup() {
    stop()
    audioEngine.cleanup()
  }

  return {
    start,
    stop,
    cleanup,
    setDroneVolume: audioEngine.setDroneVolume,
    setMetronomeVolume: audioEngine.setMetronomeVolume
  }
}
