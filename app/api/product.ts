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
import type { TConfigurableProductOptions } from '~/types/api'

export const productApi = {
  async getProductList() {
    try {
      const { data } = await axios.get<TProduct[]>(
        'http://localhost:4001/api/product/all',
      )
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
        `/api/product/getProductById/${pid}`,
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
      const { data } = await axios.post<TProduct>(
        '/api/product/create',
        { productData },
      )

      if (!data) {
        return
      }
      return data
    } catch (error) {
      throw error
    }
  },

  removeProduct: async (productId: number) => {
    try {
      const { data } = await axios.post(
        `/product/delete?id=${productId}`,
      )

      return data as boolean
    } catch (error) {
      throw error
    }
  },

  addToConfigurableProductOptionItem: async (optionGroupId: number, optionItemData: TConfigurableProductOptionInput) => {
    try {
      const notificationStore = useNotificationStore()
      const { data } = await axios.post<TConfigurableProductOption | TResponseError>(
        `/api/product/configurable/addItemToOptionGroup`,
        {
          optionData: {
            optionGroupId,
            ...optionItemData,
          },
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

  addToConfigurableProductOptionGroup: async (productId: number, optionGroupLabel: string) => {
    try {
      if (!productId || !optionGroupLabel) {
        return
      }
      const notificationStore = useNotificationStore()
      const { data } = await axios.post<TConfigurableProductOptions | TResponseError>(
        `/api/product/configurable/createOptionGroup?productId=${productId}&groupLabel=${optionGroupLabel}`,
        {
          optionItemData: {
            productId,
            label: optionGroupLabel,
          },
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
}
