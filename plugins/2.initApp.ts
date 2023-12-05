import { defineNuxtPlugin, useNuxtApp } from '#app'
import { consola } from 'consola'

import { useIndexStore } from '~/store'
import { useServerOnly } from '~/composables/useServerOnly'
import { useClientOnly } from '~/composables/useClientOnly'

async function initApp() {
  const nuxtApp = useNuxtApp()
  const $pinia = usePinia()

  async function onInit() {
    const indexStore = useIndexStore($pinia)
    consola.info(await indexStore.init())
  }

  async function onServerInit() {
    const indexStore = useIndexStore($pinia)
    consola.info(await indexStore.serverInit())
  }

  async function onClientInit() {
    const indexStore = useIndexStore($pinia)
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
  } else {
    // SPA MODE
    await onServerInit()
    await onClientInit()
  }
}

export default defineNuxtPlugin(async () => {
  await initApp()
})
