<template>
  <div class="app-admin-edit-product-variants-list product-variant-list">
    <h2 class="product-variants-list__title">
      Variants List
    </h2>
    <UiTabs class="product-variant-list__tabs variant-list-tabs">
      <UiTab
        v-for="item in productVariants"
        :key="item.product.sku"
        :title="item.product.sku"
        class="variant-list-tabs__item"
      >
        {{ item.attributes }}
      </UiTab>
    </UiTabs>
  </div>
</template>

<script setup lang="ts">
// Ui Components
import UiTabs from '~/components/common/ui/UiTabs.vue'
import UiTab from '~/components/common/ui/tabs/UiTab.vue'
//Types & Interfaces
import type { TProduct } from '~/types/api'

interface Props {
  productVariants: TProduct['productVariants'] | null
}

const props = defineProps<Props>()
const { productVariants } = toRefs(props)
</script>

<style lang="scss">
.app-admin-edit-product-variants-list {
  .product-variants-list {
    &__title {
      text-align: center;
      font-size: 1.3rem;
      font-weight: bold;
    }
  }
}
</style>
