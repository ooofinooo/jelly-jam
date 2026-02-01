import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'
import { THEMES } from './themes.js'

// Generate all theme variants
const themes = {}
for (const [key, theme] of Object.entries(THEMES)) {
  themes[`${key}-dark`] = {
    dark: true,
    colors: theme.dark
  }
  themes[`${key}-light`] = {
    dark: false,
    colors: theme.light
  }
}

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'purple-dark',
    themes
  }
})

const app = createApp(App)
app.use(createPinia())
app.use(vuetify)
app.mount('#app')
