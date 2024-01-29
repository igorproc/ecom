// Pinia Stores
import { useProductStore } from '~/store/product'
import { useWishlistStore } from '~/store/wishlist'
import { useCartStore } from '~/store/cart'
// Api Methods
import { addProductToWishlist } from '~/api/user/wishlist/addProductToWishlist'
import { removeProductFromWishlist } from '~/api/user/wishlist/removeProductFromWishlist'
// Types & Interfaces
import type { TWishlistOperationWithProductInput } from '~/api/user/wishlist/shared.types'

export const useProduct = (productId: number) => {
  const productStore = useProductStore()
  const wishlistStore = useWishlistStore()
  const cartStore = useCartStore()

  const productData = productStore.getProductDataById(productId)
  const configurableProductVariant = ref<number | null>(null)
  const operationWithWishlistIsProcessing = ref(false)
  const operationWithCartIsProcessing = ref(false)

  const productIsAddedToCart = computed(() => {
    if (!productData) {
      return false
    }

    if (productData.__typename === 'BASE') {
      return !!cartStore.cartIdsList.find(cartId => cartId.productId === productId)
    }
    if (!configurableProductVariant.value) {
      return false
    }

    return !!cartStore.cartIdsList.find(cartId => {
      return cartId.productId === productId && cartId.variantId === configurableProductVariant.value
    })
  })
  const productIsAddedToWishlist = computed(() => {
    if (!productData) {
      return false
    }

    if (productData.__typename === 'BASE') {
      return !!wishlistStore.wishlistIdsList.find(wishlistId => wishlistId.productId === productId)
    }
    if (!configurableProductVariant.value) {
      return false
    }

    return !!wishlistStore.wishlistIdsList.find(wishlistId => {
      return wishlistId.productId === productId && wishlistId.variantId === configurableProductVariant.value
    })
  })

  const addProductVariant = (variantId: number | null) => {
    configurableProductVariant.value = variantId
  }
  const addToWishlist = async () => {
    const payload: TWishlistOperationWithProductInput = {
      wishlistToken: wishlistStore.wishlistId,
      productId,
    }

    if (configurableProductVariant.value) {
      payload.variantId = configurableProductVariant.value
    }
    operationWithWishlistIsProcessing.value = true

    const isAddedToWishlist = await addProductToWishlist(payload)
    if (!productData || !isAddedToWishlist) {
      operationWithWishlistIsProcessing.value = false
      return
    }

    wishlistStore.addItemToWishlist(
      Object.assign(productData, { selectedVariant: configurableProductVariant.value }),
    )
    operationWithWishlistIsProcessing.value = false
  }
  const removeFromWishlist = async () => {
    const payload: TWishlistOperationWithProductInput = {
      wishlistToken: wishlistStore.wishlistId,
      productId,
    }
    if (configurableProductVariant.value) {
      payload.variantId = configurableProductVariant.value
    }

    operationWithWishlistIsProcessing.value = true
    const isRemovedFromWishlist = await removeProductFromWishlist(payload)
    if (!isRemovedFromWishlist) {
      operationWithWishlistIsProcessing.value = false
      return
    }

    operationWithWishlistIsProcessing.value = false
    wishlistStore.removeItemFromWishlist(payload.productId, payload.variantId)
  }
  const addToCart = () => {
    cartStore.addItemToCart(productId, 123, configurableProductVariant.value || null)
  }
  const removeFromCart = () => {
    cartStore.removeItemFromCart(productId, configurableProductVariant.value || null)
  }

  return {
    operationWithCartIsProcessing,
    operationWithWishlistIsProcessing,
    configurableProductVariant,
    productIsAddedToWishlist,
    productIsAddedToCart,
    addProductVariant,
    addToWishlist,
    removeFromWishlist,
    addToCart,
    removeFromCart,
  }
}
