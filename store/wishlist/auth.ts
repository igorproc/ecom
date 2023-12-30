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

export const wishlistDataOnLogin = async () => {
  const wishlistStore = useWishlistStore()
  const wishlistTokenValue = useCookie('wishlistId')

  wishlistStore.wishlistIdsList = []
  wishlistStore.wishlistProductList = []

  const userWishlistData = await userWishlistApi.getDataOnLoginUser()
  if (!userWishlistData) {
    return
  }

  wishlistTokenValue.value = userWishlistData.wishlistData.cartId
  wishlistStore.wishlistId = userWishlistData.wishlistData.cartId
  wishlistStore.wishlistIdsList = userWishlistData.productIds
}

export const wishlistDataOnCreate  = async () => {
  const wishlistStore = useWishlistStore()
  const wishlistTokenValue = useCookie('wishlistId')

  const newWishlistToken = await userWishlistApi.createWishlistData()
  if (!newWishlistToken) {
    return
  }

  wishlistStore.wishlistId = newWishlistToken.cartId
  const assignedWishlist = await userWishlistApi.getDataOnLoginUser()
  if (!assignedWishlist) {
    return
  }

  wishlistStore.wishlistIdsList = assignedWishlist.productIds
  wishlistTokenValue.value = assignedWishlist.wishlistData.cartId
}
