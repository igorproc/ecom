import type { TWishlistData } from '~/api/user/wishlist/shared.types'

export type TWishlistDataWishProductIds = {
  wishlistData: TWishlistData,
  productIds: { productId: number, variantId?: number }[]
}

export async function getWishlistShorterData() {
  const asyncQuery = useAsyncQuery()
  return await asyncQuery<TWishlistDataWishProductIds>(
    'GET',
    '/api/user/wishlist/wishlistData',
  )
}
