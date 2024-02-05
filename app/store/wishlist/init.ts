// Pinia Stores
import { useWishlistStore } from '~/store/wishlist/index'
// Api Methods
import { createWishlist } from '~/api/user/wishlist/createWishlist'
import { getWishlistShorterData } from '~/api/user/wishlist/wishlistShortData'

export const initializeWishlist = async () => {
  const wishlistStore = useWishlistStore()
  const cookieWishlistTokenValue = useCookie('wishlist-id')

  if (!cookieWishlistTokenValue.value) {
    const wishlistData = await createWishlist()
    if (!wishlistData) {
      return
    }

    wishlistStore.wishlistId = wishlistData.wishlistToken
    cookieWishlistTokenValue.value = wishlistData.wishlistToken
    return
  }

  const wishlistData = await getWishlistShorterData()
  if (!wishlistData) {
    return
  }

  wishlistStore.wishlistId = wishlistData.wishlistData.wishlistToken
  wishlistStore.idsList = wishlistData.productIds
}
