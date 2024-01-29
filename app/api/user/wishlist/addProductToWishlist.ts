import type { TWishlistOperationWithProductInput } from '~/api/user/wishlist/shared.types'

export type TWishlistAddProduct = {
  productIsAdded: boolean
}

export async function addProductToWishlist (productData: TWishlistOperationWithProductInput) {
  const asyncQuery = useAsyncQuery()
  return await asyncQuery<TWishlistAddProduct>(
    'POST',
    '/api/user/wishlist/addProduct',
    { productData },
  )
}
