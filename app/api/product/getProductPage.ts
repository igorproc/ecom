import type { TProduct } from '~/api/product/shared.types'

export type TProductPageFilters = {
  brand?: string,
  asc?: boolean,
}

export async function getProductPage(
  page?: number,
  count?: number,
  filters?: TProductPageFilters
) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<TProduct[]>(
      'GET',
      '/api/product/list',
      {
        page: page || 1,
        count
      }
    )
}
