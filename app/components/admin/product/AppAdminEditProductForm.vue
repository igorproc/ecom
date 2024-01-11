<template>
  <div class="app-admin-edit-product-form edit-product-form">
    <AppAdminEditProductCard :product="configurableProduct" />
    <div
      v-if="configurableProduct.__typename === 'CONFIGURABLE'"
      class="edit-product-form__configurable-product"
    >
      <AppAdminEditProductOptions
        :product-options="configurableProduct.productOptions"
        :product-id="configurableProduct.pid"
      />
      <AppAdminEditProductVariants :product-variants="configurableProduct.productVariants" />
    </div>
  </div>
</template>

<script setup lang="ts">
// Components
import AppAdminEditProductCard from '~/components/admin/product/AppAdminEditProductCard.vue'
import AppAdminEditProductOptions from '~/components/admin/product/configurable/option/AppAdminEditProductOptions.vue'
import AppAdminEditProductVariants from '~/components/admin/product/configurable/variant/AppAdminEditProductVariants.vue'
// Types & Interfaces
import type { TProduct } from '~/types/api'

interface Props {
  configurableProduct: TProduct
}

const props = defineProps<Props>()
const { configurableProduct } = toRefs(props)
</script>

<style lang="scss">
.app-admin-edit-product-form {
  .app-admin-edit-product-options-list,
  .app-admin-edit-product-variants-list {
    margin-top: 0.5rem;
  }
}
</style>
