// Models
import { WishlistModel } from '~/server/models/wishlist'

export default defineEventHandler(event => {
  const wishlistModel = new WishlistModel()
  const cookies = parseCookies(event)

  if (!cookies.wishlistId) {
    return {}
  }
  return wishlistModel.getters.getWishlistProducts(cookies.wishlistId)
})
