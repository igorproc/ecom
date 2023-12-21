import { ProductModel } from '~/server/models/product'

interface QueryData {
  pid: number
}

export default defineEventHandler(async event => {
  const req = getQuery<QueryData>(event)
  if (!req.pid) {
    return { error: { code: 501, message: 'No Required Fields are sends' } }
  }

  const productData = ProductModel.getProductById(req.pid)
  if (!productData) {
    return { error: { code: 501, message: 'Product isn\'t found' } }
  }
  return productData
})
