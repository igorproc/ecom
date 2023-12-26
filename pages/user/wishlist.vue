<template>
  <div class="app-wishlist-page">
    <AppWishlistList :wishlist-items-list="wishlistStore.wishlistProductList" />
  </div>
</template>

<script setup lang="ts">
// Pinia Stores
import { useWishlistStore } from '~/store/wishlist'
import { userWishlistApi } from '~/api/user'
import AppWishlistList from "~/components/wishlist/AppWishlistList.vue";

definePageMeta({
  middleware: ['auth']
})

const wishlistStore = useWishlistStore()
if (!wishlistStore.allWishlistItemsHasAProductData) {
  const { data } = await useAsyncData(() => userWishlistApi.getWishlistProducts())
  if (data.value) {
    wishlistStore.wishlistProductList = data.value
  }
}
</script>
