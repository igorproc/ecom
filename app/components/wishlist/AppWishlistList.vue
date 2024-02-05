<template>
  <div class="app-wishlist-items-list wishlist-items-list">
    <div
      v-for="product in wishlistItemsList"
      :key="listKey(product)"
      class="wishlist-items-list__item"
    >
      <component :is="getComponent(product.productData)" :wishlist-item="product" />
    </div>
  </div>
</template>

<script setup lang="ts">
// Components
import AppBaseWishlistItem from '~/components/wishlist/items/_Base.vue'
import AppConfigurableWishlistItem from '~/components/wishlist/items/Configurable.vue'
// Types & Interfaces
import type { TWishlistProduct } from '~/api/user/wishlist/wishlistProducts'

interface Props {
  wishlistItemsList: TWishlistProduct[]
}

const props = defineProps<Props>()
const { wishlistItemsList } = toRefs(props)

const listKey = (product: TWishlistProduct) => {
  if (product.productData.__typename === 'BASE' || !product.selectedVariant) {
    return product.productData.pid
  }
  return `${product.productData.pid}-${product.selectedVariant}`
}

const getComponent = (productData: TWishlistProduct['productData']) => {
  if (productData.__typename === 'CONFIGURABLE') {
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

  .wishlist-items-list__item {
    height: 200px;
  }
}
</style>
