<template>
  <div class="admin-products-page w-100 h-100 px-2">
    <AppAdminProductListHeader
      :product-count="productCount"
      @open-add-product-modal="onAddProductAction"
    />
    <AppAdminProductList class="page__table" />
    <AppAdminAddProductModal
      :is-visible="addProductModalIsVisible"
      @close-add-product-modal="onCloseProductAction"
    />
  </div>
</template>

<script setup lang="ts">
import { productApi } from '~/api/product'

import AppAdminProductList from '~/components/admin/products/AppAdminProductList.vue'
import AppAdminProductListHeader from '~/components/admin/products/AppAdminProductListHeader.vue'
import AppAdminAddProductModal from "~/components/admin/products/AppAdminAddProductModal.vue";

const addProductModalIsVisible = ref(false)
const { data } = await useAsyncData(
  'productList',
  () => productApi.getProductList()
)

const productCount = computed(() => {
  if (!data.value) {
    return 0
  }
  return data.value.length
})

const onAddProductAction = () => {
  addProductModalIsVisible.value = true
}
const onCloseProductAction = () => {
  addProductModalIsVisible.value = false
}
</script>
