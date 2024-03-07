<template>
  <div class="app-product-page">
    <AppProductBaseBlock v-if="data" :product="data" />
  </div>
</template>

<script setup lang="ts">
// Components
import AppProductBaseBlock from '~/components/products/product-block/_Base.vue'
// Api Methods
import { getProductData } from '~/api/product/getProductData'
// Pinia Stores
import { useProductStore } from '~/store/product'

const productStore = useProductStore()
const route = useRoute()
const router = useRouter()

const onLoad = async () => {
  const productName = route.params.name

  if (typeof productName !== 'string' || Array.isArray(route.params.name)) {
    await router.push({ name: '404' })
    return null
  }

  const data = await getProductData(productName)
  if (data) {
    productStore.productList.push(data)
  }
  return data
}

const { data } = useLazyAsyncData(
  `product-page-${route.params.name}`,
  async () => await onLoad()
)
</script>
