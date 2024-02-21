<template>
  <a-row :gutter="[24,16]" class="app-admin-edit-product-card product-card">
    <a-col
      :sm="24"
      :md="12"
      :lg="8"
      class="product-card__image"
    >
      <img width="100%" :src="product.productImage" :alt="product.name">
    </a-col>
    <a-col
      :sm="24"
      :md="12"
      :lg="16"
      class="product-card__content card-content"
    >
      <div class="card-content__field">
      <span>
        Product name: {{ product.name }}
      </span>
        <a-button type="link">
          <EditOutlined />
        </a-button>
      </div>

      <div class="card-content__field">
      <span>
        Product price: {{ productPrice }}
      </span>
        <a-button type="link">
          <EditOutlined />
        </a-button>
      </div>

      <div class="card-content__dates">
      <span>
        Published At: {{ product.createdAt }}
      </span>
        <span>
        Updated At: {{ product.updatedAt }}
      </span>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
// Utils
import { formattedPrice } from '~/utils/getCurrencyFormat.util'
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'

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
  border-radius: 0.375rem;
}
</style>
