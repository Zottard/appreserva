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
      imgBase: process.env.NUXT_PUBLIC_IMG_BASE || 'https://img-dev.tourexperto.com'
    }
  },
  icon: {
    provider: 'iconify',
    collections: ['tabler']
  },
})
