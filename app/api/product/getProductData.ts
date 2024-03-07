import type { TProduct } from '~/api/product/shared.types'

export async function getProductData(name: string) {
  const asyncQuery = useAsyncQuery()
  return await asyncQuery<TProduct>(
    'GET',
    `/api/product/${name}`,
  )
}
