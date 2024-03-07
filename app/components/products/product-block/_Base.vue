<template>
  <div class="app-product-block product-block --base">
    <div class="product-block__image-container product-image-container">
      <ui-image
        :alt="product.name"
        :src="product.productImage"
        class="product-image-container__image"
      />
    </div>

    <div class="product-block__content-container product-content-container">
      <div class="product-content-container__information content-information">
        <h1 class="content-information__title">
          {{ product.name }}
        </h1>
        <h3 class="content-information__price">
          {{ productPrice }}
        </h3>
        <span class="content-information__description">
        {{ product.description }}
      </span>
      </div>

      <AppProductBlockActions
        :typename="product.__typename"
        :product-id="product.pid"
        class="product-content-container__actions"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Components
import AppProductBlockActions from '~/components/products/product-block/AppProductBlockActions.vue'
// Utils
import { formattedPrice } from '~/utils/getCurrencyFormat.util'
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'

interface Props {
  product: TProduct
}

const props = defineProps<Props>()
const { product } = toRefs(props)

const productPrice = computed(() => formattedPrice(product.value.price))
</script>

<style lang="scss">
.app-product-block {
  &.--base {
    display: flex;
    align-items: center;
    justify-content: center;

    .product-block__content-container {
      .product-content-container__information {
        .content-information__title,
        .content-information__price,
        .content-information__description {
          font-family: $poppins-font-family;
        }

        .content-information__price {
          font-weight: normal;
          color: map-get($gray-color-palette, 'gray-2');
        }
      }
    }

    @media #{map-get($display-rules, 'xl')} {
      padding: 35rem 0;
      gap: 105rem;

      .product-block__image-container {
        .product-image-container__image {
          width: 420rem;
          height: 500rem;
        }
      }

      .product-block__content-container {
        width: 610rem;
        .product-content-container__information {
          max-width: 420rem;

          .content-information__title {
            font-size: 42rem;
          }

          .content-information__price {
            font-size: 24rem;
            margin-bottom: 18rem;
          }

          .content-information__description {
            max-width: 420rem;
          }
        }

        .product-content-container__actions {
          margin-top: 32rem;
        }
      }
    }
  }
}
</style>
