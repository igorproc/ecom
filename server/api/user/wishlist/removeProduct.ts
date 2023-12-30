// Models
import { WishlistModel } from '~/server/models/wishlist'

interface IRequestPayload {
  productId: number,
  variantId?: number,
}

export default defineEventHandler(event => {
  const wishlistModel = new WishlistModel()
  const cookies = parseCookies(event)
  const request = getQuery<IRequestPayload>(event)

  if (!cookies.wishlistId || !request.productId) {
    return { error: { code: 501, message: 'No Required Fields are sends' } }
  }
  return wishlistModel.actions.removeItemFromWishlist(
    cookies.wishlistId,
    request.productId,
    request.variantId || null,
  )
})
