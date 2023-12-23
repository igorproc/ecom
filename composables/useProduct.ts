// Pinia Stores
import { useProductStore } from '~/store/product'
import { useWishlistStore } from '~/store/wishlist'
import { useCartStore } from '~/store/cart'

export const useProduct = (productId: number) => {
  const productStore = useProductStore()
  const wishlistStore = useWishlistStore()
  const cartStore = useCartStore()

  const productIsAddedToCart = computed(() => {
    return (variantId?: number) => {
      if (!variantId) {
        return !!cartStore.cartIdsList.find(cartId => cartId.productId === productId)
      }
      return !!cartStore.cartIdsList.find(cartId => {
        return cartId.productId === productId && cartId.variantId === variantId
      })
    }
  })
  const productIsAddedToWishlist = computed(() => {
    return !!wishlistStore.wishlistIdsList.find(wishlistId => wishlistId.productId === productId)
  })
  const wishlistButtonColor = computed(() => {
    if (productIsAddedToWishlist.value) {
      return 'danger'
    }
    return 'success'
  })

  const addToWishlist = (variantId?: number) => {
    const payload: { productId: number, variantId?: number } = { productId }
    if (variantId) {
      payload.variantId = variantId
    }

    const productData = productStore.getProductDataById(payload.productId)
    if (!productData) {
      return
    }

    wishlistStore.addItemToWishlist(productData)
  }
  const removeFromWishlist = () => {
    wishlistStore.removeItemFromWishlist(productId)
  }
  const addToCart = (variantId?: number) => {
    cartStore.addItemToCart(productId, 123, variantId || null)
  }
  const removeFromCart = (variantId?: number) => {
    cartStore.removeItemFromCart(productId, variantId || null)
  }

  return {
    productIsAddedToWishlist,
    productIsAddedToCart,
    wishlistButtonColor,
    addToWishlist,
    removeFromWishlist,
    addToCart,
    removeFromCart,
  }
}
