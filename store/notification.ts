import {
  TNotificationPosition,
} from '~/types/vuesax'
import { Color } from 'vuesax-alpha'

interface INotificationStoreState {
  notificationIsOpen: boolean,
  notificationStatus: Color | null,
  notificationMessage: string | null,
  notificationPosition: TNotificationPosition | null,
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

      this.notificationPosition = 'bottom-right'
      this.notificationIsOpen = true
      this.notificationStatus = 'danger'
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
