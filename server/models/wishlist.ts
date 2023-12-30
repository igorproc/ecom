// Node Deps
import { and, eq } from 'drizzle-orm'
import { v4 } from 'uuid'
import { differenceBy } from 'lodash-es'
// Db Utils
import { db } from '~/server/db/config/connection'
// Models
import { ProductModel } from '~/server/models/product'
import { AuthModel } from '~/server/models/auth'
// Types & Interfaces
import {
  TWishlistItem,
  userWishlist,
  userWishlistItem,
} from '~/server/db/schema'
import { TReturningProduct } from '~/server/db/types/product'

export class WishlistModel {
  private readonly productModel: typeof ProductModel
  private readonly authModel: typeof AuthModel

  constructor() {
    this.productModel = ProductModel
    this.authModel = AuthModel
  }

  protected readonly closedApi = {
    getWishlistItemsIdsByWishlistToken: (wishlistToken: string): TWishlistItem[] => {
      try {
        const userWishlistItems = db
          .select()
          .from(userWishlistItem)
          .where(eq(userWishlistItem.cartId, wishlistToken))
          .all()

        if (!userWishlistItems) {
          return []
        }
        return userWishlistItems
      } catch (error) {
        throw error
      }
    },
  }
  protected readonly validation = {
    wishlistWithThisIdWasExists: (wishlistId: string) => {
      try {
        return !!db
          .select()
          .from(userWishlist)
          .where(eq(userWishlist.cartId, wishlistId))
          .get()
      } catch (error) {
        throw error
      }
    },
    productWithThisIdIsConfigurable: (productId: number) => {
      const product = this.productModel.getProductById(productId)
      return product && product.__typename === 'CONFIGURABLE'
    },
  }
  public readonly getters = {
    getWishlistDataWithProductIds: (cartId: string) => {
      try {
        const wishlistData = db.select().from(userWishlist).where(eq(userWishlist.cartId, cartId)).get()
        const productIds = db.select().from(userWishlistItem).where(eq(userWishlistItem.cartId, cartId)).all()

        return {
          wishlistData,
          productIds: productIds.map(productId => {
            const data: { productId: number, variantId?: number } = { productId: productId.productId }
            if (productId.variantId) {
              data.variantId = productId.variantId
            }
            return data
          }),
        }
      } catch (error) {
        throw error
      }
    },
    getWishlistProducts: (cartId: string) => {
      try {
        type TProductItem = TReturningProduct & { selectedVariant: number | null }
        const productList: TProductItem[] = []

        const productIdsList = db
          .select()
          .from(userWishlistItem)
          .where(eq(userWishlistItem.cartId, cartId))
          .all()

        productIdsList.forEach(productId => {
          return productList.push(
            {
              ...ProductModel.getProductById(productId.productId) as TReturningProduct,
              selectedVariant: productId.variantId || null,
            },
          )
        })
        return productList
      } catch (error) {
        throw error
      }
    },
  }
  public readonly actions = {
    createWishlist: (token: string) => {
      try {
        if (!token.length) {
          return db
            .insert(userWishlist)
            .values({
              isGuestCart: true,
              cartId: v4(),
            })
            .returning()
            .get()
        }
        const userId = this.authModel.decodeJwtToken(token)
        if (typeof userId === 'string') {
          return
        }

        if (!userId.uid) {
          return {}
        }
        const userWishlistCandidate = db.select().from(userWishlist).where(eq(userWishlist.uid, userId.uid)).get()
        if (userWishlistCandidate) {
          return userWishlistCandidate
        }

        return db
          .insert(userWishlist)
          .values({
            isGuestCart: false,
            uid: userId.uid,
            cartId: v4(),
          })
          .returning()
          .get()
      } catch (error) {
        throw error
      }
    },
    addItemToWishlist: (cartId: string, productId: number, variantId: number | null) => {
      try {
        if (!this.validation.wishlistWithThisIdWasExists(cartId)) {
          return {}
        }
        const productIsConfigurable = this.validation.productWithThisIdIsConfigurable(productId)
        if (!productIsConfigurable) {
          return db
            .insert(userWishlistItem)
            .values({
              cartId,
              productId,
            })
            .returning()
            .get()
        }

        if (productIsConfigurable && !variantId) {
          return {}
        }
        return db
          .insert(userWishlistItem)
          .values({
            cartId,
            productId,
            variantId,
          })
      } catch (error) {
        throw error
      }
    },
    removeItemFromWishlist: (cartId: string, productId: number, variantId: number | null) => {
      try {
        if (!this.validation.wishlistWithThisIdWasExists(cartId)) {
          return {}
        }
        const productIsConfigurable = this.validation.productWithThisIdIsConfigurable(productId)
        if (!productIsConfigurable) {
          const productIsDeleted = db
            .delete(userWishlistItem)
            .where(
              and(eq(userWishlistItem.cartId, cartId), eq(userWishlistItem.productId, productId)),
            )
            .run()
          if (productIsDeleted) {
            return { successDeleting: true }
          }
        }

        if (productIsConfigurable && !variantId) {
          return {}
        }
        const productIsDeleted = db
          .delete(userWishlistItem)
          .where(
            and(
              eq(userWishlistItem.cartId, cartId),
              eq(userWishlistItem.productId, productId),
              eq(userWishlistItem.variantId, variantId || 0),
            ),
          )
          .run()
        if (productIsDeleted) {
          return { successDeleting: true }
        }
      } catch (error) {
        throw error
      }
    },
    assignGuestAndUserWishlists: (userToken: string, guestWishlistToken: string) => {
      const userUid = this.authModel.decodeJwtToken(userToken)
      if (typeof userUid === 'string') {
        return
      }

      const userWishlistData = db
        .select()
        .from(userWishlist)
        .where(eq(userWishlist.uid, userUid.uid))
        .get()
      if (!userWishlistData) {
        return
      }

      const userWishlistItems = this.closedApi.getWishlistItemsIdsByWishlistToken(userWishlistData.cartId)
      const guestWishlistItems = this.closedApi.getWishlistItemsIdsByWishlistToken(guestWishlistToken)
      const itemsIdsDifference = differenceBy(
        userWishlistItems, guestWishlistItems, 'productId', 'variantId'
      )
      console.log(itemsIdsDifference)

      db
        .delete(userWishlist)
        .where(
          and(
            eq(userWishlist.cartId, guestWishlistToken),
            eq(userWishlist.isGuestCart, true),
          ),
        )

      itemsIdsDifference.forEach(item => {
        const itemData = db
          .update(userWishlistItem)
          .set({ cartId: userWishlistData.cartId })
          .where(
            and(
              eq(userWishlistItem.wishlistItemId, item.wishlistItemId),
              eq(userWishlistItem.cartId, guestWishlistToken),
            ),
          )
          .returning()
          .get()
      })

      return this.getters.getWishlistDataWithProductIds(userWishlistData.cartId)
    },
  }
}
