<template>
  <div class="app-products-page products">
    <AppProductListFilters
      :total-products="totalProducts"
      :page-size="pageSize"
      :current-page="currentPage"
      class="products__filters"
      @page-size-updated="updatePageSize"
    />

    <AppProductList
      :product-list="productStore.productList || []"
      class="products__list"
    />

    <AppProductListPagination
      :total-pages="totalPages"
      :current-page="currentPage"
      class="products__pages-list"
      @update-current-page="updateCurrentPage"
    />
  </div>
</template>

<script setup lang="ts">
// Components
import AppProductList from '~/components/products/AppProductList.vue'
// Pinia Stores
import { useProductStore } from '~/store/product'
// Api Methods
import { getProductPage } from '~/api/product/getProductPage'
import AppProductListFilters from '~/components/products/product-list/AppProductListFilters.vue'
import AppProductListPagination from '~/components/products/product-list/AppProductListPagination.vue'

const productStore = useProductStore()

const totalProducts = ref(0)
const currentPage = ref(1)
const pageSize = ref(16)

const onLoad = async () => {
  const productsData = await getProductPage(currentPage.value, pageSize.value)

  if (productsData) {
    totalProducts.value = productsData.totalProducts
    productStore.productList = productsData?.products || []
  }
  return productsData
}

const { data } = useLazyAsyncData(
  'user-product-list-all',
  async () => await onLoad()
)

const totalPages = computed(() => {
  return Math.floor(totalProducts.value / currentPage.value) + (totalProducts.value % currentPage.value ? 1 : 0)
})

const updatePageSize = async (providedPageSize: number) => {
  pageSize.value = providedPageSize
  await onLoad()
}

const updateCurrentPage = async (pageNumber: number) => {
  currentPage.value = pageNumber
  await onLoad()
}
</script>

<style lang="scss">
.app-products-page {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .products__filters {
    width: 100%;
  }

  .products__list {
    margin-top: 18rem;
    width: 100%;
  }

  .products__pages-list {
    margin-top: 24rem;
    width: 100%;
  }

  @media #{map-get($display-rules, 'xl')} {
    .products__list {
      margin-top: 40rem;
      padding: 0 25rem;
    }

    .products__pages-list {
      margin-top: 65rem;
    }
  }
}
</style>
