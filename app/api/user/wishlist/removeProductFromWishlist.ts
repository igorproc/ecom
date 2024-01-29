import type { TWishlistOperationWithProductInput } from '~/api/user/wishlist/shared.types'

export type TWishlistRemoveProduct = {
  successDeleting: boolean
}
export async function removeProductFromWishlist (productData: TWishlistOperationWithProductInput) {
  const asyncQuery = useAsyncQuery()
  return await asyncQuery<TWishlistRemoveProduct>(
    'POST',
    '/api/user/wishlist/removeProduct',
    { productData },
  )
}
