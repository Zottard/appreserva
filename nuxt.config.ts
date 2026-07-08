export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: false,
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss'
  ],
  runtimeConfig: {
    apiUrl: process.env.API_URL || '',
    backendToken: process.env.BACKEND_TOKEN || '',
    public: {
      imagesUrl: process.env.IMAGES_URL || 'https://img-dev.tourexperto.com/'
    }
  },
  icon: {
    provider: 'iconify',
    collections: ['tabler']
  },
})
