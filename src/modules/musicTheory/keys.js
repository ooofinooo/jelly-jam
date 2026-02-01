export const ROOT_NOTES = ['A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab']

export const ALL_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const ALL_NOTES_FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

export const SCALE_PATTERNS = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10]
}

// Keys that use flats (major keys)
const FLAT_MAJOR_KEYS = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb']
// Keys that use flats (minor keys)
const FLAT_MINOR_KEYS = ['D', 'G', 'C', 'F', 'Bb', 'Eb']

export function getNoteIndex(note) {
  // Handle combined sharp/flat notation (e.g., "A#/Bb" -> "A#")
  let normalizedNote = note.includes('/') ? note.split('/')[0] : note
  // Also handle flat notation
  const flatIndex = ALL_NOTES_FLAT.indexOf(normalizedNote)
  if (flatIndex !== -1) return flatIndex
  return ALL_NOTES.indexOf(normalizedNote)
}

export function usesFlats(root, mode) {
  // Normalize root to check against flat keys
  const normalizedRoot = root.includes('/') ? root.split('/')[1] : root
  const sharpRoot = root.includes('/') ? root.split('/')[0] : root

  if (mode === 'major') {
    return FLAT_MAJOR_KEYS.includes(normalizedRoot) || FLAT_MAJOR_KEYS.includes(sharpRoot)
  } else {
    return FLAT_MINOR_KEYS.includes(normalizedRoot) || FLAT_MINOR_KEYS.includes(sharpRoot)
  }
}

export function getNoteAtInterval(root, semitones, preferFlats = false) {
  const rootIndex = getNoteIndex(root)
  if (rootIndex === -1) return null
  const noteIndex = (rootIndex + semitones) % 12
  return preferFlats ? ALL_NOTES_FLAT[noteIndex] : ALL_NOTES[noteIndex]
}

export function buildScale(root, mode) {
  const pattern = SCALE_PATTERNS[mode]
  if (!pattern) return []
  const preferFlats = usesFlats(root, mode)
  return pattern.map(interval => getNoteAtInterval(root, interval, preferFlats))
}

// Map from sharp-only notation to combined notation for dropdown
const NOTE_TO_ROOT = {
  'C': 'C', 'C#': 'C#/Db', 'D': 'D', 'D#': 'D#/Eb', 'E': 'E', 'F': 'F',
  'F#': 'F#/Gb', 'G': 'G', 'G#': 'G#/Ab', 'A': 'A', 'A#': 'A#/Bb', 'B': 'B'
}

export function getRelativeKey(key, fromMode) {
  // Relative minor is 3 semitones down from major
  // Relative major is 3 semitones up from minor
  const semitones = fromMode === 'major' ? 9 : 3 // 9 = -3 mod 12
  const note = getNoteAtInterval(key, semitones)
  return NOTE_TO_ROOT[note] || note
}
