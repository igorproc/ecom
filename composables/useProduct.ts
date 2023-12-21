// Pinia Stores
import { useProductStore } from '~/store/product'
import { useWishlistStore } from '~/store/wishlist'

export const useProduct = (productId: number) => {
  const productStore = useProductStore()
  const wishlistStore = useWishlistStore()

  const productIsAddedToWishlist = ref(
    wishlistStore.productIsInWishlist(productId),
  )
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
    productIsAddedToWishlist.value = true
  }
  const removeFromWishlist = () => {
    productIsAddedToWishlist.value = false
    wishlistStore.removeItemFromWishlist(productId)
  }

  return {
    productIsAddedToWishlist,
    wishlistButtonColor,
    addToWishlist,
    removeFromWishlist,
  }
}
