// Types & Interfaces
import { POSITION, TYPE } from 'vue-toastification'

interface INotificationStoreState {
  notificationIsOpen: boolean,
  notificationStatus: keyof typeof TYPE | null,
  notificationMessage: string | null,
  notificationPosition: keyof typeof POSITION | null,
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

      this.notificationPosition = 'BOTTOM_RIGHT'
      this.notificationIsOpen = true
      this.notificationStatus = 'ERROR'
      this.notificationMessage = message
      if (icon) {
        this.notificationIcon = icon
      }
      $emit('notification:open')
    },
    openInfoNotification(message: string) {
      const { $emit } = useNuxtApp()

      this.notificationPosition = 'TOP_RIGHT'
      this.notificationIsOpen = true
      this.notificationStatus = 'INFO'
      this.notificationMessage = message

      $emit('notification:open')
    },
    closeNotification() {
      this.notificationIsOpen = false
      this.notificationPosition = null
      this.notificationStatus = null
      this.notificationMessage = null
    },
  },
})
