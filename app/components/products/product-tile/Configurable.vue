<template>
  <UiCard
    :title="product.name"
    :subtitle="product.__typename"
    :link="{ path: 'product/' + product.name.toLowerCase() }"
    class="app-product-tile --configurable configurable-product"
  >
    <template #cover>
      <div class="configurable-product__image-container">
        <ui-image :src="product.productImage" :alt="product.name" />
      </div>
    </template>

    <template #content-expand>
      <div class="configurable-product__price-container price-container">
        <span class="price-container__actual-price">
          {{ productPrice }}
        </span>
      </div>
    </template>
  </UiCard>
</template>

<script setup lang="ts">
// Utils
import { formattedPrice } from '~/utils/getCurrencyFormat.util'
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'

interface Props {
  product: TProduct
}

const runtimeConfig = useRuntimeConfig()

const props = defineProps<Props>()
const { product } = toRefs(props)

const productPrice = computed(() => {
  return formattedPrice(product.value.price)
})

const productUrl = computed(() => `${runtimeConfig.public.appUrl}/product/${product.value.pid}`)

const shareProductUrl = () => {
  if (import.meta.server || !window) {
    return
  }

  navigator
    .clipboard
    .writeText(productUrl.value)
}
</script>

<style lang="scss">
.app-product-tile.--configurable {

  .configurable-product__image-container {
    height: 300rem;

    .ui-image {
      height: 100%;
    }
  }

  .configurable-product__price-container {
    height: 30rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .price-container__actual-price {
      font-size: 16rem;
      font-weight: bold;
    }
  }

  .configurable-product__hover-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .hover-container__add-to-cart-action {
      background-color: map-get($white-color-palette, 'white-5');
      border: none;

      .button-content__label {
        color: map-get($theme-colors, 'accent-color');
      }
    }

    .hover-container__additional-actions {
      display: flex;
      align-items: center;
      justify-content: space-around;

      .ui-button {
        .nuxt-icon,
        .button-content__label {
          color: map-get($white-color-palette, 'white-5');
        }
      }
    }
  }

  @media #{map-get($display-rules, 'xl')} {
    .configurable-product__image-container {
      height: 301rem;
    }

    .configurable-product__price-container {
      .price-container__actual-price {
        font-size: 16rem;
      }
    }

    .configurable-product__hover-container {
      .hover-container__additional-actions {
        margin-top: 24rem;
      }
    }
  }
}
</style>
