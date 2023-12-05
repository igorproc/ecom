import { ProductModel } from '~/server/models/product'

export default defineEventHandler(() => {
  return ProductModel.getProductList()
})
