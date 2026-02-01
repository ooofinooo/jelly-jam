export const ROOT_NOTES = ['A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab']

export const ALL_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

// Scales - natural keys use simple notation, combined keys use combined notation
const MAJOR_SCALES = {
  'A': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
  'A#/Bb': ['A#/Bb', 'C', 'D', 'D#/Eb', 'F', 'G', 'A'],
  'B': ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
  'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  'C#/Db': ['C#/Db', 'D#/Eb', 'F', 'F#/Gb', 'G#/Ab', 'A#/Bb', 'C'],
  'D': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
  'D#/Eb': ['D#/Eb', 'F', 'G', 'G#/Ab', 'A#/Bb', 'C', 'D'],
  'E': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
  'F': ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
  'F#/Gb': ['F#/Gb', 'G#/Ab', 'A#/Bb', 'B', 'C#/Db', 'D#/Eb', 'F'],
  'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
  'G#/Ab': ['G#/Ab', 'A#/Bb', 'C', 'C#/Db', 'D#/Eb', 'F', 'G']
}

const MINOR_SCALES = {
  'A': ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  'A#/Bb': ['A#/Bb', 'C', 'C#/Db', 'D#/Eb', 'F', 'F#/Gb', 'G#/Ab'],
  'B': ['B', 'C#', 'D', 'E', 'F#', 'G', 'A'],
  'C': ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'],
  'C#/Db': ['C#/Db', 'D#/Eb', 'E', 'F#/Gb', 'G#/Ab', 'A', 'B'],
  'D': ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'],
  'D#/Eb': ['D#/Eb', 'F', 'F#/Gb', 'G#/Ab', 'A#/Bb', 'B', 'C#/Db'],
  'E': ['E', 'F#', 'G', 'A', 'B', 'C', 'D'],
  'F': ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb'],
  'F#/Gb': ['F#/Gb', 'G#/Ab', 'A', 'B', 'C#/Db', 'D', 'E'],
  'G': ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F'],
  'G#/Ab': ['G#/Ab', 'A#/Bb', 'B', 'C#/Db', 'D#/Eb', 'E', 'F#/Gb']
}

export function buildScale(root, mode) {
  const scales = mode === 'major' ? MAJOR_SCALES : MINOR_SCALES
  return scales[root] || []
}

export function getNoteIndex(note) {
  const noteMap = {
    'C': 0, 'B#': 0,
    'C#': 1, 'Db': 1, 'C#/Db': 1,
    'D': 2,
    'D#': 3, 'Eb': 3, 'D#/Eb': 3,
    'E': 4,
    'E#': 5, 'F': 5,
    'F#': 6, 'Gb': 6, 'F#/Gb': 6,
    'G': 7,
    'G#': 8, 'Ab': 8, 'G#/Ab': 8,
    'A': 9,
    'A#': 10, 'Bb': 10, 'A#/Bb': 10,
    'B': 11
  }
  return noteMap[note] ?? -1
}

export function usesFlats(root, mode) {
  // Check if the scale for this key uses flats
  const scale = buildScale(root, mode)
  return scale.some(note => note.includes('b'))
}

// Map from sharp-only notation to combined notation for dropdown
const NOTE_TO_ROOT = {
  'C': 'C', 'C#': 'C#/Db', 'Db': 'C#/Db',
  'D': 'D', 'D#': 'D#/Eb', 'Eb': 'D#/Eb',
  'E': 'E', 'F': 'F', 'F#': 'F#/Gb', 'Gb': 'F#/Gb',
  'G': 'G', 'G#': 'G#/Ab', 'Ab': 'G#/Ab',
  'A': 'A', 'A#': 'A#/Bb', 'Bb': 'A#/Bb', 'B': 'B'
}

export function getRelativeKey(key, fromMode) {
  const ALL_NOTES_SIMPLE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  const rootIndex = getNoteIndex(key)
  const semitones = fromMode === 'major' ? 9 : 3
  const noteIndex = (rootIndex + semitones) % 12
  const note = ALL_NOTES_SIMPLE[noteIndex]
  return NOTE_TO_ROOT[note] || note
}
