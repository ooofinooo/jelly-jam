export const ROMAN_NUMERALS_MAJOR = {
  'I': { degree: 0, quality: 'major', quality7: 'maj7' },
  'ii': { degree: 1, quality: 'minor', quality7: 'min7' },
  'iii': { degree: 2, quality: 'minor', quality7: 'min7' },
  'IV': { degree: 3, quality: 'major', quality7: 'maj7' },
  'V': { degree: 4, quality: 'major', quality7: 'dom7' },
  'vi': { degree: 5, quality: 'minor', quality7: 'min7' },
  'vii°': { degree: 6, quality: 'diminished', quality7: 'min7b5' }
}

export const ROMAN_NUMERALS_MINOR = {
  'i': { degree: 0, quality: 'minor', quality7: 'min7' },
  'ii°': { degree: 1, quality: 'diminished', quality7: 'min7b5' },
  'III': { degree: 2, quality: 'major', quality7: 'maj7' },
  'iv': { degree: 3, quality: 'minor', quality7: 'min7' },
  'v': { degree: 4, quality: 'minor', quality7: 'min7' },
  'VI': { degree: 5, quality: 'major', quality7: 'maj7' },
  'VII': { degree: 6, quality: 'major', quality7: 'dom7' }
}

export function getRomanNumerals(mode) {
  return mode === 'major' ? ROMAN_NUMERALS_MAJOR : ROMAN_NUMERALS_MINOR
}

export function getRomanNumeralList(mode) {
  const numerals = getRomanNumerals(mode)
  return Object.keys(numerals)
}

// Convert roman numerals when switching between relative major/minor
const MAJOR_TO_MINOR_MAP = {
  'I': 'III',
  'ii': 'iv',
  'iii': 'v',
  'IV': 'VI',
  'V': 'VII',
  'vi': 'i',
  'vii°': 'ii°'
}

const MINOR_TO_MAJOR_MAP = {
  'i': 'vi',
  'ii°': 'vii°',
  'III': 'I',
  'iv': 'ii',
  'v': 'iii',
  'VI': 'IV',
  'VII': 'V'
}

export function convertNumeralsToRelative(numerals, fromMode) {
  const map = fromMode === 'major' ? MAJOR_TO_MINOR_MAP : MINOR_TO_MAJOR_MAP
  return numerals.map(n => map[n] || n).filter(Boolean)
}
