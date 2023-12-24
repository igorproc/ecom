// Models
import { WishlistModel } from '~/server/models/wishlist'

export default defineEventHandler(event => {
  const wishlistModel = new WishlistModel()
  const cookies = parseCookies(event)

  const isGuest = !cookies?.Authorization
  if (isGuest) {
    return wishlistModel.actions.createWishlist('')
  }

  return wishlistModel.actions.createWishlist(cookies.Authorization)
})
