<template>
  <div class="mt-4">
    <div class="text-subtitle-2 text-medium-emphasis mb-2">
      Beats per Chord
    </div>
    <v-btn-toggle
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      mandatory
      color="primary"
      variant="outlined"
      divided
      :disabled="disabled"
    >
      <v-btn
        v-for="beats in beatOptions"
        :key="beats"
        :value="beats"
      >
        {{ beats }}
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script setup>
const beatOptions = [2, 3, 4, 6, 8]

defineProps({
  modelValue: {
    type: Number,
    default: 4
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>
