import { ROOT_NOTES, ALL_NOTES, buildScale, getRelativeKey, usesFlats, getNoteIndex } from './keys.js'
import { CHORD_FORMULAS, getChordNotes, getChordSymbol } from './chords.js'
import { getRomanNumerals, getRomanNumeralList, convertNumeralsToRelative, convertNumeralsByPosition } from './romanNumerals.js'

export {
  ROOT_NOTES,
  ALL_NOTES,
  CHORD_FORMULAS,
  buildScale,
  getRelativeKey,
  getChordNotes,
  getChordSymbol,
  getRomanNumerals,
  getRomanNumeralList,
  convertNumeralsToRelative,
  convertNumeralsByPosition
}

export function getChordFromRomanNumeral(key, mode, numeral, use7ths = false) {
  const scale = buildScale(key, mode)
  const numerals = getRomanNumerals(mode)
  const numeralInfo = numerals[numeral]

  if (!numeralInfo || !scale[numeralInfo.degree]) {
    return null
  }

  const root = scale[numeralInfo.degree]
  const quality = use7ths ? numeralInfo.quality7 : numeralInfo.quality
  const notes = getChordNotes(root, quality, scale)
  const symbol = getChordSymbol(root, quality)

  return {
    root,
    quality,
    notes,
    symbol,
    numeral
  }
}

export function getRandomChord(key, mode, selectedNumerals, use7ths = false) {
  if (!selectedNumerals || selectedNumerals.length === 0) {
    return null
  }

  const randomIndex = Math.floor(Math.random() * selectedNumerals.length)
  const numeral = selectedNumerals[randomIndex]

  return getChordFromRomanNumeral(key, mode, numeral, use7ths)
}

export function chordNotesToMidi(notes, octave = 3) {
  const midiNotes = notes.map(note => {
    let noteIndex = ALL_NOTES.indexOf(note)
    if (noteIndex === -1) {
      // Handle flats
      noteIndex = getNoteIndex(note)
    }
    return (octave + 1) * 12 + noteIndex
  })
  return midiNotes
}

export function midiToNoteName(midi) {
  const noteIndex = midi % 12
  const octave = Math.floor(midi / 12) - 1
  return ALL_NOTES[noteIndex] + octave
}
