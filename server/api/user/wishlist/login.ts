// Models
import { WishlistModel } from '~/server/models/wishlist'

export default defineEventHandler(event => {
  const userWishlistModel = new WishlistModel()
  const cookies = parseCookies(event)

  if (!cookies.wishlistId || !cookies.Authorization) {
    return { error: { code: 501, message: 'No Required Fields are sends' } }
  }

  return userWishlistModel.actions.assignGuestAndUserWishlists(cookies.Authorization, cookies.wishlistId)
})
