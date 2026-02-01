export const CHORD_FORMULAS = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  diminished: [0, 3, 6],
  augmented: [0, 4, 8],
  maj7: [0, 4, 7, 11],
  min7: [0, 3, 7, 10],
  dom7: [0, 4, 7, 10],
  min7b5: [0, 3, 6, 10],
  dim7: [0, 3, 6, 9]
}

export const CHORD_SYMBOLS = {
  major: '',
  minor: 'm',
  diminished: 'dim',
  augmented: 'aug',
  maj7: 'maj7',
  min7: 'm7',
  dom7: '7',
  min7b5: 'm7♭5',
  dim7: 'dim7'
}

export function getChordNotes(root, chordType, preferFlats = false) {
  const formula = CHORD_FORMULAS[chordType]
  if (!formula) return []

  const ALL_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  const ALL_NOTES_FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

  const noteArray = preferFlats ? ALL_NOTES_FLAT : ALL_NOTES

  // Normalize root for lookup
  let rootIndex = ALL_NOTES.indexOf(root)
  if (rootIndex === -1) {
    rootIndex = ALL_NOTES_FLAT.indexOf(root)
  }
  if (rootIndex === -1) return []

  return formula.map(interval => {
    const noteIndex = (rootIndex + interval) % 12
    return noteArray[noteIndex]
  })
}

export function getChordSymbol(root, chordType) {
  const suffix = CHORD_SYMBOLS[chordType] || ''
  return root + suffix
}
