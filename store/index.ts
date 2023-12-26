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
        consola.log('App init')
      }, 1000)
    },
    async clientInit() {
      return await Promise.all([
        await initializeUser(),
        await initializeWishlist(),
      ])
    },
    async serverInit() {
      setTimeout(() => {
        consola.log('server init')
      }, 1000)
    },
  },
})
