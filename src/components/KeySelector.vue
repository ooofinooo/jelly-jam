<template>
  <div>
    <v-select
      :model-value="selectedKey"
      @update:model-value="$emit('update:selectedKey', $event)"
      :items="ROOT_NOTES"
      :disabled="disabled"
      label="Key"
      variant="outlined"
      density="comfortable"
      hide-details
      class="mb-3"
    />
    <v-btn-toggle
      :model-value="mode"
      @update:model-value="$emit('update:mode', $event)"
      :disabled="disabled"
      mandatory
      color="primary"
      variant="outlined"
      divided
      class="w-100"
    >
      <v-btn value="major" class="flex-grow-1">
        Major
      </v-btn>
      <v-btn value="minor" class="flex-grow-1">
        Minor
      </v-btn>
    </v-btn-toggle>
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
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:selectedKey', 'update:mode'])

const scaleNotes = computed(() => {
  return buildScale(props.selectedKey, props.mode)
})
</script>
