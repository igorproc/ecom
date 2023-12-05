import type { NuxtOptions } from '@nuxt/schema'

export default {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "~/assets/_override.scss";`,
      },
    },
  },
} as NuxtOptions['vite']
