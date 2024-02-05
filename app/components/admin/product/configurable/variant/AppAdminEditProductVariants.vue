<template>
  <div class="app-admin-edit-product-variants-list product-variant-list">
    <a-tabs size="large" class="product-variant-list__tabs">
      <template #rightExtra>
        <a-button
          @click="addNewVariantGroupIsOpen = true"
        >
          Add new variant
        </a-button>
      </template>

      <a-tab-pane
        v-for="variant in productVariants"
        :key="variant.product.id"
        :tab="variant.product.sku as any"
      >
        <AppAdminEditProductVariantItem
          :product-variant="variant"
        />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
//Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'
import AppAdminEditProductVariantItem
  from '~/components/admin/product/configurable/variant/AppAdminEditProductVariantItem.vue'

interface Props {
  productVariants: TProduct['productVariants'] | null
}

const props = defineProps<Props>()
const { productVariants } = toRefs(props)

const addNewVariantGroupIsOpen = ref(false)
</script>
