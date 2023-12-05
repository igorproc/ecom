import { ProductModel } from '~/server/models/product'
import { TProduct } from '~/server/db/schema'

interface BodyData {
  productData: TProduct
}

export default defineEventHandler(async (event) => {
  try {
    const req = await readBody<BodyData>(event)

    if (!req.productData) {
      return { error: { code: 501, message: 'No Required Fields are sends' } }
    }

    return ProductModel.addProduct(req.productData as TProduct)
  } catch (error) {
    throw new Error(error)
  }
})
