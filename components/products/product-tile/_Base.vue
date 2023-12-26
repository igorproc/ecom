<template>
  <div class="app-base-product-tile">
    <vs-card type="1">
      <template #title>
        <h3>{{ product.name }}</h3>
      </template>
      <template #img>
        <img
          :src="product.productImage"
          :alt="product.name"
          height="300"
        >
      </template>
      <template #text />

      <template #interactions>
        <ClientOnly>
          <vs-button
            :color="productIsAddedToWishlist ? 'danger' : 'success'"
            icon
            :class="{ '--interaction-disabled': operationWithWishlistIsProcessing }"
            @click="addProductToWishlist"
          >
            <Icon icon="gridicons:heart-outline" />
          </vs-button>
          <vs-button
            icon
            :class="{ '--interaction-disabled': operationWithCartIsProcessing }"
            @click="addProductToCart"
          >
            <Icon icon="gridicons:cart" />
          </vs-button>
        </ClientOnly>
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
.app-base-product-tile {
  padding: 0.25rem;

  .vs-card {
    .vs-card__text {
      border-radius: unset !important;
      width: 100%;
    }

    .--interaction-disabled {
      cursor: unset;
      opacity: 0.6;
    }
  }
}
</style>
