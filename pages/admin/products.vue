<template>
  <div class="admin-products-page w-100 h-100 px-2">
    <AppAdminProductListHeader :product-count="productStore.productList.length" class="admin-products-page__header" />
    <AppAdminProductList :product-list="productStore.productList" class="admin-products-page__products-table" />
  </div>
</template>

<script setup lang="ts">
// Pinia Stores
import { useProductStore } from '~/store/product'
// Components
import AppAdminProductList from '~/components/admin/products/product-list/AppAdminProductList.vue'
import AppAdminProductListHeader from '~/components/admin/products/AppAdminProductListHeader.vue'
// Types & Interfaces
import { TProduct } from '~/types/api'

definePageMeta({
  middleware: ['auth'],
  isAdminPage: true,
})
const productStore = useProductStore()
const { data } = await useAsyncData<TProduct[]>(
  'product-list-admin',
  () => $fetch('/api/product/getProductList'),
)
if (data) {
  productStore.setProductList(data.value || [])
}
</script>

<style>
.admin-products-page {
  padding: 0 15px;

  .admin-products-page__products-table {
    margin-top: 0.75rem;
  }
}
</style>
