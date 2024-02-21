<template>
  <div class="admin-products-page w-100 h-100 px-2">
    <AppAdminProductListHeader :product-count="data?.length" class="admin-products-page__header" />
    <AppAdminProductList :product-list="data || []" class="admin-products-page__products-table" />
  </div>
</template>

<script setup lang="ts">
// Components
import AppAdminProductList from '~/components/admin/products/product-list/AppAdminProductList.vue'
import AppAdminProductListHeader from '~/components/admin/products/AppAdminProductListHeader.vue'
// Pinia Stores
import { useProductStore } from '~/store/product'
// Api Methods
import { getProductPage } from '~/api/product/getProductPage'
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'

const productStore = useProductStore()

definePageMeta({
  middleware: ['auth'],
  isAdminPage: true,
})

const onLoad = async () => {
  const productList = await getProductPage(1)
  if (!productList) {
    productStore.productList = []
    return [] as TProduct[]
  }

  productStore.productList = productList
  return productList
}

const { data } = await useAsyncData(
  'product-list-admin',
  async () => await onLoad(),
)
</script>

<style>
.admin-products-page {
  padding: 0 15px;

  .admin-products-page__products-table {
    margin-top: 0.75rem;
  }
}
</style>
