import { pwaConfig } from '../app/const/app'
import type { NuxtOptions } from '@nuxt/schema'

export default {
  head: {
    title: pwaConfig.title,
    titleTemplate: pwaConfig.description,
    link: [
      { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
      { rel: 'preconnect', href: 'https://rsms.me/' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'canonical', href: pwaConfig.url },
    ],
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: pwaConfig.description,
      },
      { property: 'og:site_name', content: pwaConfig.title },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: pwaConfig.url,
      },
      {
        hid: 'og:image:secure_url',
        property: 'og:image:secure_url',
        content: pwaConfig.image,
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: pwaConfig.title,
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: pwaConfig.description,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: pwaConfig.image,
      },
      //Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: pwaConfig.url,
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: pwaConfig.title,
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: pwaConfig.description,
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: pwaConfig.image,
      },
    ],
  },
} as NuxtOptions['app']
