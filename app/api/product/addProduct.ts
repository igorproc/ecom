// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'
import { EAddProductTypes } from '~/api/product/shared.types'

export type TAddProductInput = {
  name: string,
  price: number,
  type: keyof typeof EAddProductTypes,
  productImage: string,
}

export async function addProduct(productData: TAddProductInput) {
  const asyncQuery = useAsyncQuery()
  return await asyncQuery<TProduct>(
    'POST',
    '/api/product/create',
    { productData },
  )
}
