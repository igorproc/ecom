<template>
  <div class="admin-products-page w-100 h-100 px-2">
    <AppAdminProductListHeader :product-count="productCount" class="admin-products-page__header" />
    <AppAdminProductList :product-list="data || null" class="admin-products-page__products-table" />
  </div>
</template>

<script setup lang="ts">
import AppAdminProductList from '~/components/admin/products/AppAdminProductList.vue'
import AppAdminProductListHeader from '~/components/admin/products/AppAdminProductListHeader.vue'

const { data } = await useAsyncData<unknown[]>(
  'product-list-admin',
  () => $fetch('/api/product/getProductList')
)

const productCount = computed(() => {
  if (!data.value) {
    return 0
  }
  return data.value.length
})
</script>

<style>
.admin-products-page {
  padding: 0 15px;
  .admin-products-page__products-table {
    margin-top: 0.75rem;
  }
}
</style>
