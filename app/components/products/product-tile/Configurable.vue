<template>
  <div class="app-product-tile --configurable configurable-product">
    <a-card>
      <template #cover>
        <div class="configurable-product--image-container">
          <img
            v-if="productImage"
            :src="productImage"
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

      <div
        v-if="product.productOptions?.length && product.productVariants?.length"
        class="configurable-product__switches"
      >
        <AppConfigurableProductSwitchGroup
          :product-options="product.productOptions"
          :product-variants="product.productVariants"
          @product-variant-is-selected="selectVariant"
          @product-variant-is-not-selected="unselectVariant"
        />
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
// Components
import AppConfigurableProductSwitchGroup
  from '~/components/products/product-tile/swith/AppConfigurableProductSwitchGroup.vue'
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
  configurableProductVariant,
  operationWithCartIsProcessing,
  operationWithWishlistIsProcessing,
  productIsAddedToCart,
  productIsAddedToWishlist,
  addProductVariant,
  addToCart,
  addToWishlist,
  removeFromWishlist,
  removeFromCart,
} = useProduct(product.value.pid)

const productImage = computed(() => {
  if (!configurableProductVariant.value || !product.value.productVariants) {
    return product.value.productImage
  }

  const variantCandidate = product.value.productVariants
    .find(productVariant => productVariant.product.id === configurableProductVariant.value)
  if (!variantCandidate || !variantCandidate.product.imageUrl) {
    return product.value.productImage
  }
  return variantCandidate.product.imageUrl
})

const unselectVariant = () => {
  addProductVariant(null)
}
const selectVariant = (variantId: number) => {
  addProductVariant(variantId)
}
const addProductToWishlist = () => {
  if (!configurableProductVariant.value || operationWithWishlistIsProcessing.value) {
    return
  }

  if (productIsAddedToWishlist.value) {
    removeFromWishlist()
    return
  }
  addToWishlist()
}
const addProductToCart = () => {
  if (!configurableProductVariant.value || operationWithCartIsProcessing) {
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
.app-product-tile.--configurable {
  .configurable-product--image-container {
    max-height: 300px;

    img {
      width: 100%;
    }

    .ant-skeleton {
      width: 100%;

      .ant-skeleton-image {
        width: 100%;
      }
    }
  }
}
</style>
