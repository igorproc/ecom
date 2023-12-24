<template>
  <vs-row class="app-admin-edit-product-card product-card">
    <vs-col
      :sm="12"
      :md="6"
      :lg="4"
      class="product-card__image"
    >
      <img :src="product.productImage" :alt="product.name">
    </vs-col>
    <vs-col
      :sm="12"
      :md="6"
      :lg="8"
      class="product-card__content card-content"
    >
      <div class="card-content__field">
        <span>
          Product name: {{ product.name }}
        </span>
        <vs-button type="transparent">
          <Icon icon="gridicons:pencil" />
        </vs-button>
      </div>
      <div class="card-content__field">
        <span>
          Product price: {{ productPrice }}
        </span>
        <vs-button type="transparent">
          <Icon icon="gridicons:pencil" />
        </vs-button>
      </div>
      <div class="card-content__dates">
        <span>
          Published At: {{ product.createdAt }}
        </span>
        <span>
          Updated At: {{ product.updatedAt }}
        </span>
      </div>
    </vs-col>
  </vs-row>
</template>

<script setup lang="ts">
// Ui Components
import { VsButton, VsCol, VsRow } from 'vuesax-alpha'
import { Icon } from '@iconify/vue'
// Utils
import { formattedPrice } from '~/utils/getCurrencyFormat.util'
// Types & Interfaces
import type { TProduct } from '~/types/api'

interface Props {
  product: TProduct
}

const props = defineProps<Props>()
const { product } = toRefs(props)

const productPrice = computed(() => {
  return formattedPrice(product.value.price)
})
</script>

<style lang="scss">
.app-admin-edit-product-card {
  border: 1px solid rgb(var(--vs-primary));
  border-radius: 0.375rem;

  .product-card__image,
  .product-card__content {
    padding: 0.5rem;
  }

  .product-card__image {
    border-radius: 0.375rem;
  }

  .product-card__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.5rem;
  }

  .card-content__field {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .vs-button {
      font-size: 0.9rem;

      .vs-button__content {
        padding: 0.4rem;
      }
    }
  }

  .card-content__dates {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
