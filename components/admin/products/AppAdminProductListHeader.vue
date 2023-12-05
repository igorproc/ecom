<template>
  <div class="app-admin-product-list-header d-flex align-center justify-space-between">
    <span>{{ totalProductCountText }}</span>
    <v-btn
      rounded
      @click="emits('openAddProductModal')"
    >
      Добавить продукт
    </v-btn>
  </div>
</template>

<script setup lang="ts">
interface Props {
  productCount: number
}
interface Emits {
  (name: 'openAddProductModal'): void
}

const emits = defineEmits<Emits>()
const props = defineProps<Props>()
const { productCount } = toRefs(props)

const totalProductCountText = computed(() => {
  if (!productCount.value) {
    return 'Пока нету ни одного товара'
  }
  return `всего товаров: ${productCount.value}`
})
</script>
