import type { NuxtOptions } from '@nuxt/schema'

export default {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/assets/stylesheets/additional.scss" as *;`,
      },
    },
  },
} as NuxtOptions['vite']
