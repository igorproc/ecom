import AppConfig from './config/app.config'
import PwaConfig from './config/pwa.config'
import ViteConfig from './config/vite.config'
import S3Config from './config/s3.config'
import EslintConfig from './config/eslint.config'

const isProd = process.env.APP_MODE === 'production'
const isSsr = !!process.env.IS_SSR
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: isSsr,
  // import styles
  css: [
    'vuesax-alpha/theme-chalk/index.css',
    'vuesax-alpha/theme-chalk/dark/css-vars.css',
    '@/assets/main.scss',
  ],
  runtimeConfig: {
    public: {
      s3Url: process.env.S3_URL || '',
      s3Bucket: process.env.S3_BUCKET_NAME || '',
    },
  },

  // enable takeover mode
  typescript: { shim: false },

  modules: [
    // https://github.com/kevinmarrec/nuxt-pwa-module
    '@kevinmarrec/nuxt-pwa',
    // https://nuxt.com/modules/pinia
    '@pinia/nuxt',
    // https://nuxt.com/modules/vee-validate
    '@vee-validate/nuxt',
    // https://nuxt-s3.bg.tn/usage/validation
    'nuxt-s3',
    // https://nuxt.com/modules/eslint
    '@nuxtjs/eslint-module',
  ],
  app: AppConfig,
  pwa: PwaConfig,
  vite: ViteConfig,
  s3: S3Config,
  eslint: EslintConfig,
  devtools: { enabled: !isProd },
})
