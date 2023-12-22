import { NuxtOptions } from '@nuxt/schema'

export default {
  exclude: [
    './node_modules',
    './nuxt',
    './config',
  ],
} as NuxtOptions['eslint']
