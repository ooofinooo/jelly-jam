// Chord shapes for guitar (standard tuning EADGBE)
// Format: [string6, string5, string4, string3, string2, string1]
// Values: -1 = muted, 0 = open, 1+ = fret number

export const CHORD_SHAPES = {
  // Major chords
  'C': { frets: [-1, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0], baseFret: 1 },
  'D': { frets: [-1, -1, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2], baseFret: 1 },
  'E': { frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0], baseFret: 1 },
  'F': { frets: [1, 3, 3, 2, 1, 1], fingers: [1, 3, 4, 2, 1, 1], barres: [1], baseFret: 1 },
  'G': { frets: [3, 2, 0, 0, 0, 3], fingers: [2, 1, 0, 0, 0, 3], baseFret: 1 },
  'A': { frets: [-1, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0], baseFret: 1 },
  'B': { frets: [-1, 2, 4, 4, 4, 2], fingers: [0, 1, 2, 3, 4, 1], barres: [2], baseFret: 1 },

  // Minor chords
  'Cm': { frets: [-1, 3, 5, 5, 4, 3], fingers: [0, 1, 3, 4, 2, 1], barres: [3], baseFret: 1 },
  'Dm': { frets: [-1, -1, 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1], baseFret: 1 },
  'Em': { frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0], baseFret: 1 },
  'Fm': { frets: [1, 3, 3, 1, 1, 1], fingers: [1, 3, 4, 1, 1, 1], barres: [1], baseFret: 1 },
  'Gm': { frets: [3, 5, 5, 3, 3, 3], fingers: [1, 3, 4, 1, 1, 1], barres: [3], baseFret: 1 },
  'Am': { frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0], baseFret: 1 },
  'Bm': { frets: [-1, 2, 4, 4, 3, 2], fingers: [0, 1, 3, 4, 2, 1], barres: [2], baseFret: 1 },

  // Major 7th chords
  'Cmaj7': { frets: [-1, 3, 2, 0, 0, 0], fingers: [0, 3, 2, 0, 0, 0], baseFret: 1 },
  'Dmaj7': { frets: [-1, -1, 0, 2, 2, 2], fingers: [0, 0, 0, 1, 2, 3], baseFret: 1 },
  'Emaj7': { frets: [0, 2, 1, 1, 0, 0], fingers: [0, 3, 1, 2, 0, 0], baseFret: 1 },
  'Fmaj7': { frets: [1, -1, 2, 2, 1, 0], fingers: [1, 0, 3, 4, 2, 0], baseFret: 1 },
  'Gmaj7': { frets: [3, 2, 0, 0, 0, 2], fingers: [3, 2, 0, 0, 0, 1], baseFret: 1 },
  'Amaj7': { frets: [-1, 0, 2, 1, 2, 0], fingers: [0, 0, 2, 1, 3, 0], baseFret: 1 },
  'Bmaj7': { frets: [-1, 2, 4, 3, 4, 2], fingers: [0, 1, 3, 2, 4, 1], barres: [2], baseFret: 1 },

  // Minor 7th chords
  'Cm7': { frets: [-1, 3, 5, 3, 4, 3], fingers: [0, 1, 3, 1, 2, 1], barres: [3], baseFret: 1 },
  'Dm7': { frets: [-1, -1, 0, 2, 1, 1], fingers: [0, 0, 0, 2, 1, 1], baseFret: 1 },
  'Em7': { frets: [0, 2, 0, 0, 0, 0], fingers: [0, 1, 0, 0, 0, 0], baseFret: 1 },
  'Fm7': { frets: [1, 3, 1, 1, 1, 1], fingers: [1, 3, 1, 1, 1, 1], barres: [1], baseFret: 1 },
  'Gm7': { frets: [3, 5, 3, 3, 3, 3], fingers: [1, 3, 1, 1, 1, 1], barres: [3], baseFret: 1 },
  'Am7': { frets: [-1, 0, 2, 0, 1, 0], fingers: [0, 0, 2, 0, 1, 0], baseFret: 1 },
  'Bm7': { frets: [-1, 2, 4, 2, 3, 2], fingers: [0, 1, 3, 1, 2, 1], barres: [2], baseFret: 1 },

  // Dominant 7th chords
  'C7': { frets: [-1, 3, 2, 3, 1, 0], fingers: [0, 3, 2, 4, 1, 0], baseFret: 1 },
  'D7': { frets: [-1, -1, 0, 2, 1, 2], fingers: [0, 0, 0, 2, 1, 3], baseFret: 1 },
  'E7': { frets: [0, 2, 0, 1, 0, 0], fingers: [0, 2, 0, 1, 0, 0], baseFret: 1 },
  'F7': { frets: [1, 3, 1, 2, 1, 1], fingers: [1, 3, 1, 2, 1, 1], barres: [1], baseFret: 1 },
  'G7': { frets: [3, 2, 0, 0, 0, 1], fingers: [3, 2, 0, 0, 0, 1], baseFret: 1 },
  'A7': { frets: [-1, 0, 2, 0, 2, 0], fingers: [0, 0, 1, 0, 2, 0], baseFret: 1 },
  'B7': { frets: [-1, 2, 1, 2, 0, 2], fingers: [0, 2, 1, 3, 0, 4], baseFret: 1 },

  // Diminished chords
  'Cdim': { frets: [-1, 3, 4, 2, 4, 2], fingers: [0, 2, 3, 1, 4, 1], baseFret: 1 },
  'Ddim': { frets: [-1, -1, 0, 1, 0, 1], fingers: [0, 0, 0, 1, 0, 2], baseFret: 1 },
  'Edim': { frets: [0, 1, 2, 0, 2, 0], fingers: [0, 1, 2, 0, 3, 0], baseFret: 1 },
  'Fdim': { frets: [1, 2, 3, 1, 3, 1], fingers: [1, 2, 3, 1, 4, 1], barres: [1], baseFret: 1 },
  'Gdim': { frets: [3, 4, 5, 3, 5, 3], fingers: [1, 2, 3, 1, 4, 1], barres: [3], baseFret: 1 },
  'Adim': { frets: [-1, 0, 1, 2, 1, 2], fingers: [0, 0, 1, 3, 2, 4], baseFret: 1 },
  'Bdim': { frets: [-1, 2, 3, 4, 3, -1], fingers: [0, 1, 2, 4, 3, 0], baseFret: 1 },

  // m7b5 (half-diminished)
  'Cm7b5': { frets: [-1, 3, 4, 3, 4, -1], fingers: [0, 1, 3, 2, 4, 0], baseFret: 1 },
  'Dm7b5': { frets: [-1, -1, 0, 1, 1, 1], fingers: [0, 0, 0, 1, 1, 1], barres: [1], baseFret: 1 },
  'Em7b5': { frets: [0, 1, 2, 0, 3, 0], fingers: [0, 1, 2, 0, 3, 0], baseFret: 1 },
  'Fm7b5': { frets: [1, 2, 3, 1, 4, 1], fingers: [1, 2, 3, 1, 4, 1], barres: [1], baseFret: 1 },
  'Gm7b5': { frets: [3, 4, 3, 3, -1, -1], fingers: [2, 3, 1, 1, 0, 0], baseFret: 1 },
  'Am7b5': { frets: [-1, 0, 1, 0, 1, 0], fingers: [0, 0, 1, 0, 2, 0], baseFret: 1 },
  'Bm7b5': { frets: [-1, 2, 3, 2, 3, -1], fingers: [0, 1, 3, 2, 4, 0], baseFret: 1 },

  // Sharps/flats (using enharmonic equivalents where needed)
  'C#': { frets: [-1, 4, 6, 6, 6, 4], fingers: [0, 1, 3, 4, 4, 1], barres: [4], baseFret: 1 },
  'C#m': { frets: [-1, 4, 6, 6, 5, 4], fingers: [0, 1, 3, 4, 2, 1], barres: [4], baseFret: 1 },
  'D#': { frets: [-1, 6, 8, 8, 8, 6], fingers: [0, 1, 3, 4, 4, 1], barres: [6], baseFret: 1 },
  'D#m': { frets: [-1, 6, 8, 8, 7, 6], fingers: [0, 1, 3, 4, 2, 1], barres: [6], baseFret: 1 },
  'F#': { frets: [2, 4, 4, 3, 2, 2], fingers: [1, 3, 4, 2, 1, 1], barres: [2], baseFret: 1 },
  'F#m': { frets: [2, 4, 4, 2, 2, 2], fingers: [1, 3, 4, 1, 1, 1], barres: [2], baseFret: 1 },
  'G#': { frets: [4, 6, 6, 5, 4, 4], fingers: [1, 3, 4, 2, 1, 1], barres: [4], baseFret: 1 },
  'G#m': { frets: [4, 6, 6, 4, 4, 4], fingers: [1, 3, 4, 1, 1, 1], barres: [4], baseFret: 1 },
  'A#': { frets: [-1, 1, 3, 3, 3, 1], fingers: [0, 1, 2, 3, 4, 1], barres: [1], baseFret: 1 },
  'A#m': { frets: [-1, 1, 3, 3, 2, 1], fingers: [0, 1, 3, 4, 2, 1], barres: [1], baseFret: 1 },
}

// Map chord symbols to shape keys
export function getChordShape(symbol) {
  // Direct match
  if (CHORD_SHAPES[symbol]) {
    return CHORD_SHAPES[symbol]
  }

  // Handle flats by converting to sharps
  const flatToSharp = {
    'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#'
  }

  for (const [flat, sharp] of Object.entries(flatToSharp)) {
    if (symbol.startsWith(flat)) {
      const suffix = symbol.slice(2)
      const sharpSymbol = sharp + suffix
      if (CHORD_SHAPES[sharpSymbol]) {
        return CHORD_SHAPES[sharpSymbol]
      }
    }
  }

  // Try without suffix variations
  const root = symbol.match(/^[A-G][#b]?/)?.[0]
  if (root && CHORD_SHAPES[root]) {
    return CHORD_SHAPES[root]
  }

  return null
}
