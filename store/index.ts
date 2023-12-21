// Node Deps
import { defineStore } from 'pinia'
import consola from 'consola'
// Pinia Stores & Functions
import { initializeUser } from '~/store/user/init'

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
      return await initializeUser()
    },
    async serverInit() {
      return await new Promise(resolve => {
        setTimeout(() => {
          consola.log('Server init')
          resolve(true)
        })
      })
    },
  },
})
