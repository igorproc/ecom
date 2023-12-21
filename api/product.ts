// Node Deps
import axios from 'axios'
// Pinia Stores
import { useNotificationStore } from '~/store/notification'
// Types & Interfaces
import type {
  TAddProductInput,
  TConfigurableProductOptionInput,
  TConfigurableProductOption,
  TProduct,
  TResponseError,
} from '~/types/api'
import { TConfigurableProductOptions } from '~/types/api'

export const productApi = {
  getProductList: async () => {
    try {
      const { data } = await axios.get<TProduct[]>('/api/product/getProductList')
      if (!data) {
        return null
      }
      return data
    } catch (error) {
      throw error
    }
  },

  getProductDataById: async (pid: number) => {
    try {
      const notificationStore = useNotificationStore()
      const { data } = await axios.get<TProduct | TResponseError>(
        `/api/product/getProductById?pid=${pid}`,
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

  addProduct: async (productData: TAddProductInput) => {
    try {
      const { data } = await axios.post<TProduct>('/api/product/add', { productData })
      if (!data) {
        return
      }
      return data
    } catch (error) {
      throw error
    }
  },

  addToConfigurableProductOptionItem: async (optionGroupId: number, optionItemData: TConfigurableProductOptionInput) => {
    try {
      const notificationStore = useNotificationStore()
      const { data } = await axios.post<TConfigurableProductOption | TResponseError>(
        `/api/product/configurable/addProductOptionToGroup?optionGroupId=${optionGroupId}`,
        optionItemData,
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

  addToConfigurableProductOptionGroup: async (productId: number, optionGroupLabel: string) => {
    try {
      if (!productId || !optionGroupLabel) {
        return
      }

      const notificationStore = useNotificationStore()
      const { data } = await axios.post<TConfigurableProductOptions | TResponseError>(
        `/api/product/configurable/addProductOptionGroup?productId=${productId}&groupLabel=${optionGroupLabel}`,
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
}
