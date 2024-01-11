<template>
  <a-card hoverable class="app-product-tile --base base-product">
    <template #cover>
      <img
        :src="product.productImage"
        :alt="product.name"
        class="base-product__image"
      >
    </template>

    <a-card-meta :title="product.name" />

    <template #actions>
      <a-button
        key="base-product-add-wishlist"
        type="link"
        :danger="productIsAddedToWishlist"
        :disabled="operationWithWishlistIsProcessing"
        @click="addProductToWishlist"
      >
        <div>
          <HeartFilled v-if="productIsAddedToWishlist" />
          <HeartOutlined v-else />
        </div>
      </a-button>
      <a-button
        key="base-product-add-cart"
        type="link"
        :danger="productIsAddedToWishlist"
        :disabled="operationWithCartIsProcessing"
        @click="addProductToCart"
      >
        <div>
          <ShoppingCartOutlined v-if="productIsAddedToWishlist" />
          <ShoppingFilled v-else />
        </div>
      </a-button>
    </template>
  </a-card>
</template>

<script setup lang="ts">
// Composables
import { useProduct } from '~/composables/useProduct'
// Types & Interfaces
import type { TProduct } from '~/types/api'

interface Props {
  product: TProduct
}

const props = defineProps<Props>()
const { product } = toRefs(props)
const {
  productIsAddedToCart,
  productIsAddedToWishlist,
  operationWithCartIsProcessing,
  operationWithWishlistIsProcessing,
  addToCart,
  addToWishlist,
  removeFromWishlist,
  removeFromCart,
} = useProduct(product.value.pid)

const addProductToWishlist = () => {
  if (operationWithWishlistIsProcessing.value) {
    return
  }

  if (productIsAddedToWishlist.value) {
    removeFromWishlist()
    return
  }
  addToWishlist()
}
const addProductToCart = () => {
  if (operationWithCartIsProcessing.value) {
    return
  }

  if (productIsAddedToCart.value) {
    removeFromCart()
    return
  }
  addToCart()
}
</script>

<style lang="scss">
.app-product-tile.--base {
  .base-product__image {
    max-height: 300px;
  }
}
</style>
