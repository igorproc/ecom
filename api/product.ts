import axios from 'axios'

import { TAddProductInput } from '~/types/api'

export const productApi = {
  getProductList: async () => {
    try {
      const { data } = axios.get('/api/product/getProductList')
      if (!data) {
        return
      }
      return data
    } catch (error) {
      throw new Error(error)
    }
  },

  addProduct: async (productData: TAddProductInput) => {
    try {
      const { data } = axios.post('/api/product/add', { productData })
      if (!data) {
        return
      }
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
}
