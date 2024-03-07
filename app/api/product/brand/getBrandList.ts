export type Tbrand = {
  bid: number,
  name: string,
  imageUrl: string,
}

export async function getBrandList (
  page?: number,
  size?: number
) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<Tbrand[]>(
    'GET',
    `/api/product/brand/list?page=${page || 1}&size=${size || 12}`
  )
}
