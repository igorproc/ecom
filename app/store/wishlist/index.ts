// Types & Interfaces
import type { TWishlistProduct } from '~/api/user/wishlist/wishlistProducts'

interface IWishlistStoreState {
  wishlistId: string,
  wishlistIdsList: {
    productId: number,
    variantId?: number,
  }[],
  wishlistProductList: TWishlistProduct[],
}

export const useWishlistStore = defineStore('wishlist-store', {
  state: (): IWishlistStoreState => {
    return {
      wishlistId: '',
      wishlistIdsList: [],
      wishlistProductList: [],
    }
  },
  getters: {
    allWishlistItemsHasAProductData(state) {
      const listOfProductIdsWhoHasAData = state.wishlistIdsList
        .map(item => {
          if (state.wishlistProductList.find(productData => productData.pid === item.productId)) {
            return item.productId
          }
        })
        .filter(item => typeof item !== 'undefined')

      return state.wishlistIdsList.length === listOfProductIdsWhoHasAData.length
    },
  },
  actions: {
    addItemToWishlist(productData: TWishlistProduct) {
      const payload: IWishlistStoreState['wishlistIdsList'][0] = { productId: productData.pid }
      if (productData.selectedVariant) {
        payload.variantId = productData.selectedVariant
      }

      this.wishlistIdsList.push(payload)
      if (!this.wishlistProductList.find(item => item.pid == productData.pid)) {
        this.wishlistProductList.push(productData)
      }
    },
    removeItemFromWishlist(productId: number, variantId?: number) {
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
