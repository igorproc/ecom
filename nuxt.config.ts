import AppConfig from './config/app.config'
import PwaConfig from './config/pwa.config'
import ViteConfig from './config/vite.config'
import S3Config from './config/s3.config'
import EslintConfig from './config/eslint.config'

const isProd = process.env.APP_MODE === 'production'
const isSsr = !!process.env.IS_SSR
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: AppConfig,
  srcDir: 'app',
  // import styles
  css: [
    '@/assets/main.scss',
  ],
  devtools: { enabled: !isProd },

  // enable takeover mode
  modules: [
    // https://antdv.com/
    '@ant-design-vue/nuxt',
    // https://vite-pwa-org.netlify.app/frameworks/nuxt.html
    '@vite-pwa/nuxt',
    // https://nuxt.com/modules/pinia
    '@pinia/nuxt',
    // https://nuxt.com/modules/vee-validate
    '@vee-validate/nuxt',
    // https://nuxt-s3.bg.tn/
    'nuxt-s3',
    // https://nuxt.com/modules/eslint
    // '@nuxtjs/eslint-module',
  ],

  pwa: PwaConfig,
  runtimeConfig: {
    public: {
      isProduction: isProd,
      s3Url: process.env.S3_URL || '',
      s3Bucket: process.env.S3_BUCKET_NAME || '',
    },
  },
  nitro: {
    routeRules: {
      '/api/**': {
        proxy: `${process.env.API_URL}/**` || '',
        cors: true,
      },
      '/admin/**': { ssr: false },
    },
  },
  // eslint: EslintConfig,
  s3: S3Config,
  ssr: isSsr,
  typescript: { shim: false },
  vite: ViteConfig,
})
