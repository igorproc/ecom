<template>
  <div class="app-notification"></div>
</template>

<script setup lang="ts">
import { useNotificationStore } from '~/store/notification'
import { VsNotification } from 'vuesax-alpha'

const { $listen } = useNuxtApp()
const notificationStore = useNotificationStore()

$listen('notification:open', () => {
  if (
    !notificationStore.notificationMessage ||
    !notificationStore.notificationPosition ||
    !notificationStore.notificationStatus
  ) {
    return
  }
  VsNotification({
    progressAuto: true,
    color: notificationStore.notificationStatus,
    position: notificationStore.notificationPosition,
    text: notificationStore.notificationMessage,
    onClose: () => notificationStore.closeErrorNotification() as () => void
  })
})
</script>
