// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  ssr: false, // TresJS needs client-side rendering
  
  nitro: {
    preset: 'static'
  },
  
  modules: [
    '@tresjs/nuxt',
    '@primevue/nuxt-module'
  ],
  
  css: [
    './app/assets/css/main.css'
  ],

  app: {
    head: {
      title: 'Portfolio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'My Portfolio' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { 
          rel: 'stylesheet', 
          href: 'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Archivo+Black&display=swap' 
        }
      ]
    }
  }
})