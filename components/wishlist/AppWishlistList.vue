<template>
  <div class="app-wishlist-items-list wishlist-items-list">
    <div
      v-for="product in wishlistItemsList"
      :key="listKey(product)"
      class="wishlist-items-list__item"
    >
      <component :is="getComponent(product)" :wishlist-item="product" />
    </div>
  </div>
</template>

<script setup lang="ts">
// Components
import AppBaseWishlistItem from '~/components/wishlist/items/_Base.vue'
import AppConfigurableWishlistItem from '~/components/wishlist/items/Configurable.vue'
// Types & Interfaces
import type { TWishlistProduct } from '~/types/api'

interface Props {
  wishlistItemsList: TWishlistProduct[]
}

const props = defineProps<Props>()
const { wishlistItemsList } = toRefs(props)

const listKey = (productData: TWishlistProduct) => {
  if (productData.__typename === 'BASE' || !productData.selectedVariant) {
    return productData.pid
  }
  return `${productData.pid}-${productData.selectedVariant}`
}

const getComponent = (product: TWishlistProduct) => {
  if (product.__typename === 'CONFIGURABLE') {
    return AppConfigurableWishlistItem
  }
  return AppBaseWishlistItem
}
</script>

<style lang="scss">
.app-wishlist-items-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
