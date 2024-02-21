import type { NuxtOptions } from '@nuxt/schema'

export default {
  exclude: [
    './node_modules',
    './nuxt',
    './config',
  ],
  include: ['./app']
} as NuxtOptions['eslint']
