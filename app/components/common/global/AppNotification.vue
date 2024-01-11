<template>
  <div class="app-notification" />
</template>

<script setup lang="ts">
// Node Deps
import { notification } from 'ant-design-vue'
// Pinia Stores
import { useNotificationStore } from '~/store/notification'

const { $listen } = useNuxtApp()
const [api] = notification.useNotification()
const notificationStore = useNotificationStore()

$listen('notification:open', () => openNotification())

const openNotification = () => {
  if (
    !notificationStore.notificationMessage ||
    !notificationStore.notificationPosition ||
    !notificationStore.notificationStatus
  ) {
    return
  }

  api.open({
    type: notificationStore.notificationStatus,
    placement: notificationStore.notificationPosition,
    message: notificationStore.notificationMessage,
    onClose: () => notificationStore.closeErrorNotification() as void,
  })
}
</script>
