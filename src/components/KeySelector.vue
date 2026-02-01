<template>
  <div>
    <div class="d-flex align-center ga-3">
      <v-select
        :model-value="selectedKey"
        @update:model-value="$emit('update:selectedKey', $event)"
        :items="ROOT_NOTES"
        :disabled="disabled"
        label="Key"
        variant="outlined"
        density="comfortable"
        hide-details
        style="max-width: 120px"
      />
      <v-btn-toggle
        :model-value="mode"
        @update:model-value="$emit('update:mode', $event)"
        :disabled="disabled"
        mandatory
        color="primary"
        variant="outlined"
        divided
        density="comfortable"
      >
        <v-btn value="major">Major</v-btn>
        <v-btn value="minor">Minor</v-btn>
      </v-btn-toggle>
      <v-btn-toggle
        :model-value="use7ths ? 'on' : null"
        color="primary"
        variant="outlined"
        density="comfortable"
      >
        <v-btn
          value="on"
          :disabled="disabled"
          @click="$emit('update:use7ths', !use7ths)"
        >
          7<span style="font-size: 0.75em">ths</span>
        </v-btn>
      </v-btn-toggle>
    </div>
    <div class="text-caption text-medium-emphasis mt-2">
      Notes: {{ scaleNotes.join(' - ') }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ROOT_NOTES, buildScale } from '../modules/musicTheory/keys.js'

const props = defineProps({
  selectedKey: {
    type: String,
    default: 'C'
  },
  mode: {
    type: String,
    default: 'major'
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

defineEmits(['update:selectedKey', 'update:mode', 'update:use7ths'])

const scaleNotes = computed(() => {
  return buildScale(props.selectedKey, props.mode)
})
</script>
