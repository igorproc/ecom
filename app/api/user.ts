// Node Deps
import axios from 'axios'
// Pinia Stores
import { useNotificationStore } from '~/store/notification'
// Types & Interfaces
import type {
  TResponseError,
  TUserData,
  TUserLoginInput,
  TUserLogin,
  TUserRegisterInput,
  TUserCheckJwt,
  TWishlistData,
  TWishlistDataWishProductIds,
  TWishlistOperationWithProductInput,
  TWishlistRemoveProduct,
  TWishlistProduct,
  TUserLogout,
} from '~/types/api'

export const userApi = {
  createUser: async (registerData: TUserRegisterInput) => {
    try {
      const notificationStore = useNotificationStore()
      const { data } = await axios.post<TUserLogin | TResponseError>(
        `/api/user/create`,
        { createUserData: registerData },
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
      const { data } = await axios.post<TUserLogin | TResponseError>(
        `/api/user/login`,
        { loginData },
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

  logoutUser: async () => {
    const notificationStore = useNotificationStore()
    try {
      const { data } = await axios.post<TUserLogout | TResponseError>(
        '/api/user/logout',
      )

      if ('error' in data) {
        notificationStore.openErrorNotification(data.error.message)
        return
      }
      return data.isSignOut
    } catch (error) {
      throw error
    }
  },

  checkTokenOnValid: async (token: string) => {
    try {
      const notificationStore = useNotificationStore()
      const data = await $fetch<TUserCheckJwt | TResponseError>(
        `/api/user/checkAuthStatus?token=${token}`,
        {
          method: 'GET',
        },
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
      const data = await $fetch<TUserData | TResponseError>(
        `/api/user/getUserData?token=${token}`,
        {
          method: 'GET',
        },
      )

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

export const userWishlistApi = {
  createWishlistData: async () => {
    try {
      const notificationStore = useNotificationStore()
      const { data } = await axios.post<TWishlistData>(
        '/api/user/wishlist/create',
      )

      if (!data) {
        notificationStore.openErrorNotification('Something went wrong')
        return
      }
      return data
    } catch (error) {
      throw error
    }
  },
  getWishlistShorterData: async () => {
    try {
      const notificationStore = useNotificationStore()
      const data = await $fetch<TWishlistDataWishProductIds | TResponseError>(
        '/api/user/wishlist/wishlistData',
        {
          method: 'GET',
        },
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
  getWishlistProducts: async () => {
    try {
      const notificationStore = useNotificationStore()
      const { data } = await axios.get<TWishlistProduct[] | TResponseError>(
        '/api/user/wishlist/wishlistProduct',
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
  addProductToWishlist: async (productData: TWishlistOperationWithProductInput) => {
    try {
      const notificationStore = useNotificationStore()

      const { data } = await axios.post<boolean | TResponseError>(
        '/api/user/wishlist/addProduct',
        { productData },
      )

      if (typeof data === 'object' && 'error' in data) {
        notificationStore.openErrorNotification(data.error.message)
        return
      }
      return data as boolean
    } catch (error) {
      throw error
    }
  },
  removeProductToWishlist: async (productData: TWishlistOperationWithProductInput) => {
    try {
      const notificationStore = useNotificationStore()
      const { data } = await axios.post<TWishlistRemoveProduct | TResponseError>(
        '/api/user/wishlist/removeProduct',
        { productData },
      )

      if ('error' in data) {
        notificationStore.openErrorNotification(data.error.message)
        return
      }
      return data.successDeleting
    } catch (error) {
      throw error
    }
  },
}
