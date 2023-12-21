<template>
  <div class="app-product-list product-list">
    <div v-if="productList && productList.length" class="app-product-list__list">
      <vs-row>
        <vs-col
          v-for="product in productList"
          :key="product.pid"
          :sm="12"
          :md="6"
          :lg="3"
        >
          <component :is="getComponent(product)" :product="product" />
        </vs-col>
      </vs-row>
    </div>
  </div>
</template>

<script setup lang="ts">
// Ui Components
import {
  VsRow,
  VsCol,
} from 'vuesax-alpha'
// Components
import AppBaseProductTile from '~/components/products/product-tile/_Base.vue'
import AppConfigurableProductTile from '~/components/products/product-tile/Configurable.vue'
// Types & Interfaces
import { TProduct } from '~/types/api'

interface Props {
  productList: TProduct[] | null
}
const props = defineProps<Props>()
const { productList } = toRefs(props)

const getComponent = (product: TProduct) => {
  if (product.__typename === 'CONFIGURABLE') {
    return AppConfigurableProductTile
  }
  return AppBaseProductTile
}
</script>
