<template>
  <div>
    <div class="text-subtitle-2 text-medium-emphasis mb-2 mt-4">
      Chord Progression (tap to add)
    </div>
    <div class="d-flex flex-wrap pt-2">
      <div v-for="numeral in numerals" :key="numeral" class="chord-chip-wrapper ma-1 mt-2">
        <v-chip
          :disabled="disabled"
          variant="outlined"
          size="large"
          class="chord-chip"
          @click="addChord(numeral)"
        >
          {{ numeral }} <span class="chip-chord-label">({{ getChordSymbol(numeral) }})</span>
        </v-chip>
        <div class="chip-notes text-caption text-medium-emphasis">
          {{ getChordNotes(numeral) }}
        </div>
      </div>
    </div>

    <div class="text-subtitle-2 text-medium-emphasis mb-2 mt-3">Sequence (tap to remove)</div>
    <div v-if="modelValue.length > 0" class="selected-chords">
      <span
        v-for="(numeral, index) in modelValue"
        :key="index"
        :class="['chord-name', { clickable: !disabled }]"
        @click="removeChord(index)"
      >
        <span class="chord-symbol">{{ getChordSymbol(numeral) }} <span class="chord-numeral-label">({{ numeral }})</span></span>
        <span v-if="index < modelValue.length - 1" class="chord-separator">→</span>
      </span>
    </div>
    <div v-else class="selected-chords text-medium-emphasis text-body-2">
      Tap chords above to build your progression
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getRomanNumeralList, getChordFromRomanNumeral } from '../modules/musicTheory'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  mode: {
    type: String,
    default: 'major'
  },
  selectedKey: {
    type: String,
    default: 'C'
  },
  use7ths: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const numerals = computed(() => getRomanNumeralList(props.mode))

function addChord(numeral) {
  if (props.disabled) return
  emit('update:modelValue', [...props.modelValue, numeral])
}

function removeChord(index) {
  if (props.disabled) return
  const newValue = [...props.modelValue]
  newValue.splice(index, 1)
  emit('update:modelValue', newValue)
}

function getChordSymbol(numeral) {
  const chord = getChordFromRomanNumeral(props.selectedKey, props.mode, numeral, props.use7ths)
  return chord ? chord.symbol : ''
}

function getChordNotes(numeral) {
  const chord = getChordFromRomanNumeral(props.selectedKey, props.mode, numeral, props.use7ths)
  return chord ? chord.notes.join('•') : ''
}
</script>

<style scoped>
.selected-chords {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(124, 77, 255, 0.1);
  border-radius: 8px;
}

.chord-name {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.chord-symbol {
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(var(--v-theme-primary));
}

.chord-name.clickable {
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.15s;
}

.chord-name.clickable:hover {
  background: rgba(255, 255, 255, 0.1);
}

.chord-name.clickable:hover .chord-symbol {
  text-decoration: line-through;
  opacity: 0.7;
}

.chord-separator {
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.875rem;
}

.chord-numeral-label {
  opacity: 0.7;
  font-weight: 400;
  font-size: 0.85em;
}

.chip-chord-label {
  opacity: 0.7;
  font-weight: 400;
  font-size: 0.85em;
}

.chord-chip-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chord-chip {
  border-radius: 4px !important;
  min-width: 90px;
  justify-content: center;
}

.chip-notes {
  font-size: 0.7rem;
  margin-top: 2px;
}
</style>
