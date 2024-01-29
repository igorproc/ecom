<template>
  <div class="app-product-list product-list">
    <a-row
      v-if="productList && productList.length"
      :gutter="[16,16]"
      class="app-product-list__container list-container"
    >
      <a-col
        v-for="product in productList"
        :key="product.pid"
        :xs="24"
        :sm="12"
        :md="6"
        :xxl="4"
        class="list-container__item"
      >
        <component
          :is="getComponent(product)"
          :product="product"
          class="list-container__item-product"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
// Components
import AppBaseProductTile from '~/components/products/product-tile/_Base.vue'
import AppConfigurableProductTile from '~/components/products/product-tile/Configurable.vue'
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'

interface Props {
  productList: TProduct[] | null
}

const props = defineProps<Props>()
const { productList } = toRefs(props)

const getComponent = (product: TProduct) => {
  if (product.typename === 'CONFIGURABLE') {
    return AppConfigurableProductTile
  }
  return AppBaseProductTile
}
</script>

<style lang="scss">
.app-product-list {
  display: block;
}
</style>
