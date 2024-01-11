// Node Deps
import { defineStore } from 'pinia'
// Types & Interfaces
import type { TProduct } from '~/types/api'

interface IProductStoreState {
  productList: TProduct[]
}

export const useProductStore = defineStore('product-store', {
  state: (): IProductStoreState => {
    return {
      productList: [],
    }
  },
  getters: {
    getProductDataById() {
      return (productId: number) => {
        return this.productList.find(product => product.pid == productId)
      }
    },
  },
  actions: {
    setProductList(productList: TProduct[]) {
      this.productList = productList
    },
    addToProductList(productData: TProduct) {
      this.productList.push(productData)
    },
  },
})
