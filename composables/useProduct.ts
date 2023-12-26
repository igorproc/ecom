// Pinia Stores
import { useProductStore } from '~/store/product'
import { useWishlistStore } from '~/store/wishlist'
import { useCartStore } from '~/store/cart'
// Api Methods
import { userWishlistApi } from '~/api/user'
// Types & Interfaces
import type { TWishlistOperationWithProductInput } from '~/types/api'

export const useProduct = (productId: number) => {
  const productStore = useProductStore()
  const wishlistStore = useWishlistStore()
  const cartStore = useCartStore()

  const operationWithWishlistIsProcessing = ref(false)
  const operationWithCartIsProcessing = ref(false)

  const configurableProductVariant = ref<number | null>(null)

  const productIsAddedToCart = computed(() => {
    if (!configurableProductVariant.value) {
      return !!cartStore.cartIdsList.find(cartId => cartId.productId === productId)
    }
    return !!cartStore.cartIdsList.find(cartId => {
      return cartId.productId === productId && cartId.variantId === configurableProductVariant.value
    })
  })
  const productIsAddedToWishlist = computed(() => {
    if (!configurableProductVariant.value) {
      return wishlistStore.wishlistIdsList.find(wishlistId => wishlistId.productId === productId)?.productId
    }
    return wishlistStore.wishlistIdsList.find(wishlistId => {
      return wishlistId.productId === productId && wishlistId.variantId === configurableProductVariant.value
    })?.productId
  })

  const addProductVariant = (variantId: number | null) => {
    configurableProductVariant.value = variantId
  }
  const addToWishlist = async () => {
    const payload: TWishlistOperationWithProductInput = { productId }
    if (configurableProductVariant.value) {
      payload.variantId = configurableProductVariant.value
    }

    operationWithWishlistIsProcessing.value = true
    const isAddedToWishlist = await userWishlistApi.addProductToWishlist(payload)
    const productData = productStore.getProductDataById(payload.productId)
    if (!productData || !isAddedToWishlist) {
      operationWithWishlistIsProcessing.value = false
      return
    }

    wishlistStore.addItemToWishlist(
      Object.assign(productData, { selectedVariant: configurableProductVariant.value })
    )
    operationWithWishlistIsProcessing.value = false
  }
  const removeFromWishlist = async () => {
    const payload: TWishlistOperationWithProductInput = { productId }
    if (configurableProductVariant.value) {
      payload.variantId = configurableProductVariant.value
    }

    operationWithWishlistIsProcessing.value = true
    const isRemovedFromWishlist = await userWishlistApi.removeProductToWishlist(payload)
    if (!isRemovedFromWishlist) {
      operationWithWishlistIsProcessing.value = false
      return
    }

    operationWithWishlistIsProcessing.value = false
    wishlistStore.removeItemFromWishlist(productId)
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
