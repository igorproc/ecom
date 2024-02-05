<template>
  <div class="app-wishlist-page">
    <AppWishlistList :wishlist-items-list="data" />
  </div>
</template>

<script setup lang="ts">
// Components
import AppWishlistList from '~/components/wishlist/AppWishlistList.vue'
// Pinia Stores
import { useWishlistStore } from '~/store/wishlist'
// Api Methods
import { getWishlistProducts } from '~/api/user/wishlist/wishlistProducts'
// Types & Interfaces
import type { TWishlistProduct } from '~/api/user/wishlist/wishlistProducts'

const wishlistStore = useWishlistStore()

const onLoad = async () => {
  if (wishlistStore.allWishlistItemsHasAProductData) {
    return [] as TWishlistProduct[]
  }

  const wishlistProductData = await getWishlistProducts()
  if (!wishlistProductData) {
    wishlistStore.productList =  []
    return [] as TWishlistProduct[]
  }

  wishlistStore.productList = wishlistProductData
  return wishlistProductData
}

const { data } = await useAsyncData(
  'user-wishlist-products',
  async () => await onLoad()
)
</script>
