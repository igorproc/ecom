export type TProductRemove = {
  productIsDeleted: boolean
}

export async function removeProduct (productId: number) {
  const asyncQuery = useAsyncQuery()
  return await asyncQuery<TProductRemove>(
    'POST',
    `/api/product/delete?id=${productId}`,
  )
}
