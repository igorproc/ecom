import type { TProduct } from '~/api/product/shared.types'

export type TWishlistProduct = TProduct & { selectedVariant: number | null }

export async function getWishlistProducts() {
  const asyncQuery = useAsyncQuery()
  return await asyncQuery<TWishlistProduct[]>(
    'GET',
    '/api/user/wishlist/wishlistProduct',
  )
}
