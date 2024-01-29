import type { TProduct } from '~/api/product/shared.types'

export async function getProductData(id: number) {
  const asyncQuery = useAsyncQuery()
  return await asyncQuery<TProduct>(
    'GET',
    `/api/product/${id}`,
  )
}
