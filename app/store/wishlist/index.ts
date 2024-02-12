// Types & Interfaces
import type { IWishlistDataProductId } from '~/api/user/wishlist/shared.types'
import type { TWishlistProduct } from '~/api/user/wishlist/wishlistProducts'

interface IWishlistStoreState {
  wishlistToken: string,
  idsList: IWishlistDataProductId[],
  productList: TWishlistProduct[],
}

export const useWishlistStore = defineStore('wishlist-store', {
  state: (): IWishlistStoreState => {
    return {
      wishlistToken: '',
      idsList: [],
      productList: [],
    }
  },
  getters: {
    allWishlistItemsHasAProductData(state) {
      const listOfProductIdsWhoHasAData = state.idsList
        .map(item => {
          if (state.productList.find(product => product.productData.pid === item.productId)) {
            return item.productId
          }
        })
        .filter(item => typeof item !== 'undefined')

      return state.idsList.length === listOfProductIdsWhoHasAData.length
    },
  },
})
