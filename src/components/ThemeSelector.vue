<template>
  <div class="theme-selector d-flex align-center ga-2">
    <v-btn
      :icon="darkMode ? 'mdi-weather-night' : 'mdi-white-balance-sunny'"
      variant="text"
      density="compact"
      size="small"
      @click="$emit('update:darkMode', !darkMode)"
    />
    <div class="theme-dots d-flex ga-1">
      <button
        v-for="key in THEME_KEYS"
        :key="key"
        class="theme-dot"
        :class="{ active: themeName === key }"
        :style="{ backgroundColor: THEMES[key][darkMode ? 'dark' : 'light'].primary }"
        :title="THEMES[key].name"
        @click="$emit('update:themeName', key)"
      />
    </div>
  </div>
</template>

<script setup>
import { THEMES, THEME_KEYS } from '../themes.js'

defineProps({
  themeName: {
    type: String,
    default: 'purple'
  },
  darkMode: {
    type: Boolean,
    default: true
  }
})

defineEmits(['update:themeName', 'update:darkMode'])
</script>

<style scoped>
.theme-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.15s ease;
}

.theme-dot:hover {
  transform: scale(1.1);
}

.theme-dot.active {
  border-color: white;
  box-shadow: 0 0 8px currentColor;
}
</style>
