// Pinia Stores
import { useWishlistStore } from '~/store/wishlist/index'
// Api Methods
import { getWishlistShorterData } from '~/api/user/wishlist/wishlistShortData'
import { createWishlist } from '~/api/user/wishlist/createWishlist'

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

export const wishlistOnLogoutUser = async () => {
  try {
    const wishlistTokenValue = useCookie(
      'wishlist-id',
      { maxAge: 60 * 60 * 24 * 14 },
    )

    const newGuestWishlistToken = await createWishlist()
    if (!newGuestWishlistToken) {
      return
    }

    wishlistTokenValue.value = newGuestWishlistToken.wishlistToken
  } catch (error) {
    throw error
  }
}
