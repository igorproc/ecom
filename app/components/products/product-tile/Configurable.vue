<template>
  <a-card hoverable class="app-product-tile --configurable configurable-product">
    <template #cover>
      <div class="configurable-product__image-container">
        <img
          v-if="product.productImage"
          :src="product.productImage"
          :alt="product.name"
        >
        <a-skeleton-image v-else />
      </div>
    </template>

    <a-card-meta :title="product.name" class="configurable-product__title" />

    <a-card-grid class="configurable-product__interactions-container interactions-container">
      <div class="interactions-container__base">
        <a-button
          type="link"
          size="large"
          :disabled="!configurableProductVariant || operationWithWishlistIsProcessing"
          @click="addProductToWishlist"
        >
          <HeartTwoTone :two-tone-color="wishlistButtonColor" />
        </a-button>
        <a-button
          type="link"
          size="large"
          :disabled="!configurableProductVariant || operationWithCartIsProcessing"
          @click="addProductToCart"
        >
          <ShoppingTwoTone :two-tone-color="cartButtonColor" />
        </a-button>
      </div>

      <div
        v-if="product.productOptions && product.productVariants"
        class="interactions-container__switches"
      >
        <AppConfigurableProductSwitchGroup
          :product-options="product.productOptions"
          :product-variants="product.productVariants"
          @product-variant-is-selected="selectVariant"
          @product-variant-is-not-selected="selectVariant(null)"
        />
      </div>
    </a-card-grid>
  </a-card>
</template>

<script setup lang="ts">
// Composables
import { useProduct } from '~/composables/useProduct'
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'
import AppConfigurableProductSwitchGroup
  from '~/components/products/product-tile/swith/AppConfigurableProductSwitchGroup.vue'

interface Props {
  product: TProduct
}

const props = defineProps<Props>()
const { product } = toRefs(props)

const {
  addProductVariant,
  operationWithWishlistIsProcessing,
  productIsAddedToWishlist,
  addToWishlist,
  removeFromWishlist,
  operationWithCartIsProcessing,
  productIsAddedToCart,
  addToCart,
  removeFromCart,
  configurableProductVariant,
} = useProduct(product.value.pid)

const selectVariant = (productVariant: number | null) => {
  addProductVariant(productVariant)
}

const wishlistButtonColor = computed(() => {
  if (operationWithWishlistIsProcessing.value || !configurableProductVariant.value) {
    return '#000'
  }
  if (productIsAddedToWishlist.value) {
    return '#eb2f96'
  }
})

const cartButtonColor = computed(() => {
  if (operationWithCartIsProcessing.value || !configurableProductVariant.value) {
    return '#000'
  }
  if (productIsAddedToCart.value) {
    return '#eb2f96'
  }
})

const addProductToWishlist = async () => {
  if (operationWithWishlistIsProcessing.value) {
    return
  }
  if (productIsAddedToWishlist.value) {
    await removeFromWishlist()
    return
  }
  await addToWishlist()
}

const addProductToCart = async () => {
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
.app-product-tile.--configurable {
  cursor: unset !important;

  .configurable-product__image-container {
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

  .ant-card-body {
    flex-direction: column;

    .configurable-product__title {
      width: 100%;
      padding: 0.75rem;
      margin-top: 0.25rem;
    }

    .configurable-product__interactions-container {
      width: 100%;
      padding: 0.5rem 0;
      box-shadow: none;

      .interactions-container__base {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

  @media #{map-get($display-breakpoints, 'lg')} {
    max-width: 260px;
  }
}
</style>
