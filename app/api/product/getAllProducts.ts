import type { TProduct } from '~/api/product/shared.types'

export async function getAllProducts() {
  const asyncQuery = useAsyncQuery()
  return await asyncQuery<TProduct[]>(
    'GET',
    '/api/product/all',
  )
}
