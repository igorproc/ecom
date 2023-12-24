// Types & Interfaces
import { TProduct } from '~/types/api'

interface IWishlistStoreState {
  wishlistId: string,
  wishlistIdsList: {
    productId: number,
    variantId?: number,
  }[],
  wishlistProductList: TProduct[],
}

export const useWishlistStore = defineStore('wishlist-store', {
  state: (): IWishlistStoreState => {
    return {
      wishlistId: '',
      wishlistIdsList: [],
      wishlistProductList: [],
    }
  },
  actions: {
    addItemToWishlist(productData: TProduct, variantId?: number) {
      const payload: IWishlistStoreState['wishlistIdsList'][0] = { productId: productData.pid }
      if (variantId) {
        payload.variantId = variantId
      }

      this.wishlistIdsList.push(payload)
      if (!this.wishlistProductList.find(item => item.pid == productData.pid)) {
        this.wishlistProductList.push(productData)
      }
    },
    removeItemFromWishlist(productId: number, variantId?:number) {
      if (!variantId) {
        this.wishlistProductList = this.wishlistProductList
          .filter(wishlistProduct => wishlistProduct.pid !== productId && wishlistProduct)
        this.wishlistIdsList = this.wishlistIdsList
          .filter(wishlistId => wishlistId.productId !== productId)
        return
      }
      this.wishlistIdsList = this.wishlistIdsList
        .filter(wishlistProductId => wishlistProductId.productId !== productId && wishlistProductId.variantId !== variantId)
      if (this.wishlistIdsList.find(wishlistId => wishlistId.productId === productId)) {
        return
      }
      this.wishlistProductList = this.wishlistProductList.filter(wishlistProduct => wishlistProduct.pid !== productId)
    },
  },
})
