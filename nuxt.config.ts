import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  ssr: false,
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@vite-pwa/nuxt'
  ],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      htmlAttrs: { lang: 'es' },
      title: 'Tour Experto',
      meta: [
        { name: 'theme-color', content: '#2E0049' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: 'Tour Experto' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }
      ]
    }
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Tour Experto — Mis viajes',
      short_name: 'Tour Experto',
      description: 'Consultá el detalle de tu viaje, pasajeros, hoteles y documentos.',
      lang: 'es-AR',
      display: 'standalone',
      orientation: 'portrait',
      theme_color: '#2E0049',
      background_color: '#FFFFFF',
      start_url: '/',
      scope: '/',
      icons: [
        { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        { src: '/pwa-maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
      ]
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
      navigateFallback: '/',
      navigateFallbackDenylist: [/^\/api\//],
      cleanupOutdatedCaches: true
    },
    client: {
      installPrompt: false
    },
    devOptions: {
      enabled: false
    }
  },
  vite: {
    plugins: [tailwindcss()]
  },
  fonts: {
    families: [
      { name: 'Raleway', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Inter', provider: 'google', weights: [500] }
    ]
  },
  runtimeConfig: {
    apiUrl: process.env.API_URL || '',
    backendToken: process.env.BACKEND_TOKEN || '',
    useMock: process.env.USE_MOCK === 'true',
    public: {
      imagesUrl: process.env.IMAGES_URL || 'https://img-dev.tourexperto.com/'
    }
  },
  icon: {
    provider: 'iconify',
    collections: ['material-symbols']
  },
})
