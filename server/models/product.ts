import { db } from '~/server/db/config/connection'
import { product } from '~/server/db/schema'
import type { TProduct } from '~/server/db/schema'

export const ProductModel = {
  getProductList: () => {
    try {
      const productList = db
        .select()
        .from(product)
        .all()
      if (!productList) {
        return []
      }
      return productList
    } catch (error) {
      throw new Error(error)
    }
  },

  addProduct: (productData: TProduct) => {
    try {
      const addedProduct = db
        .insert(product)
        .values(productData)
        .returning()
        .get()
      if (!addedProduct) {
        return { error: 501, message: { code: 2001, message: 'Can\'t add product' } }
      }
      return product
    } catch (error) {
      throw new Error(error)
    }
  }
}
