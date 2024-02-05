<template>
  <div class="app-products-page">
    <AppProductList :product-list="data" />
  </div>
</template>

<script setup lang="ts">
// Components
import AppProductList from '~/components/products/AppProductList.vue'
// Pinia Stores
import { useProductStore } from '~/store/product'
// Api Methods
import { getProductPage } from '~/api/product/getProductPage'

const productStore = useProductStore()
const onLoad = async () => {
  const productList = await getProductPage(1, 12) || []

  productStore.productList = productList
  return productList
}

const { data } = useLazyAsyncData(
  'user-product-list-all',
  async () => await onLoad()
)
</script>
