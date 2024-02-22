// Pinia Stores
import { useProductStore } from '~/store/product'
import { useWishlistStore } from '~/store/wishlist'
import { useCartStore } from '~/store/cart'
import { addItemToWishlist, removeItemFromWishlist } from '~/store/wishlist/actions'

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
      return wishlistStore.idsList.find(wishlistId => wishlistId.productId === productId)
    }
    if (!configurableProductVariant.value) {
      return false
    }

    return wishlistStore.idsList.find(wishlistId => {
      return wishlistId.productId === productId && wishlistId.variantId === configurableProductVariant.value
    })
  })

  const addProductVariant = (variantId: number | null) => {
    configurableProductVariant.value = variantId
  }
  const addToWishlist = async () => {
    operationWithWishlistIsProcessing.value = true
    if (!productData) {
      operationWithWishlistIsProcessing.value = false
      return false
    }

    await addItemToWishlist(
      productData,
      configurableProductVariant.value,
    )
    operationWithWishlistIsProcessing.value = false
  }
  const removeFromWishlist = async () => {
    if (!productIsAddedToWishlist.value) {
      return false
    }
    operationWithWishlistIsProcessing.value = true

    await removeItemFromWishlist(productIsAddedToWishlist.value.itemId)
    operationWithWishlistIsProcessing.value = false
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
