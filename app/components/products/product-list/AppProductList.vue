<template>
  <div class="app-product-list product-list">
    <ui-skeleton-card
      v-if="isLoading"
      v-for="index in pageSize"
      :key="generateRandomId() + index"
    />

    <component
      v-else
      v-for="product in productList"
      :key="product.pid"
      :is="getComponent(product.__typename)"
      :product="product"
      class="product-list__item"
    />
  </div>
</template>

<script setup lang="ts">
// Components
import AppBaseProductTile from '~/components/products/product-tile/_Base.vue'
import AppConfigurableProductTile from '~/components/products/product-tile/Configurable.vue'
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'
import AppProductListFilters from '~/components/products/product-list/AppProductListFilters.vue'
import AppProductListPagination from '~/components/products/product-list/AppProductListPagination.vue'
import { generateRandomId } from '~/utils/generate.util'

interface Props {
  productList: TProduct[] | null,
  isLoading: boolean,
  pageSize: number,
}

const props = defineProps<Props>()

const { productList } = toRefs(props)

const getComponent = (productType: TProduct['__typename']) => {
  if (productType === 'CONFIGURABLE') {
    return AppConfigurableProductTile
  }
  return AppBaseProductTile
}

</script>

<style lang="scss">
.app-product-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12rem;

  @media #{map-get($display-rules, 'md')} {
    justify-content: space-between;
    gap: 24rem;
  }

  @media #{map-get($display-rules, 'lg')} {
    justify-content: flex-start;
  }

  @media #{map-get($display-rules, 'xl')} {
    gap: 51rem;
  }

  @media #{map-get($display-rules, 'xxl')} {
    gap: 27rem;
  }
}
</style>
