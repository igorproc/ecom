// Pinia Stores
import { useWishlistStore } from '~/store/wishlist/index'
// Api Methods
import { userWishlistApi } from '~/api/user'

export const initializeWishlist = async () => {
  const wishlistStore = useWishlistStore()
  const cookieWishlistTokenValue = useCookie('wishlistId')

  if (!cookieWishlistTokenValue.value) {
    const wishlistData = await userWishlistApi.createWishlistData()
    if (!wishlistData) {
      return
    }

    wishlistStore.wishlistId = wishlistData.cartId
    cookieWishlistTokenValue.value = wishlistData.cartId
    return
  }

  const wishlistData = await userWishlistApi.getWishlistShorterData()
  if (!wishlistData) {
    return
  }
  wishlistStore.wishlistId = wishlistData.wishlistData.cartId
  wishlistStore.wishlistIdsList.push(...wishlistData.productIds)
}
