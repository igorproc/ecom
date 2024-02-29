<template>
  <div class="app-notification" />
</template>

<script setup lang="ts">
// Node Deps
import { POSITION, TYPE, useToast } from 'vue-toastification'
// Pinia Stores
import { useNotificationStore } from '~/store/notification'

const { $listen } = useNuxtApp()
const toast = useToast()

const notificationStore = useNotificationStore()

$listen('notification:open', () => {
  const notificationData = getNotificationData()

  if (!notificationData) {
    return
  }

  toast(
    notificationData.message,
    notificationData.options,
  )
})

const getNotificationData = () => {
  if (
    !notificationStore.notificationMessage ||
    !notificationStore.notificationPosition ||
    !notificationStore.notificationStatus
  ) {
    return
  }

  const options = {
    type: TYPE[notificationStore.notificationStatus] || TYPE.INFO,
    position: POSITION[notificationStore.notificationPosition] || POSITION.BOTTOM_RIGHT,
    message: notificationStore.notificationMessage,
    timeout: 1500,
    onClose: notificationStore.closeNotification,
    showCloseButtonOnHover: true,
  }

  return {
    message: notificationStore.notificationMessage,
    options,
  }
}
</script>
