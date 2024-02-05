<template>
  <a-row :gutter="[8, 0]" class="app-admin-edit-configurable-product-variant configurable-product-variant">
    <a-col
      :sm="24"
      :md="16"
    >
      <a-table>

      </a-table>
    </a-col>

    <a-col :sm="24" :md="8">
      <a-card class="configurable-product-variant__card">
        <template #cover>
          <img
            v-if="productVariant.product.imageUrl"
            :src="productVariant.product.imageUrl"
            :alt="productVariant.product.sku"
          >
          <a-skeleton-image v-else />
        </template>

        <a-card-meta>
          {{ productVariant.product }}
        </a-card-meta>
        <a-card-grid>
          {{ productVariant.attributes }}
        </a-card-grid>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
// Types & Interfaces
import type { TConfigurableProductVariants } from '~/api/product/configurable/shred.types'

interface Props {
  productVariant: TConfigurableProductVariants
}

const tableAttributes = [
  {
    key: '',
    dataIndex: '',

  }
]

const props = defineProps<Props>()
const { productVariant } = toRefs(props)
</script>
