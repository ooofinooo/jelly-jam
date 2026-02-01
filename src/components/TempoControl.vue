<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-1">
      <span class="text-subtitle-2 text-medium-emphasis">Tempo</span>
      <span class="text-h6 font-weight-bold">{{ modelValue }} BPM</span>
    </div>
    <v-slider
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      :min="40"
      :max="240"
      :step="1"
      :disabled="disabled"
      color="primary"
      track-color="grey-darken-3"
      thumb-label
      hide-details
    >
      <template #prepend>
        <v-icon size="small" class="text-disabled">mdi-tortoise</v-icon>
      </template>
      <template #append>
        <v-icon size="small" class="text-disabled">mdi-rabbit</v-icon>
      </template>
    </v-slider>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Number,
    default: 100
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>
