import type { TProduct } from '~/api/product/shared.types'

export type TProductPageFilters = {
  brand?: string,
  asc?: boolean,
}

export async function getProductPage(
  page?: number,
  size?: number,
  filters?: TProductPageFilters,
) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<TProduct[]>(
    'GET',
    `/api/product/list?page=${page}&size=${size}&brand=${filters?.brand || ''}`,
  )
}
