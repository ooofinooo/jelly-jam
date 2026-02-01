<template>
  <v-card
    class="chord-display mb-4 d-flex align-center justify-center position-relative"
    :class="{ 'chord-active': isPlaying && chord }"
    variant="flat"
    color="surface"
    height="160"
  >
    <div class="d-flex align-center ga-6">
      <div class="text-center">
        <Transition name="fade" mode="out-in">
          <div
            v-if="chord"
            :key="chord.symbol"
            class="chord-symbol"
          >
            {{ chord.symbol }}
          </div>
          <div v-else class="chord-placeholder text-disabled">
            Select chords and press Play
          </div>
        </Transition>
        <div v-if="chord" class="chord-numeral text-medium-emphasis mt-2">
          {{ chord.numeral }}
        </div>
        <div v-if="chord" class="chord-notes text-caption text-medium-emphasis mt-1">
          {{ chord.notes.join(' - ') }}
        </div>
      </div>

      <Transition name="fade" mode="out-in">
        <ChordDiagram
          v-if="chord"
          :key="'diagram-' + chord.symbol"
          :chord-symbol="chord.symbol"
          size="medium"
        />
      </Transition>
    </div>

    <div v-if="nextChord && isPlaying" class="next-chord">
      <span class="next-label">next</span>
      <span class="next-symbol">{{ nextChord.symbol }}</span>
    </div>
  </v-card>
</template>

<script setup>
import ChordDiagram from './ChordDiagram.vue'

defineProps({
  chord: {
    type: Object,
    default: null
  },
  nextChord: {
    type: Object,
    default: null
  },
  isPlaying: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.chord-display {
  border-radius: 16px;
  transition: all 0.2s ease;
}

.chord-active {
  box-shadow: 0 0 30px rgba(124, 77, 255, 0.3);
}

.chord-symbol {
  font-size: 4rem;
  font-weight: 700;
  line-height: 1;
  background: linear-gradient(135deg, #7C4DFF 0%, #FF4081 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.chord-placeholder {
  font-size: 1.2rem;
}

.chord-numeral {
  font-size: 1.5rem;
  font-weight: 500;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

.next-chord {
  position: absolute;
  bottom: 12px;
  right: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  opacity: 0.6;
}

.next-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.5);
}

.next-symbol {
  font-size: 1.25rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
}
</style>
