<template>
  <div class="app-admin-edit-product-page">
    <AppAdminEditProductForm
      v-if="adminStore.configurableProduct"
      :configurable-product="adminStore.configurableProduct"
    />
  </div>
</template>

<script setup lang="ts">
// Pinia Stores
import { useAdminStore } from '~/store/user/admin'
// Api Methods
import { getProductData } from '~/api/product/getProductData'
// Components
import AppAdminEditProductForm from '~/components/admin/product/AppAdminEditProductForm.vue'

definePageMeta({
  middleware: ['auth'],
  isAdminPage: true,
})

const router = useRouter()
const route = useRoute()
const adminStore = useAdminStore()

if (!route.params.productId || Array.isArray(route.params.productId)) {
  await router.push({ name: 'admin-products' })
}

const productData = await getProductData(Number(route.params.productId))
if (productData) {
  adminStore.setConfigurableProduct(productData)
} else {
  await router.push({ name: 'admin-products' })
}
</script>
