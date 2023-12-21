<template>
  <div class="app-main-page">
    <AppProductList
      :product-list="data"
    />
  </div>
</template>

<script setup lang="ts">
// Components
import AppProductList from '~/components/products/AppProductList.vue'
// Pinia Stores
import { useProductStore } from '~/store/product'
// Types & Interfaces
import type { TProduct } from '~/types/api'

const productStore = useProductStore()
const { data } = await useAsyncData<TProduct[] | null>(
  'product-list-user',
  () => $fetch('/api/product/getProductList'),
)
if (data) {
  productStore.setProductList(data.value || [])
}
</script>
