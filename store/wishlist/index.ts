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
      wishlistId: 'a64e8d6a-49ad-4931-8031-3028ff9c70c5',
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
      this.wishlistProductList.push(productData)
    },
    removeItemFromWishlist(productId: number) {
      this.wishlistIdsList = this.wishlistIdsList
        .filter(wishlistProductId => wishlistProductId.productId !== productId)
      this.wishlistProductList = this.wishlistProductList
        .filter(wishlistProduct => wishlistProduct.pid !== productId)
    },
  },
})
