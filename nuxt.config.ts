import AppConfig from './config/app.config'
import PwaConfig from './config/pwa.config'
import ViteConfig from './config/vite.config'

const isProd = process.env.APP_MODE === 'production'
const isSsr = !!process.env.IS_SSR
const proxyEnabled = !!process.env.PROXY_ENABLED
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: AppConfig,
  srcDir: 'app',
  ssr: isSsr,
  // import styles
  css: [
    '@/assets/main.scss',
  ],
  devtools: { enabled: !isProd },
  modules: [
    // https://antdv.com/
    '@ant-design-vue/nuxt',
    // https://vite-pwa-org.netlify.app/frameworks/nuxt.html
    '@vite-pwa/nuxt',
    // https://nuxt.com/modules/pinia
    '@pinia/nuxt',
    // https://nuxt.com/modules/vee-validate
    '@vee-validate/nuxt',
  ],
  pwa: PwaConfig,
  runtimeConfig: {
    public: {
      proxyEnabled: proxyEnabled,
      apiUrl: proxyEnabled ? '' : process.env.API_URL || '',
      isProduction: isProd,
    },
  },
  nitro: {
    routeRules: {
      '/api/**': {
        proxy: process.env.API_URL + '/**' || '',
        cors: true,
      }
    },
  },
  devServer: {
    host: String(process.env.NITRO_DEV_HOST) || '0.0.0.0',
    port: Number(process.env.NITRO_DEV_PORT) || 3000,
  },
  typescript: { shim: false },
  vite: ViteConfig,
})
