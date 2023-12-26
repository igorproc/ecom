// Pinia Stores
import { useWishlistStore } from '~/store/wishlist/index'
// Api Methods
import { userWishlistApi } from '~/api/user'

export const wishlistDataOnLogout = async () => {
  const wishlistStore = useWishlistStore()
  const wishlistTokenValue = useCookie('wishlistId')

  wishlistStore.wishlistIdsList = []
  wishlistStore.wishlistProductList = []
  wishlistTokenValue.value = ''

  const newWishlistToken = await userWishlistApi.createWishlistData()
  if (!newWishlistToken) {
    return
  }

  wishlistTokenValue.value = newWishlistToken.cartId
  wishlistStore.wishlistId = newWishlistToken.cartId
}
