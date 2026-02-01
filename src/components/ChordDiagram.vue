<template>
  <div class="chord-diagram" v-if="shape">
    <svg :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`">
      <!-- Nut (if at first fret) -->
      <rect
        v-if="shape.baseFret === 1"
        :x="padding"
        :y="padding"
        :width="(strings - 1) * stringSpacing"
        :height="4"
        fill="#FFF"
      />

      <!-- Fret position indicator -->
      <text
        v-if="minFret > 1"
        :x="padding - 12"
        :y="padding + fretSpacing / 2 + 4"
        fill="#888"
        font-size="11"
        text-anchor="middle"
      >
        {{ minFret }}
      </text>

      <!-- Frets -->
      <line
        v-for="fret in frets"
        :key="'fret-' + fret"
        :x1="padding"
        :y1="padding + fret * fretSpacing"
        :x2="padding + (strings - 1) * stringSpacing"
        :y2="padding + fret * fretSpacing"
        stroke="#555"
        stroke-width="1"
      />

      <!-- Strings -->
      <line
        v-for="string in strings"
        :key="'string-' + string"
        :x1="padding + (string - 1) * stringSpacing"
        :y1="padding"
        :x2="padding + (string - 1) * stringSpacing"
        :y2="padding + frets * fretSpacing"
        stroke="#AAA"
        :stroke-width="1 + (strings - string) * 0.3"
      />

      <!-- Barre -->
      <rect
        v-for="barre in shape.barres || []"
        :key="'barre-' + barre"
        :x="padding - dotRadius"
        :y="padding + (getDisplayFret(barre) - 0.5) * fretSpacing - dotRadius"
        :width="(strings - 1) * stringSpacing + dotRadius * 2"
        :height="dotRadius * 2"
        :rx="dotRadius"
        fill="#7C4DFF"
      />

      <!-- Finger positions -->
      <template v-for="(fret, index) in shape.frets" :key="'finger-' + index">
        <!-- Muted string -->
        <text
          v-if="fret === -1"
          :x="padding + index * stringSpacing"
          :y="padding - 8"
          fill="#888"
          font-size="12"
          text-anchor="middle"
        >
          ×
        </text>

        <!-- Open string -->
        <circle
          v-else-if="fret === 0"
          :cx="padding + index * stringSpacing"
          :cy="padding - 10"
          r="5"
          fill="none"
          stroke="#888"
          stroke-width="1.5"
        />

        <!-- Fretted note -->
        <circle
          v-else-if="!isPartOfBarre(fret, index)"
          :cx="padding + index * stringSpacing"
          :cy="padding + (getDisplayFret(fret) - 0.5) * fretSpacing"
          :r="dotRadius"
          fill="#7C4DFF"
        />
      </template>
    </svg>
  </div>
  <div v-else class="no-diagram text-disabled text-caption">
    No diagram
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getChordShape } from '../modules/musicTheory/chordShapes.js'

const props = defineProps({
  chordSymbol: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'medium',
    validator: (v) => ['small', 'medium', 'large'].includes(v)
  }
})

const sizes = {
  small: { width: 60, height: 80, padding: 15, stringSpacing: 8, fretSpacing: 12, dotRadius: 5 },
  medium: { width: 90, height: 110, padding: 20, stringSpacing: 12, fretSpacing: 18, dotRadius: 7 },
  large: { width: 120, height: 150, padding: 25, stringSpacing: 16, fretSpacing: 24, dotRadius: 9 }
}

const strings = 6
const frets = 5

const sizeConfig = computed(() => sizes[props.size])
const width = computed(() => sizeConfig.value.width)
const height = computed(() => sizeConfig.value.height)
const padding = computed(() => sizeConfig.value.padding)
const stringSpacing = computed(() => sizeConfig.value.stringSpacing)
const fretSpacing = computed(() => sizeConfig.value.fretSpacing)
const dotRadius = computed(() => sizeConfig.value.dotRadius)

const shape = computed(() => getChordShape(props.chordSymbol))

const minFret = computed(() => {
  if (!shape.value) return 1
  const fretted = shape.value.frets.filter(f => f > 0)
  return fretted.length ? Math.min(...fretted) : 1
})

function getDisplayFret(fret) {
  if (minFret.value <= 1) return fret
  return fret - minFret.value + 1
}

function isPartOfBarre(fret, stringIndex) {
  if (!shape.value?.barres) return false
  return shape.value.barres.includes(fret)
}
</script>

<style scoped>
.chord-diagram {
  display: inline-block;
}

.no-diagram {
  padding: 8px;
  text-align: center;
}
</style>
