<template>
  <div class="app-wishlist-page">
    <AppWishlistList :wishlist-items-list="wishlistStore.wishlistProductList" />
  </div>
</template>

<script setup lang="ts">
// Components
import AppWishlistList from '~/components/wishlist/AppWishlistList.vue'
// Pinia Stores
import { useWishlistStore } from '~/store/wishlist'
// Api Methods
import { getWishlistProducts } from '~/api/user/wishlist/wishlistProducts'

const wishlistStore = useWishlistStore()
if (!wishlistStore.allWishlistItemsHasAProductData) {
  const { data } = await useLazyAsyncData(
    'user-wishlist-products',
    async () => await getWishlistProducts(),
  )
  if (data.value) {
    wishlistStore.wishlistProductList = data.value
  }
}
</script>
