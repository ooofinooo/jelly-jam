<template>
  <div class="d-flex justify-center ga-4">
    <v-btn
      v-if="!isPlaying"
      @click="$emit('play')"
      :loading="isLoading"
      color="primary"
      size="x-large"
      rounded="pill"
      prepend-icon="mdi-play"
      min-width="160"
    >
      Play
    </v-btn>
    <v-btn
      v-else
      @click="$emit('stop')"
      color="secondary"
      size="x-large"
      rounded="pill"
      prepend-icon="mdi-stop"
      min-width="160"
    >
      Stop
    </v-btn>
  </div>
</template>

<script setup>
defineProps({
  isPlaying: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['play', 'stop'])
</script>
