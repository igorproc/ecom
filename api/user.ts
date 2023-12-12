import axios from 'axios'

import {
  TResponseError,
  TUserData,
  TUserLoginInput,
  TUserLogin,
  TUserRegisterInput,
} from '~/types/api'
import { useNotificationStore } from '~/store/notification'

export const userApi = {
  createUser: async (registerData: TUserRegisterInput) => {
    try {
      const notificationStore = useNotificationStore()
      const requiredPayload = `email=${registerData.email}&password=${registerData.password}&birthday=${registerData.birthday}`
      const rolePayload = registerData.role ? `&role=${registerData.role}` : ''
      const payload = `${requiredPayload}${rolePayload}`

      const { data } = await axios.post<TUserLogin>(
        `/api/user/create?${payload}`
      )

      if (data.error || !data.token) {
        notificationStore.openErrorNotification(data.error.message)
        return
      }
      return data as { token: string, userData: TUserData }
    } catch (error) {
      throw new Error(error)
    }
  },

  loginUser: async (loginData: TUserLoginInput) => {
    try {
      const notificationStore = useNotificationStore()
      const requiredPayload = `email=${loginData.email}&password=${loginData.password}`
      const { data } = await axios.post<TUserLogin>(`/api/user/login?${requiredPayload}`)

      if (data.error || !data.userData) {
        notificationStore.openErrorNotification(data.error.message)
        return
      }
      return data as { token: string, userData: TUserData }
    } catch (error) {
      throw new Error(error)
    }
  },

  checkTokenOnValid: async (token: string) => {
    try {
      const notificationStore = useNotificationStore()
      const { data } = await axios.get<boolean | TResponseError>(`/api/user/checkAuthStatus?token=${token}`)

      if (data.error) {
        notificationStore.openErrorNotification(data.error.message)
        return
      }
      return data
    } catch (error) {
      throw new Error(error)
    }
  },

  getUserData: async (token: string) => {
    try {
      const notificationStore = useNotificationStore()
      const { data } = await axios.get<TUserData | TResponseError>(`/api/user/getUserData?token=${token}`)

      if (data.error) {
        notificationStore.openErrorNotification(data.error.message)
        return
      }
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
}
