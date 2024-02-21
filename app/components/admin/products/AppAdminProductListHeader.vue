<template>
  <div class="app-admin-product-list-header">
    <a-alert type="info" :message="totalProductCountText" />

    <a-button
      type="primary"
      @click="conditionStore.openAdminAddProductModal"
    >
      Добавить продукт
    </a-button>
  </div>
</template>

<script setup lang="ts">
// Pinia Stores
import { useConditionStore } from '~/store/condition'

interface Props {
  productCount: number
}

const conditionStore = useConditionStore()
const props = defineProps<Props>()
const { productCount } = toRefs(props)

const totalProductCountText = computed(() => {
  if (!productCount.value) {
    return 'Пока нету ни одного товара'
  }
  return `всего товаров: ${productCount.value}`
})
</script>

<style lang="scss">
.app-admin-product-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
