import type { IWishlistDataProductId, TWishlistOperationWithProductInput } from '~/api/user/wishlist/shared.types'

export async function addProductToWishlist (productData: TWishlistOperationWithProductInput) {
  const asyncQuery = useAsyncQuery()
  return await asyncQuery<IWishlistDataProductId>(
    'POST',
    '/api/user/wishlist/addProduct',
    { productData },
  )
}
