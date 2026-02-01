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

// Combined notation for all 12 semitones (sharp first to match dropdown)
const SEMITONE_TO_NOTE = [
  'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B'
]

// Map note (including combined) to semitone index
const NOTE_TO_SEMITONE = {
  'C': 0, 'B#': 0,
  'C#': 1, 'Db': 1, 'C#/Db': 1,
  'D': 2,
  'D#': 3, 'Eb': 3, 'D#/Eb': 3,
  'E': 4,
  'F': 5, 'E#': 5,
  'F#': 6, 'Gb': 6, 'F#/Gb': 6,
  'G': 7,
  'G#': 8, 'Ab': 8, 'G#/Ab': 8,
  'A': 9,
  'A#': 10, 'Bb': 10, 'A#/Bb': 10,
  'B': 11
}

export function getChordNotes(root, chordType, scale = []) {
  const formula = CHORD_FORMULAS[chordType]
  if (!formula) return []

  const rootSemitone = NOTE_TO_SEMITONE[root]
  if (rootSemitone === undefined) return []

  // Check if scale uses combined notation
  const usesCombined = scale.some(note => note.includes('/'))

  return formula.map(interval => {
    const noteSemitone = (rootSemitone + interval) % 12

    if (usesCombined) {
      return SEMITONE_TO_NOTE[noteSemitone]
    }

    // For simple notation, find matching note from scale or use scale's style
    const scaleNote = scale.find(n => NOTE_TO_SEMITONE[n] === noteSemitone)
    if (scaleNote) return scaleNote

    // Fallback: determine if scale uses sharps or flats
    const usesFlats = scale.some(n => n.includes('b') && !n.includes('/'))
    const usesSharps = scale.some(n => n.includes('#') && !n.includes('/'))

    if (usesFlats && !usesSharps) {
      const FLAT_NOTES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
      return FLAT_NOTES[noteSemitone]
    } else {
      const SHARP_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
      return SHARP_NOTES[noteSemitone]
    }
  })
}

export function getChordSymbol(root, chordType) {
  const suffix = CHORD_SYMBOLS[chordType] || ''
  return root + suffix
}
