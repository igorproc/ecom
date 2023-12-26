import AppConfig from './config/app.config'
import PwaConfig from './config/pwa.config'
import ViteConfig from './config/vite.config'
import S3Config from './config/s3.config'
import EslintConfig from './config/eslint.config'
import NitroConfig from './config/nitro.config'

const isProd = process.env.APP_MODE === 'production'
const isSsr = !!process.env.IS_SSR
// https://v3.nuxtjs.org/api/configuration/nuxt.config
// @ts-ignore
export default defineNuxtConfig({
  app: AppConfig,
  css: [
    'vuesax-alpha/theme-chalk/index.css',
    'vuesax-alpha/theme-chalk/dark/css-vars.css',
    '@/assets/main.scss',
  ],
  devtools: { enabled: !isProd },
  // import styles
  eslint: EslintConfig,
  experimental: {
    inlineSSRStyles: true,
  },

  // enable takeover mode
  modules: [
    // https://github.com/kevinmarrec/nuxt-pwa-module
    "@kevinmarrec/nuxt-pwa",
    // https://nuxt.com/modules/pinia
    "@pinia/nuxt",
    // https://nuxt.com/modules/vee-validate
    "@vee-validate/nuxt",
    // https://nuxt-s3.bg.tn/usage/validation
    "nuxt-s3",
    // https://nuxt.com/modules/eslint
    "@nuxtjs/eslint-module",
  ],

  nitro: NitroConfig,
  pwa: PwaConfig,
  runtimeConfig: {
    public: {
      s3Url: process.env.S3_URL || "",
      s3Bucket: process.env.S3_BUCKET_NAME || "",
    },
  },
  s3: S3Config,
  ssr: isSsr,
  typescript: { shim: false },
  vite: ViteConfig,
})
