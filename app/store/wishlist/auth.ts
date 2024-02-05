// Pinia Stores
import { useWishlistStore } from '~/store/wishlist/index'
import { getWishlistShorterData } from '~/api/user/wishlist/wishlistShortData'

export const wishlistOnLoginUser = async (token: string) => {
  try {
    const wishlistStore = useWishlistStore()
    const wishlistTokenValue = useCookie(
      'wishlist-id',
      { maxAge: 60 * 60 * 24 * 14 },
    )

    wishlistTokenValue.value = token
    wishlistStore.wishlistId = token

    const idsList = await getWishlistShorterData()
    if (!idsList) {
      return
    }

    wishlistStore.idsList = idsList.productIds
    wishlistStore.productList = []
  } catch (error) {
    throw error
  }
}
