import AppConfig from './config/app.config'
import PwaConfig from './config/pwa.config'
import ViteConfig from './config/vite.config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // import styles
  css: [
    'vuesax-alpha/theme-chalk/index.css',
    'vuesax-alpha/theme-chalk/dark/css-vars.css',
    '@/assets/main.scss'
  ],

  // enable takeover mode
  typescript: { shim: false },

  modules: [
    '@kevinmarrec/nuxt-pwa',
    '@pinia/nuxt',
    '@vee-validate/nuxt'
  ],
  app: AppConfig,
  pwa: PwaConfig,
  vite: ViteConfig,
  devtools: { enabled: true },
});
