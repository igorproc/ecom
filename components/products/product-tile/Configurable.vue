<template>
  <div class="app-configurable-product-tile">
    <vs-card type="4">
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
        <vs-button
          :color="wishlistButtonColor"
          icon
          @click="addProductToWishlist"
        >
          <Icon icon="gridicons:heart-outline" />
        </vs-button>
        <vs-button class="btn-chat" type="shadow">
          <Icon icon="gridicons:cart" />
        </vs-button>
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
  productIsAddedToWishlist,
  wishlistButtonColor,
  removeFromWishlist,
  addToWishlist,
} = useProduct(product.value.pid)

const addProductToWishlist = () => {
  if (productIsAddedToWishlist.value) {
    removeFromWishlist()
    return
  }
  addToWishlist()
}
</script>

<style lang="scss">
.app-configurable-product-tile {
  .vs-card__text {
    width: 100%;
  }
}
</style>
