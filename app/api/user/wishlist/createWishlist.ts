import type { TWishlistData } from '~/api/user/wishlist/shared.types'

export async function createWishlist() {
  const asyncQuery = useAsyncQuery()
  return await asyncQuery<TWishlistData>(
    'POST',
    '/api/user/wishlist/create',
  )
}
