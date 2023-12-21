import { pwaConfig } from '../const/app'
import type { NuxtOptions } from '@nuxt/schema'

export default {
  meta: {
    name: pwaConfig.shortTitle,
    author: 'pr0s1k',
    theme_color: '#4f46e5',
    description: pwaConfig.description,
  },
  manifest: {
    name: pwaConfig.shortTitle,
    short_name: pwaConfig.shortTitle,
    theme_color: '#4f46e5',
    description: pwaConfig.description,
  },
} as NuxtOptions['pwa']
