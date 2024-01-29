<template>
  <div class="app-main-page">
    <AppProductList
      :product-list="productStore.productList"
    />
  </div>
</template>

<script setup lang="ts">
// Components
import AppProductList from '~/components/products/AppProductList.vue'
// Pinia Stores
import { useProductStore } from '~/store/product'
// Api Methods
import { getAllProducts } from '~/api/product/getAllProducts'

const productStore = useProductStore()
const { data } = await useLazyAsyncData(
  'product-list-user',
  async () => await getAllProducts(),
)
if (data) {
  productStore.setProductList(data.value || [])
}
</script>
