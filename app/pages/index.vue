<template>
  <div class="app-main-page main-page">
    <div class="main-page__slider">
      <AppMainSlider />
    </div>
    <div v-if="data" class="main-page__showcase">
      <AppShowcaseList :product-list="data" />
    </div>
  </div>
</template>

<script setup lang="ts">
// Pinia Stores
import { useProductStore } from '~/store/product/index'
// Api Methods
import { getProductPage } from '~/api/product/getProductPage'
// Components
import AppMainSlider from '~/components/main/AppMainSlider.vue'
import AppShowcaseList from '~/components/products/AppShowcaseList.vue'

const productStore = useProductStore()

const onLoad = async () => {
  const productList = await getProductPage(1, 12) || []

  productStore.productList = productList
  return productList
}

const { data } = useLazyAsyncData(
  'main-showcase-list',
  async () => await onLoad()
)
</script>

<style lang="scss">
.app-main-page {
  .main-page__slider {
    margin: -10rem -15rem;
  }

  .main-page__showcase {
    margin-top: 23rem;
  }

  @media #{map-get($display-rules, 'xl')} {
    .main-page__slider {
      margin: 0 -65rem;
    }

    .main-page__showcase {
      margin-top: 56rem;
    }
  }
}
</style>
