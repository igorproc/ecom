<template>
  <div class="app-product-showcase-list showcase-list">
    <h1 class="showcase-list__title">
      Our Products
    </h1>

    <div class="showcase-list__products products">
      <AppBaseProductTile
        v-for="product in productList"
        :key="product.pid"
        :product="product"
        class="products__item"
      />
    </div>

    <div class="showcase-list__link">
      <ui-button
        label="Show More"
        variant="outlined"
        title="Show More"
        link="products?page=1&size=8"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'
// Components
import AppBaseProductTile from '~/components/products/product-tile/_Base.vue'

interface Props {
  productList: TProduct[]
}

const props = defineProps<Props>()
</script>

<style lang="scss">
.app-product-showcase-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .showcase-list__title {
    font-family: $poppins-font-family;
    font-size: 24rem;
    font-weight: bold;
  }

  .showcase-list__products {
    margin-top: 15rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15rem;
  }

  .showcase-list__link {
    margin-top: 20rem;
  }

  @media #{map-get($display-rules, 'xl')} {
    margin-top: 32rem;

    .showcase-list__title {
      font-size: 40rem;
    }

    .showcase-list__products {
      gap: 32rem;
    }

    .showcase-list__link {
      margin-top: 32rem;
    }
  }
}
</style>
