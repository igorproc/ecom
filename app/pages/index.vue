<template>
  <div class="app-main-page main-page">
    <div class="main-page__slider">
      <AppMainSlider />
    </div>
    <div class="main-page__personality-slider">
      <AppPersonalitySlider />
    </div>
    <div v-if="data" class="main-page__showcase">
      <AppShowcaseList :product-list="data.products" />
    </div>
    <div class="main-page__example-slider">
      <AppMainExampleSlider />
    </div>
  </div>
</template>

<script setup lang="ts">
// Pinia Stores
import { useProductStore } from '~/store/product'
// Api Methods
import { getProductPage } from '~/api/product/getProductPage'
// Components
import AppMainSlider from '~/components/main/AppMainSlider.vue'
import AppShowcaseList from '~/components/products/showcase/AppShowcaseList.vue'
import AppMainExampleSlider from '~/components/main/AppMainExampleSlider.vue'
import AppPersonalitySlider from '~/components/personality/AppPersonalitySlider.vue'

const productStore = useProductStore()

const onLoad = async () => {
  const productsData = await getProductPage({ page: 1, size: 8 })

  productStore.productList = productsData?.products || []
  return productsData
}

const { data } = useLazyAsyncData(
  'main-showcase-list',
  async () => await onLoad()
)
</script>

<style lang="scss">
.app-main-page {
  .main-page__slider,
  .main-page__example-slider {
    margin: -10rem -15rem;
  }

  .main-page__showcase,
  .main-page__personality-slider {
    margin-top: 23rem;
  }

  @media #{map-get($display-rules, 'xl')} {
    .main-page__slider,
    .main-page__example-slider {
      margin: 0 -65rem;
    }

    .main-page__showcase,
    .main-page__personality-slider {
      margin-top: 56rem;
    }
  }

  @media #{map-get($display-rules, 'xxl')} {
    .main-page__slider,
    .main-page__example-slider {
      margin: 0 -185rem;
    }
  }
}
</style>
