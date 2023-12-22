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
          width="100%"
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
    <div
      v-if="product.productOptions?.length && product.productVariants?.length"
      class="app-configurable-product-tile__configurable-switches"
    >
      <AppConfigurableProductSwitchGroup
        :product-options="product.productOptions"
        :product-variants="product.productVariants"
      />
    </div>
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
  padding: 0.25rem;

  .vs-card {
    max-width: 100% !important;

    .vs-card__text {
      border-radius: unset !important;
      width: 100%;
    }
  }

  .app-configurable-product-tile__configurable-switches {
    padding: 0.1rem 0;
    background: rgba(var(--vs-background),.8);
    --webkit-backdrop-filter: saturate(180%) blur(20px);
    backdrop-filter: saturate(180%) blur(20px);
    border-radius: 0 0 20px 20px;
  }
}
</style>
