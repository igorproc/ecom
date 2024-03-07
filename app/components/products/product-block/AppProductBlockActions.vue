<template>
  <div class="app-product-block-actions">
    <ui-button
      :disabled="addToCartActionIsDisabled"
      background-color="#000"
      variant="outlined"
      label="Add To Cart"
    />
    <ui-button
      :disabled="addToWishlistActionIsDisabled"
      background-color="#000"
      variant="outlined"
      label="Wishlist"
      prepend-icon="user/heart"
      @click="addProductToWishlist"
    />
  </div>
</template>

<script setup lang="ts">
// Types & Interfaces
import { EAddProductTypes } from '~/api/product/shared.types'

interface Props {
  typename: EAddProductTypes
  productId: number
  variantId?: number
}

const props = defineProps<Props>()
const { typename, productId, variantId } = toRefs(props)
const {
  productIsAddedToWishlist,
  productIsAddedToCart,
  operationWithWishlistIsProcessing,
  operationWithCartIsProcessing,
  addToWishlist,
  removeFromWishlist,
  addToCart,
  removeFromCart,
  addProductVariant,
} = useProduct(productId.value)

const addToCartActionIsDisabled = computed(() => {
  if (operationWithCartIsProcessing.value) {
    return true
  }
  return typename.value === 'CONFIGURABLE' && !variantId.value
})

const addToWishlistActionIsDisabled = computed(() => {
  if (operationWithWishlistIsProcessing.value) {
    return true
  }
  return typename.value === 'CONFIGURABLE' && !variantId.value
})

const addProductToWishlist = async () => {
  if (addToWishlistActionIsDisabled.value) {
    return
  }

  if (productIsAddedToWishlist.value) {
    return await removeFromWishlist()
  }
  return await addToWishlist()
}

watch(variantId, newVal => {
  addProductVariant(newVal || null)
})
</script>

<style lang="scss">
.app-product-block-actions {
  display: flex;
  align-items: center;

  .ui-button {
    border-radius: 15rem;
  }

  @media #{map-get($display-rules, 'xl')} {
    gap: 18rem;

    .ui-button {
      padding: 17rem 48rem;
    }
  }
}
</style>
