// Types & Interfaces
import type { IWishlistDataProductId } from '~/api/user/wishlist/shared.types'

export type TWishlistRemoveProductInput = {
  wishlistToken: string,
  wishlistItemId: number
}

export async function removeProductFromWishlist(productData: TWishlistRemoveProductInput) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<IWishlistDataProductId>(
    'POST',
    '/api/user/wishlist/removeProduct',
    { productData },
  )
}
