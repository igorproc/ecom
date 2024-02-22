<template>
  <div class="app-products-page">
    <AppProductList :product-list="data?.products || []" :total-products="data?.totalProducts || 0" />
  </div>
</template>

<script setup lang="ts">
// Components
import AppProductList from '~/components/products/AppProductList.vue'
// Pinia Stores
import { useProductStore } from '~/store/product'
// Api Methods
import { getProductPage } from '~/api/product/getProductPage'

const route = useRoute()
const router = useRouter()

const productStore = useProductStore()
const onLoad = async () => {
  if (!route.params.brand || Array.isArray(route.params.brand)) {
    await router.push({ name: 'products' })
    return
  }

  const productsData = await getProductPage(1, 12, { brand: route.params.brand })
  productStore.productList = productsData?.products || []

  return productsData
}

const { data } = useLazyAsyncData(
  `user-product-list-${route.params.brand}`,
  async () => await onLoad()
)
</script>
