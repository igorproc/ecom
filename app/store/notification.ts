import type {
  IconType,
  NotificationPlacement,
} from 'ant-design-vue/es/notification/interface'

interface INotificationStoreState {
  notificationIsOpen: boolean,
  notificationStatus: IconType | null,
  notificationMessage: string | null,
  notificationPosition: NotificationPlacement | null,
  notificationIcon: string | null,
}

export const useNotificationStore = defineStore('notification-store', {
  state: (): INotificationStoreState => {
    return {
      notificationIsOpen: false,
      notificationStatus: null,
      notificationMessage: null,
      notificationPosition: null,
      notificationIcon: null,
    }
  },
  actions: {
    openErrorNotification(message: string, icon?: string) {
      const { $emit } = useNuxtApp()

      this.notificationPosition = 'bottomRight'
      this.notificationIsOpen = true
      this.notificationStatus = 'error'
      this.notificationMessage = message
      if (icon) {
        this.notificationIcon = icon
      }
      $emit('notification:open')
    },
    closeErrorNotification() {
      this.notificationIsOpen = false
      this.notificationPosition = null
      this.notificationStatus = null
      this.notificationMessage = null
    },
  },
})
