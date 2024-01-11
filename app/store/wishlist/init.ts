// Pinia Stores
import { useWishlistStore } from '~/store/wishlist/index'
// Api Methods
import { userWishlistApi } from '~/api/user'

export const initializeWishlist = async () => {
  const wishlistStore = useWishlistStore()
  const cookieWishlistTokenValue = useCookie('wishlist-id')

  if (!cookieWishlistTokenValue.value) {
    const wishlistData = await userWishlistApi.createWishlistData()
    if (!wishlistData) {
      return
    }

    wishlistStore.wishlistId = wishlistData.wishlistToken
    cookieWishlistTokenValue.value = wishlistData.wishlistToken
    return
  }

  const wishlistData = await userWishlistApi.getWishlistShorterData()
  if (!wishlistData) {
    return
  }
  wishlistStore.wishlistId = wishlistData.wishlistData.wishlistToken
  wishlistStore.wishlistIdsList.push(...wishlistData.productIds)
}
