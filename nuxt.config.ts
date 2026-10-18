
export default defineNuxtConfig({
  devtools: { enabled: false },

  compatibilityDate: '2024-11-01',
  ssr: false,
  modules: ['@pinia/nuxt'],
  css: ['~/assets/css/main.css'],

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s · AgriTrack',
      title: 'AgriTrack',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Harvest logbook for small farmers: record crops and harvests.'
        }
      ]
    }
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
    }
  }
})
