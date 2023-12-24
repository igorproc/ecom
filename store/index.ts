// Node Deps
import { defineStore } from 'pinia'
import consola from 'consola'
import { NuxtApp } from '#app'
// Pinia Stores & Functions
import { initializeUser } from '~/store/user/init'
import { initializeWishlist } from '~/store/wishlist/init'

export const useIndexStore = defineStore('index-store', {
  actions: {
    async init() {
      return await new Promise(resolve => {
        setTimeout(() => {
          consola.log('App Init')
          resolve(true)
        })
      })
    },
    async clientInit() {
      return await Promise.all([
        initializeWishlist(),
      ])
      // return await new Promise(() => {
      //   setTimeout(() => {
      //     console.log('Client init')
      //   })
      // })
    },
    async serverInit() {
      return await Promise.all([
        initializeUser(),
        initializeWishlist(),
      ])
    },
  },
})
