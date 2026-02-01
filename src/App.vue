<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-2 pa-md-4" style="padding-bottom: 150px">
        <v-row justify="center">
          <v-col cols="12" md="10" lg="8">
            <div class="text-center mb-2">
              <h1 class="text-h4 font-weight-bold d-inline-flex align-center">
                <v-icon class="mr-2" color="primary">mdi-guitar-electric</v-icon>
                <span class="text-primary">Jelly</span><span class="text-secondary">Jam</span>
              </h1>
            </div>

            <ChordDisplay
              :chord="sessionStore.currentChord"
              :next-chord="sessionStore.nextChord"
              :is-playing="sessionStore.isPlaying"
            />

            <MetronomeIndicator
              :current-beat="sessionStore.currentBeat"
              :total-beats="sessionStore.beatsPerChord"
              :is-playing="sessionStore.isPlaying"
            />

            <TransportControls
              :is-playing="sessionStore.isPlaying"
              :is-loading="sessionStore.isLoading"
              @play="handlePlay"
              @stop="handleStop"
              class="mb-3"
            />

            <v-alert
              v-if="sessionStore.error"
              type="error"
              variant="tonal"
              class="mb-3"
              density="compact"
              :icon="false"
              closable
              @click:close="sessionStore.error = null"
            >
              {{ sessionStore.error }}
            </v-alert>

            <v-card class="pa-3 mb-16" variant="outlined">
              <KeySelector
                v-model:selected-key="sessionStore.selectedKey"
                v-model:mode="sessionStore.selectedMode"
                v-model:use7ths="sessionStore.use7ths"
                :disabled="sessionStore.isPlaying"
                class="mb-2"
              />

              <ChordSelector
                v-model="sessionStore.selectedNumerals"
                :mode="sessionStore.selectedMode"
                :selected-key="sessionStore.selectedKey"
                :use7ths="sessionStore.use7ths"
                :disabled="sessionStore.isPlaying"
              />

              <v-divider class="my-3" />

              <TempoControl
                v-model="sessionStore.tempo"
                :disabled="sessionStore.isPlaying"
              />

              <BeatsControl
                v-model="sessionStore.beatsPerChord"
                :disabled="sessionStore.isPlaying"
              />

              <v-divider class="my-3" />

              <div class="text-subtitle-2 text-medium-emphasis mb-2">Volume</div>
              <div class="d-flex align-center">
                <v-btn
                  :icon="sessionStore.metronomeEnabled ? 'mdi-metronome' : 'mdi-metronome-tick'"
                  :color="sessionStore.metronomeEnabled ? 'primary' : 'grey-darken-1'"
                  variant="text"
                  density="compact"
                  size="x-small"
                  @click="sessionStore.metronomeEnabled = !sessionStore.metronomeEnabled"
                />
                <v-slider
                  v-model="sessionStore.metronomeVolume"
                  :min="0"
                  :max="100"
                  :step="1"
                  :disabled="!sessionStore.metronomeEnabled"
                  color="primary"
                  track-color="grey-darken-3"
                  hide-details
                  density="compact"
                  class="flex-grow-1 ml-1"
                  @update:model-value="setMetronomeVolume"
                />
              </div>
              <div class="d-flex align-center mt-2">
                <v-btn
                  icon="mdi-piano"
                  :color="sessionStore.droneEnabled ? 'primary' : 'grey-darken-1'"
                  variant="text"
                  density="compact"
                  size="x-small"
                  @click="sessionStore.droneEnabled = !sessionStore.droneEnabled"
                />
                <v-slider
                  v-model="sessionStore.droneVolume"
                  :min="0"
                  :max="100"
                  :step="1"
                  :disabled="!sessionStore.droneEnabled"
                  color="primary"
                  track-color="grey-darken-3"
                  hide-details
                  density="compact"
                  class="flex-grow-1 ml-1"
                  @update:model-value="setDroneVolume"
                />
              </div>

              </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <div class="version-label">v0.7</div>
  </v-app>
</template>

<script setup>
import { onUnmounted } from 'vue'
import * as Tone from 'tone'
import { useSessionStore } from './stores/sessionStore'
import { usePracticeSession } from './composables/usePracticeSession'

import ChordDisplay from './components/ChordDisplay.vue'
import KeySelector from './components/KeySelector.vue'
import ChordSelector from './components/ChordSelector.vue'
import TempoControl from './components/TempoControl.vue'
import BeatsControl from './components/BeatsControl.vue'
import TransportControls from './components/TransportControls.vue'
import MetronomeIndicator from './components/MetronomeIndicator.vue'

const sessionStore = useSessionStore()
const { start, stop, cleanup, setDroneVolume, setMetronomeVolume } = usePracticeSession()

const handlePlay = async () => {
  // Unlock audio on iOS - must happen in user gesture handler
  await Tone.start()
  if (Tone.context.state !== 'running') {
    await Tone.context.resume()
  }
  await start()
}

const handleStop = () => {
  stop()
}

onUnmounted(() => {
  cleanup()
})
</script>

<style>
html, body {
  overflow-x: hidden;
}

.version-label {
  position: fixed;
  bottom: 8px;
  left: 12px;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.3);
  pointer-events: none;
  user-select: none;
}
</style>
