// Node Deps
import { defineNuxtPlugin } from '#app'
// Pinia Stores
import { useIndexStore } from '~/store'
// Composables
import { useServerOnlyAsync } from '~/composables/useServerOnly'
import { useClientOnlyAsync } from '~/composables/useClientOnly'

export default defineNuxtPlugin(async () => {
  const $pinia = usePinia()
  const indexStore = useIndexStore($pinia)

  // App
  await indexStore.init()
  // Server
  await useServerOnlyAsync(async () => {
    await indexStore.serverInit()
  })
  // Client
  await useClientOnlyAsync(async () => {
    await indexStore.clientInit()
  })
})
