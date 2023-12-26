import { NuxtOptions } from '@nuxt/schema'

export default {
  routeRules: {
    '/api/**': process.env.APP_URL ? + `${process.env.APP_URL}/**` : 'http://localhost:3000/**'
  }
} as NuxtOptions['nitro']
