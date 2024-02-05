<template>
  <div class="app-notification">
    <ContextHolder />
  </div>
</template>

<script setup lang="ts">
// Node Deps
import { notification } from 'ant-design-vue'
// Pinia Stores
import { useNotificationStore } from '~/store/notification'

const { $listen } = useNuxtApp()
const [api, ContextHolder] = notification.useNotification()
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
    key: 'app-global-notification',
    type: notificationStore.notificationStatus,
    placement: notificationStore.notificationPosition,
    message: notificationStore.notificationMessage,
    duration: 1.5,
    onClose: () => notificationStore.closeErrorNotification(),
  })
}
</script>
