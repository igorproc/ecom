<template>
  <a-card hoverable class="app-product-tile --base base-product">
    <template #cover>
      <div class="base-product__image-container">
        <img
          v-if="product.productImage"
          :src="product.productImage"
          :alt="product.name"
        >
        <a-skeleton-image v-else />
      </div>
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
          <HeartOutlined
            v-else
            :two-tone-color="productIsAddedToWishlist ? '#eb2f96' : '#1677ff'"
          />
        </div>
      </a-button>
      <a-button
        key="base-product-add-cart"
        type="link"
        :disabled="operationWithCartIsProcessing"
        @click="addProductToCart"
      >
        <div>
          <ShoppingCartOutlined v-if="productIsAddedToWishlist" />
          <ShoppingFilled
            :two-tone-color="productIsAddedToWishlist ? '#eb2f96' : '#1677ff'"
            v-else
          />
        </div>
      </a-button>
    </template>
  </a-card>
</template>

<script setup lang="ts">
// Composables
import { useProduct } from '~/composables/useProduct'
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'

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
  cursor: unset !important;

  .base-product__image-container {
    max-height: 300px;

    img {
      width: 100%;
      height: 230px;
    }

    .ant-skeleton {
      width: 100%;

      .ant-skeleton-image {
        width: 100%;
        height: 230px;
        border-radius: 0;
      }
    }
  }

  @media #{map-get($display-breakpoints, 'lg')} {
    max-width: 260px;
  }
}
</style>
