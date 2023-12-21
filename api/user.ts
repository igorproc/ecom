// Node Deps
import axios from 'axios'
// Types & Interfaces
import {
  TResponseError,
  TUserData,
  TUserLoginInput,
  TUserLogin,
  TUserRegisterInput,
  TUserCheckJwt,
} from '~/types/api'
// Helper Stores
import { useNotificationStore } from '~/store/notification'

export const userApi = {
  createUser: async (registerData: TUserRegisterInput) => {
    try {
      const notificationStore = useNotificationStore()
      const requiredPayload = `email=${registerData.email}&password=${registerData.password}&birthday=${registerData.birthday}`
      const rolePayload = registerData.role ? `&role=${registerData.role}` : ''
      const payload = `${requiredPayload}${rolePayload}`

      const { data } = await axios.post<TUserLogin | TResponseError>(
        `/api/user/create?${payload}`,
      )

      if ('error' in data) {
        notificationStore.openErrorNotification(data.error.message)
        return
      }
      return data
    } catch (error) {
      throw error
    }
  },

  loginUser: async (loginData: TUserLoginInput) => {
    try {
      const notificationStore = useNotificationStore()
      const requiredPayload = `email=${loginData.email}&password=${loginData.password}`
      const { data } = await axios.post<TUserLogin | TResponseError>(`/api/user/login?${requiredPayload}`)

      if ('error' in data) {
        notificationStore.openErrorNotification(data.error.message)
        return
      }
      return data
    } catch (error) {
      throw error
    }
  },

  checkTokenOnValid: async (token: string) => {
    try {
      const notificationStore = useNotificationStore()
      const { data } = await axios.get<TUserCheckJwt | TResponseError>(
        `/api/user/checkAuthStatus?token=${token}`,
      )

      if ('error' in data) {
        notificationStore.openErrorNotification(data.error.message)
        return false
      }
      return data.isValidToken
    } catch (error) {
      throw error
    }
  },

  getUserData: async (token: string): Promise<TUserData | null> => {
    try {
      const notificationStore = useNotificationStore()
      const { data } = await axios.get<TUserData | TResponseError>(`/api/user/getUserData?token=${token}`)

      if ('error' in data) {
        notificationStore.openErrorNotification(data.error.message)
        return null
      }
      return data as TUserData
    } catch (error) {
      throw error
    }
  },
}
