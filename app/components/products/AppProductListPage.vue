<template>
  <div class="app-products-page products">
    <AppProductListFilters
      :total-products="totalProducts"
      :page-size="filters.size"
      :current-page="filters.page"
      class="products__filters"
      @page-size-updated="updatePageSize"
    />

    <AppProductList
      :is-loading="productsIsLoaded"
      :page-size="filters.size"
      :product-list="productStore.productList"
      class="products__list"
    />

    <AppProductListPagination
      :is-disabled="productsIsLoaded"
      :total-products="totalProducts"
      :current-page="filters.page"
      :page-size="filters.size"
      class="products__pages-list"
      @update-current-page="updateCurrentPage"
    />
  </div>
</template>

<script setup lang="ts">
// Components
import AppProductList from '~/components/products/product-list/AppProductList.vue'
import AppProductListFilters from '~/components/products/product-list/AppProductListFilters.vue'
import AppProductListPagination from '~/components/products/product-list/AppProductListPagination.vue'
// Pinia Stores
import { useProductStore } from '~/store/product'
// Types & Interfaces
import type { TGetProductPageInput } from '~/api/product/getProductPage'

interface Props {
  totalProducts: number,
  filters: TGetProductPageInput,
  productsIsLoaded: boolean,
}

interface Emits {
  (name: 'update:filters', filters: TGetProductPageInput): void
}

const productStore = useProductStore()

const props = defineProps<Props>()
const { totalProducts, filters } = toRefs(props)
const emit = defineEmits<Emits>()

const updatePageSize = async (providedPageSize: number) => {
  emit('update:filters', {
    page: 1,
    size: providedPageSize,
    filters: {
      brand: filters.value.filters.brand,
      sortBy: filters.value.filters.sortBy,
    },
  })
}
const updateCurrentPage = async (pageNumber: number) => {
  emit('update:filters', {
    page: pageNumber,
    size: filters.value.size,
    filters: {
      brand: filters.value.filters.brand,
      sortBy: filters.value.filters.sortBy,
    },
  })
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
    }

    .products__pages-list {
      margin-top: 65rem;
    }
  }
}
</style>
