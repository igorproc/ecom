<template>
  <div class="app-configurable-product-tile">
    <vs-card type="1">
      <template #title>
        <h3>{{ product.name }}</h3>
      </template>

      <template #img>
        <img :src="productImage" :alt="product.name" height="300">
      </template>

      <template #interactions>
        <ClientOnly>
          <vs-button
            :color="
              configurableProductVariant && productIsAddedToWishlist ? 'danger' : 'success'
            "
            :loading="operationWithWishlistIsProcessing"
            :class="{ '--interaction-disabled': !configurableProductVariant  }"
            icon
            @click="addProductToWishlist"
          >
            <Icon icon="gridicons:heart-outline" />
          </vs-button>
          <vs-button
            :loading="operationWithCartIsProcessing"
            icon
            :class="{ '--interaction-disabled': !configurableProductVariant  }"
            @click="addProductToCart"
          >
            <Icon icon="gridicons:cart" />
          </vs-button>
        </ClientOnly>
      </template>

        <template #text>
          <div
            v-if="product.productOptions?.length && product.productVariants?.length"
            class="app-configurable-product-tile__configurable-switches"
          >
            <AppConfigurableProductSwitchGroup
              :product-options="product.productOptions"
              :product-variants="product.productVariants"
              @product-variant-is-selected="selectVariant"
              @product-variant-is-not-selected="unselectVariant"
            />
          </div>
        </template>
    </vs-card>
  </div>
</template>

<script setup lang="ts">
//Ui Components
import {
  VsCard,
  VsButton,
} from 'vuesax-alpha'
import { Icon } from '@iconify/vue'
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
.app-configurable-product-tile {
  padding: 0.25rem;

  .vs-card {
    .vs-card__text {
      border-radius: unset !important;
      width: 100%;
    }

    .--interaction-disabled {
      cursor: auto;
      opacity: 0.6;
    }
  }
}
</style>
