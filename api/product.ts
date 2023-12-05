import axios from 'axios'

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

  addProduct: async () => {
    try {

    } catch (error) {
      throw new Error(error)
    }
  }
}
