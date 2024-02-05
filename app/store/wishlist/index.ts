// Types & Interfaces
import type { TWishlistProduct } from '~/api/user/wishlist/wishlistProducts'

interface IWishlistStoreState {
  wishlistId: string,
  idsList: {
    productId: number,
    variantId?: number,
  }[],
  productList: TWishlistProduct[],
}

export const useWishlistStore = defineStore('wishlist-store', {
  state: (): IWishlistStoreState => {
    return {
      wishlistId: '',
      idsList: [],
      productList: [],
    }
  },
  getters: {
    allWishlistItemsHasAProductData(state) {
      const listOfProductIdsWhoHasAData = state.idsList
        .map(item => {
          if (state.productList.find(productData => productData.pid === item.productId)) {
            return item.productId
          }
        })
        .filter(item => typeof item !== 'undefined')

      return state.idsList.length === listOfProductIdsWhoHasAData.length
    },
  },
  actions: {
    addItemToWishlist(productData: TWishlistProduct) {
      const payload: IWishlistStoreState['idsList'][0] = { productId: productData.pid }
      if (productData.selectedVariant) {
        payload.variantId = productData.selectedVariant
      }

      this.idsList.push(payload)
      if (!this.productList.find(item => item.pid == productData.pid)) {
        this.productList.push(productData)
      }
    },
    removeItemFromWishlist(productId: number, variantId?: number) {
      if (!variantId) {
        this.productList = this.productList
          .filter(wishlistProduct => wishlistProduct.pid !== productId && wishlistProduct)
        this.idsList = this.idsList
          .filter(wishlistId => wishlistId.productId !== productId)
        return
      }

      this.idsList = this.idsList
        .filter(wishlistProductId => wishlistProductId.productId !== productId && wishlistProductId.variantId !== variantId)
      if (this.idsList.find(wishlistId => wishlistId.productId === productId)) {
        return
      }
      this.productList = this.productList.filter(wishlistProduct => wishlistProduct.pid !== productId)
    },
  },
})
