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
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'

const route = useRoute()
const productStore = useProductStore()
const onLoad = async () => {
  let productList: TProduct[] = []
  if (!route.params.brand || Array.isArray(route.params.brand)) {
    productList = await getProductPage(1, 12) || []
  } else {
    productList = await getProductPage(1, 12, { brand: route.params.brand }) || []
  }

  productStore.productList = productList
  return productList
}

const { data } = useLazyAsyncData(
  `user-product-list-${route.params.brand}`,
  async () => await onLoad()
)
</script>
