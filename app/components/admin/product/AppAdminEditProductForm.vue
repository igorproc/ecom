<template>
  <a-card class="app-admin-edit-product-form edit-product-form">
    <AppAdminEditProductCard :product="configurableProduct" />
    <a-collapse
      v-if="configurableProduct.typename === 'CONFIGURABLE'"
      class="edit-product-form__configurable-product"
    >
      <a-collapse-panel header="Product options">
        <AppAdminEditProductOptions
          :product-options="configurableProduct.productOptions"
          :product-id="configurableProduct.pid"
        />
      </a-collapse-panel>

      <a-collapse-panel header="Product variants">
        <AppAdminEditProductVariants :product-variants="configurableProduct.productVariants" />
      </a-collapse-panel>
    </a-collapse>
  </a-card>
</template>

<script setup lang="ts">
// Components
import AppAdminEditProductCard from '~/components/admin/product/AppAdminEditProductCard.vue'
import AppAdminEditProductOptions from '~/components/admin/product/configurable/option/AppAdminEditProductOptions.vue'
import AppAdminEditProductVariants from '~/components/admin/product/configurable/variant/AppAdminEditProductVariants.vue'
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'

interface Props {
  configurableProduct: TProduct
}

const props = defineProps<Props>()
const { configurableProduct } = toRefs(props)
</script>

<style lang="scss">
.app-admin-edit-product-form {
  .edit-product-form__configurable-product {
    margin-top: 0.5rem;
  }
}
</style>
