// Node Deps
import { defineStore } from 'pinia'
import consola from 'consola'
// Pinia Stores
import { initializeUser } from '~/store/user/init'
import { initializeWishlist } from '~/store/wishlist/init'

export const useIndexStore = defineStore('index-store', {
  actions: {
    async init() {
      setTimeout(() => {
        consola.info('App init')
      }, 1000)
    },
    async clientInit() {
      setTimeout(() => {
        consola.info('server init')
      }, 1000)
    },
    async serverInit() {
      await Promise.all([
        await initializeUser(),
        await initializeWishlist(),
      ])
    },
  },
})
