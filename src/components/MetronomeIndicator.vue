<template>
  <div class="metronome-indicator d-flex justify-center align-center ga-2 mb-2">
    <div
      v-for="beat in totalBeats"
      :key="beat"
      class="beat-dot"
      :class="{
        'beat-active': isPlaying && currentBeat === beat,
        'beat-accent': beat === 1
      }"
    />
  </div>
</template>

<script setup>
defineProps({
  currentBeat: {
    type: Number,
    default: 0
  },
  totalBeats: {
    type: Number,
    default: 4
  },
  isPlaying: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.metronome-indicator {
  height: 20px;
}

.beat-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.15);
  transition: all 0.1s ease;
}

.beat-dot.beat-accent {
  width: 12px;
  height: 12px;
}

.beat-dot.beat-active {
  background-color: #7C4DFF;
  box-shadow: 0 0 12px rgba(124, 77, 255, 0.8);
  transform: scale(1.2);
}

.beat-dot.beat-active.beat-accent {
  background-color: #FF4081;
  box-shadow: 0 0 16px rgba(255, 64, 129, 0.8);
}
</style>
