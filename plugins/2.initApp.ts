// Node Deps
import { defineNuxtPlugin, useNuxtApp } from '#app'
// Pinia Stores
import { useIndexStore } from '~/store'
// Composables
import { useServerOnly } from '~/composables/useServerOnly'
import { useClientOnly } from '~/composables/useClientOnly'

async function initApp() {
  const $pinia = usePinia()
  const nuxtApp = useNuxtApp()
  const indexStore = useIndexStore($pinia)

  async function onInit() {
    await indexStore.init()
  }
  async function onServerInit() {
    await indexStore.serverInit()
  }
  async function onClientInit() {
    await indexStore.clientInit()
  }

  await onInit()
  if (nuxtApp.payload.serverRendered) {
    // SSR MODE
    useServerOnly(async () => {
      await onServerInit()
    })
    useClientOnly(async () => {
      await onClientInit()
    })
    return
  }

  // SPA MODE
  await onServerInit()
  await onClientInit()
}

export default defineNuxtPlugin(async () => {
  await initApp()
})
