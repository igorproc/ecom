import type { TProduct } from '~/api/product/shared.types'

export type TProductPageFilters = {
  brand?: string,
  sortBy?: string,
}

export type TGetProductPageInput = {
  page: number,
  size: number,
  filters: TProductPageFilters
}

export type TProductPage = {
  products: TProduct[],
  totalProducts: number,
}

export async function getProductPage(
  pageData: TGetProductPageInput
) {
  const asyncQuery = useAsyncQuery()

  const filtersUrl = () => {
    let filterUrl = ''
    if (pageData.filters?.brand) {
      filterUrl += `&brand=${pageData.filters.brand}`
    }
    if (pageData.filters?.sortBy) {
      filterUrl += `&sortBy=${pageData.filters.sortBy}`
    }
    return filterUrl
  }

  return await asyncQuery<TProductPage>(
    'GET',
    `/api/product/list?page=${pageData.page}&size=${pageData.size}${filtersUrl()}`,
  )
}
