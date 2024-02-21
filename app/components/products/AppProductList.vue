<template>
  <div class="app-product-list product-list">
    <AppProductListFilters class="product-list__filters" />

    <div v-if="productList?.length" class="product-list__container list-container">
      <component
        v-for="product in productList"
        :key="product.pid"
        :is="getComponent(product.__typename)"
        :product="product"
        class="list-container__item"
      />
    </div>

    <div class="product-list__pagination">

    </div>
  </div>
</template>

<script setup lang="ts">
// Components
import AppBaseProductTile from '~/components/products/product-tile/_Base.vue'
import AppConfigurableProductTile from '~/components/products/product-tile/Configurable.vue'
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'
import AppProductListFilters from '~/components/products/product-list/AppProductListFilters.vue'

interface Props {
  productList: TProduct[] | null
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

  @media #{map-get($display-rules, 'xl')} {
    .product-list__container {
      margin-top: 64rem;
    }
  }
}
</style>
