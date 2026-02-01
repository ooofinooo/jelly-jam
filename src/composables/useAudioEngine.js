import { ref, shallowRef } from 'vue'
import * as Tone from 'tone'

function volumeToDb(volume) {
  if (volume <= 0) return -Infinity
  return (volume / 100) * 40 - 30
}

export function useAudioEngine() {
  const isLoaded = ref(false)
  const isInitialized = ref(false)
  const sampler = shallowRef(null)
  const metronome = shallowRef(null)
  const metronomeBaseVolume = ref(-12)

  async function initialize() {
    // Start audio context (required for mobile browsers)
    await Tone.start()

    if (isInitialized.value) return

    sampler.value = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: 'triangle'
      },
      envelope: {
        attack: 0.02,
        decay: 0.3,
        sustain: 0.8,
        release: 1.5
      }
    }).toDestination()

    sampler.value.volume.value = -6

    metronome.value = new Tone.NoiseSynth({
      noise: {
        type: 'white'
      },
      envelope: {
        attack: 0.001,
        decay: 0.05,
        sustain: 0,
        release: 0.01
      }
    }).toDestination()

    metronome.value.volume.value = -12

    isInitialized.value = true
    isLoaded.value = true
  }

  function playChord(notes, duration = '1m') {
    if (!sampler.value || !isLoaded.value) return

    sampler.value.releaseAll()

    const noteNames = notes.map(note => {
      if (typeof note === 'string' && !note.match(/\d$/)) {
        return note + '3'
      }
      return note
    })

    sampler.value.triggerAttack(noteNames, Tone.now())
  }

  function releaseChord() {
    if (!sampler.value) return
    sampler.value.releaseAll()
  }

  function playMetronomeClick(isAccent = false, enabled = true) {
    if (!metronome.value || !isLoaded.value || !enabled) return

    const duration = isAccent ? '32n' : '64n'
    const accentBoost = isAccent ? 6 : 0
    metronome.value.volume.value = metronomeBaseVolume.value + accentBoost
    metronome.value.triggerAttackRelease(duration, Tone.now())
  }

  function setDroneVolume(volume) {
    if (!sampler.value) return
    sampler.value.volume.value = volumeToDb(volume)
  }

  function setMetronomeVolume(volume) {
    metronomeBaseVolume.value = volumeToDb(volume)
  }

  function setTempo(bpm) {
    Tone.getTransport().bpm.value = bpm
  }

  function scheduleRepeat(callback, interval) {
    return Tone.getTransport().scheduleRepeat(callback, interval)
  }

  function clearSchedule(eventId) {
    if (eventId !== undefined) {
      Tone.getTransport().clear(eventId)
    }
  }

  function startTransport() {
    Tone.getTransport().start()
  }

  function stopTransport() {
    Tone.getTransport().stop()
    Tone.getTransport().position = 0
  }

  function cleanup() {
    stopTransport()
    releaseChord()
    Tone.getTransport().cancel()

    if (sampler.value) {
      sampler.value.dispose()
      sampler.value = null
    }
    if (metronome.value) {
      metronome.value.dispose()
      metronome.value = null
    }

    isInitialized.value = false
    isLoaded.value = false
  }

  return {
    isLoaded,
    isInitialized,
    initialize,
    playChord,
    releaseChord,
    playMetronomeClick,
    setDroneVolume,
    setMetronomeVolume,
    setTempo,
    scheduleRepeat,
    clearSchedule,
    startTransport,
    stopTransport,
    cleanup
  }
}
