<template>
  <AppProductsPage
    v-model:filters="pageFilters"
    :products-is-loaded="productsIsLoaded"
    :total-products="pageData.totalProducts"
  />
</template>

<script setup lang="ts">
// Components
import AppProductsPage from '~/components/products/AppProductListPage.vue'
// Pinia Stores
import { useProductStore } from '~/store/product'
// Api Methods
import { getProductPage } from '~/api/product/getProductPage'
// Types & Interfaces
import type { TGetProductPageInput, TProductPage } from '~/api/product/getProductPage'

const productStore = useProductStore()
const route = useRoute()
const router = useRouter()

const pageFilters = ref<TGetProductPageInput>({ page: 1, size: 8, filters: {} })
const pageData = ref<TProductPage>({ products: [], totalProducts: 0 })
const productsIsLoaded = ref(false)

const getFiltersFromLink = () => {
  if (route.query?.page && Number(route.query?.page)) {
    pageFilters.value.page = Number(route.query?.page)
  }
  if (route.query?.size && Number(route.query?.size)) {
    pageFilters.value.size = Number(route.query?.size)
  }
  if (route.query?.brand) {
    pageFilters.value.filters.brand = route.query.brand.toString()
  }
  if (route.query?.sort) {
    pageFilters.value.filters.sortBy = route.query?.sort.toString()
  }
}
const onUpdateFilters = async () => {
  const routerRewrite: {
    page: string | number,
    size: string | number,
    brand?: string,
    sort?: string,
  } = {
    page: pageFilters.value.page,
    size: pageFilters.value.size,
  }
  if (pageFilters.value.filters.brand) {
    routerRewrite.brand = pageFilters.value.filters.brand
  }
  if (pageFilters.value.filters.sortBy) {
    routerRewrite.sort = pageFilters.value.filters.sortBy
  }

  await router.replace({ query: routerRewrite })
}
const onLoad = async () => {
  productsIsLoaded.value = true
  const productsData = await getProductPage(pageFilters.value)

  if (!productsData) {
    productsIsLoaded.value = false
    return null
  }

  productStore.productList = productsData.products
  pageData.value.totalProducts = productsData.totalProducts
  pageData.value.products = productsData.products
  productsIsLoaded.value = false

  return productsData
}

getFiltersFromLink()
await onUpdateFilters()

useAsyncData('user-product-list-all', async () => await onLoad())

watch(pageFilters, async () => {
  await onUpdateFilters()
  await onLoad()
}, { deep: true })
</script>
