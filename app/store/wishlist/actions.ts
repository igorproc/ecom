// Pinia Stores
import { useWishlistStore } from '~/store/wishlist/index'
// Api Methods
import { addProductToWishlist } from '~/api/user/wishlist/addProductToWishlist'
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'
import type { TWishlistOperationWithProductInput } from '~/api/user/wishlist/shared.types'
import type { TWishlistRemoveProductInput } from '~/api/user/wishlist/removeProductFromWishlist'
import type { TWishlistProduct } from '~/api/user/wishlist/wishlistProducts'
import { removeProductFromWishlist } from '~/api/user/wishlist/removeProductFromWishlist'

export async function addItemToWishlist(productData: TProduct, selectedVariant?: number | null) {
  const wishlistStore = useWishlistStore()

  const payload: TWishlistOperationWithProductInput = {
    wishlistToken: wishlistStore.wishlistToken,
    productId: productData.pid,
  }
  const productPayload: TWishlistProduct = {
    productData,
  }

  if (selectedVariant) {
    payload.variantId = selectedVariant
    productPayload.selectedVariant = selectedVariant
  }

  const itemIsAddedToWishlist = await addProductToWishlist(payload)
  if (!itemIsAddedToWishlist) {
    return false
  }

  wishlistStore
    .idsList
    .push(itemIsAddedToWishlist)

  const productDataIsExsistsInStore = wishlistStore
    .productList
    .find(product => product.productData.pid === productData.pid)

  if (!productDataIsExsistsInStore) {
    wishlistStore
      .productList
      .push(productPayload)
  }
  return true
}

export async function removeItemFromWishlist(wishlistProductId: number) {
  const wishlistStore = useWishlistStore()

  const payload: TWishlistRemoveProductInput = {
    wishlistToken: wishlistStore.wishlistToken,
    wishlistItemId: wishlistProductId,
  }

  const removedItemData = await removeProductFromWishlist(payload)
  if (!removedItemData) {
    return false
  }

  wishlistStore.idsList = wishlistStore
    .idsList
    .filter(item => item.itemId !== removedItemData.itemId)

  if (removedItemData.variantId) {
    wishlistStore.productList = wishlistStore
      .productList
      .filter(product => {
        return !(product.productData.pid === removedItemData.productId &&
          product.selectedVariant === removedItemData.variantId)
      })
    return true
  }

  wishlistStore.productList = wishlistStore
    .productList
    .filter(product => product.productData.pid !== removedItemData.productId)
  return true
}
