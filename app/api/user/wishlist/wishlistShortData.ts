import type { IWishlistDataProductId, TWishlistData } from '~/api/user/wishlist/shared.types'

export type TWishlistDataWishProductIds = {
  wishlistData: TWishlistData,
  productIds: IWishlistDataProductId[]
}

export async function getWishlistShorterData(wishlistToken: string) {
  const asyncQuery = useAsyncQuery()
  return await asyncQuery<TWishlistDataWishProductIds>(
    'GET',
    `/api/user/wishlist/wishlistData?wishlistToken=${wishlistToken}`,
  )
}
