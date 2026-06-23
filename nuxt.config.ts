export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss'
  ],
  runtimeConfig: {
    backendToken: process.env.BACKEND_TOKEN || '',
    public: {
      apiUrl: process.env.API_URL || ''
    }
  },
  icon: {
    provider: 'iconify',
    collections: ['tabler']
  }
})
