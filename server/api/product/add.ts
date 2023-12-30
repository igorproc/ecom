import { ProductModel } from '~/server/models/product'
import { TAddProductInput } from '~/server/db/types/product'

interface BodyData {
  productData: TAddProductInput
}

export default defineEventHandler(async event => {
  try {
    const req = await readBody<BodyData>(event)
    if (!req.productData) {
      return { error: { code: 501, message: 'No Required Fields are sends' } }
    }

    return ProductModel.addProduct(req.productData)
  } catch (error) {
    throw error
  }
})
