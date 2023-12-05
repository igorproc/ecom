import vuetify from 'vite-plugin-vuetify'

import AppConfig from './config/app.config'
import pwaConfig from './config/pwa.config'
import viteConfig from './config/vite.config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // import styles
  css: ["vuetify/lib/styles/main.sass", "@/assets/main.scss"],

  // enable takeover mode
  typescript: { shim: false },

  build: { transpile: ["vuetify"] },
  modules: [
    "@kevinmarrec/nuxt-pwa",
    "@pinia/nuxt",
    "@vee-validate/nuxt",
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // Doc: https://vuetifyjs.com/en/getting-started/installation/
        config.plugins.push(vuetify());
      });
    },
  ],
  app: AppConfig,
  vite: viteConfig,
  pwa: pwaConfig,
  devtools: { enabled: true },
});
