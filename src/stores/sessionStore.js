import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { convertNumeralsByPosition } from '../modules/musicTheory'

export const useSessionStore = defineStore('session', () => {
  const selectedKey = ref('C')
  const selectedMode = ref('major')
  const selectedNumerals = ref(['I', 'IV', 'V'])
  const use7ths = ref(false)
  const tempo = ref(80)
  const beatsPerChord = ref(4)
  const metronomeEnabled = ref(true)
  const droneEnabled = ref(true)
  const droneVolume = ref(30)
  const metronomeVolume = ref(50)

  const isPlaying = ref(false)
  const isLoading = ref(false)
  const currentChord = ref(null)
  const nextChord = ref(null)
  const currentBeat = ref(0)
  const error = ref(null)

  watch(selectedMode, (newMode) => {
    // Convert numerals by position (same degree in new mode)
    const convertedNumerals = convertNumeralsByPosition(selectedNumerals.value, newMode)
    selectedNumerals.value = convertedNumerals.length > 0 ? convertedNumerals : (newMode === 'minor' ? ['i', 'iv', 'v'] : ['I', 'IV', 'V'])
  })

  watch(selectedNumerals, (newNumerals) => {
    if (newNumerals.length > 0 && error.value) {
      error.value = null
    }
  })

  function setPlaying(value) {
    isPlaying.value = value
  }

  function setLoading(value) {
    isLoading.value = value
  }

  function setCurrentChord(chord) {
    currentChord.value = chord
  }

  function setNextChord(chord) {
    nextChord.value = chord
  }

  function setCurrentBeat(beat) {
    currentBeat.value = beat
  }

  function setError(err) {
    error.value = err
  }

  function reset() {
    isPlaying.value = false
    currentChord.value = null
    nextChord.value = null
    currentBeat.value = 0
    error.value = null
  }

  return {
    selectedKey,
    selectedMode,
    selectedNumerals,
    use7ths,
    tempo,
    beatsPerChord,
    metronomeEnabled,
    droneEnabled,
    droneVolume,
    metronomeVolume,
    isPlaying,
    isLoading,
    currentChord,
    nextChord,
    currentBeat,
    error,
    setPlaying,
    setLoading,
    setCurrentChord,
    setNextChord,
    setCurrentBeat,
    setError,
    reset
  }
})
