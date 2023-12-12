<template>
  <div class="app-admin-product-list-header">
    <span>{{ totalProductCountText }}</span>

    <vs-button
      type="gradient"
      @click="conditionStore.openAdminAddProductModal"
    >
      Добавить продукт
    </vs-button>
  </div>
</template>

<script setup lang="ts">
import {
  VsButton
} from 'vuesax-alpha'

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