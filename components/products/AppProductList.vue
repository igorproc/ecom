<template>
  <div class="app-product-list product-list">
    <vs-row
      v-if="productList && productList.length"
      class="app-product-list__container list-container"
    >
      <vs-col
        v-for="product in productList"
        :key="product.pid"
        :xs="12"
        :sm="5"
        :lg="3"
        :xl="2"
        class="list-container__item"
      >
        <component :is="getComponent(product)" :product="product" class="list-container__item-product" />
      </vs-col>
    </vs-row>
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

<style lang="scss">
.app-product-list {
  padding: 0 0.75rem;

  .app-product-list__container {
    .list-container__item {
      .list-container__item-product {
        display: flex;
        align-items: center;
        justify-content: center;
        .vs-card-content {
          max-width: 300px;
        }
      }
      @media #{map-get($display-breakpoints, 'md')} {
        margin: 0 auto;
        .list-container__item-product {
          display: block;
          max-width: 330px;
          .vs-card-content {
            max-width: unset;
          }
        }
      }
      @media #{map-get($display-breakpoints, 'lg')} {
        margin: unset;
      }
    }
  }
}
</style>
