// Models
import { WishlistModel } from '~/server/models/wishlist'

export default defineEventHandler(event => {
  const wishlistModel = new WishlistModel()
  const cookies = parseCookies(event)

  if (!cookies.wishlistId) {
    return { error: { code: 501, message: 'Please reload page to get wishlistId' } }
  }
  return wishlistModel.getters.getWishlistDataWithProductIds(cookies.wishlistId)
})
