import '@mdi/font/css/materialdesignicons.css' // Material Design Icons
import 'vuetify/styles' // Global Vuetify styles
import { createVuetify, type ThemeDefinition } from 'vuetify'

const growthTrustTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#F8FAFC', // Soft Gray-Blue background
    surface: '#FFFFFF',    // Card backgrounds, etc.
    primary: '#2563EB',    // Deep Blue - Trust & Stability
    'primary-darken-1': '#1D4ED8',
    secondary: '#10B981',  // Success Green - Growth & Profit
    'secondary-darken-1': '#059669',
    accent: '#10B981',     // Success Green accent
    error: '#DC2626',      // Red 600
    info: '#3B82F6',       // Blue 500
    success: '#10B981',    // Green 600
    warning: '#F59E0B',    // Amber 500
    // Text colors
    'on-background': '#1F2937', // Charcoal text on main background
    'on-surface': '#374151',    // Gray-700 text on cards/surfaces
    'on-primary': '#FFFFFF',    // White text on primary color
    'on-secondary': '#FFFFFF',  // White text on secondary color
  }
}

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    // components and directives are auto-imported by vite-plugin-vuetify
    theme: {
      defaultTheme: 'growthTrustTheme',
      themes: {
        growthTrustTheme,
      }
    },
    defaults: {
      VBtn: {
        // variant: 'flat', // Example global default
        // color: 'primary',
      },
      VTextField: {
        variant: 'outlined',
        density: 'compact',
        hideDetails: 'auto',
      },
      VSelect: {
        variant: 'outlined',
        density: 'compact',
        hideDetails: 'auto',
      }
    }
  })
  // app.vueApp.use(vuetify) // This should be handled by vite-plugin-vuetify
  // The plugin's role is to create and configure the instance.
  // Nuxt will make it available, or vite-plugin-vuetify will use this configuration.
  // If issues persist, we might need to provide it explicitly:
  // return {
  //   provide: {
  //     vuetify,
  //   },
  // }
})