import {
  ROOT_NOTES,
  buildScale,
  getChordFromRomanNumeral,
  getRandomChord,
  getRomanNumeralList,
  chordNotesToMidi,
  midiToNoteName
} from '../modules/musicTheory'

export function useMusicTheory() {
  return {
    ROOT_NOTES,
    buildScale,
    getChordFromRomanNumeral,
    getRandomChord,
    getRomanNumeralList,
    chordNotesToMidi,
    midiToNoteName
  }
}
