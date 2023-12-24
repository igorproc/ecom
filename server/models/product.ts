// Db Connector
import { db } from '~/server/db/config/connection'
// Db Schema
import { product } from '~/server/db/schema'
// Types & Interfaces
import { EProductTypes, TAddProductInput } from '~/server/db/types/product'
import type { TProductInput } from '~/server/db/schema'
import { eq } from 'drizzle-orm'
import { ConfigurableProductModel } from '~/server/models/product/configurable'

export const ProductModel = {

  getProductList: () => {
    try {
      const productIds = db
        .select()
        .from(product)
        .all()
      if (!productIds.length) {
        return null
      }

      const productList: unknown[] = []
      productIds.forEach(productId => {
        productList.push(
          ProductModel.getProductById(productId.pid)
        )
      })

      return productList
    } catch (error) {
      throw error
    }
  },

  getProductById: (pid: number) => {
    try {
      const configurableProductModel = new ConfigurableProductModel()
      const productData = db
        .select()
        .from(product)
        .where(eq(product.pid, pid))
        .get()

      if (!productData) {
        return null
      }
      if (productData.__typename == EProductTypes.base) {
        return productData
      }

      const productOptions = configurableProductModel.getters.getProductOptions(productData.pid)
      const productVariants = configurableProductModel.getters.getProductVariants(productData.pid)

      return {
        ...productData,
        productOptions,
        productVariants,
      }
    } catch (error) {
      throw error
    }
  },

  addProduct: (productData: TAddProductInput) => {
    try {
      const productPayload: TProductInput = {
        __typename: EProductTypes[productData.type] || EProductTypes.base,
        name: productData.name,
        price: productData.price,
        productImage: productData.productImage,
      }

      const addedProduct = db
        .insert(product)
        .values(productPayload)
        .returning()
        .get()
      if (!addedProduct) {
        return { error: 501, message: { code: 2001, message: 'Can\'t add product' } }
      }
      return addedProduct
    } catch (error) {
      throw error
    }
  },
}
