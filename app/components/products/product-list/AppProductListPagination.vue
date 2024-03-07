<template>
  <div class="app-product-list-pagination">
    <ui-pagination
      v-model:current-page="localCurrentPage"
      :total-pages="totalPages"
      :disabled="isDisabled"
      prev-page-action
      next-page-action
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  isDisabled: boolean,
  totalProducts: number,
  currentPage: number,
  pageSize: number,
}

interface Emits {
  (name: 'updateCurrentPage', pageNumber: number): void
}

const props = defineProps<Props>()
const { totalProducts, pageSize } = toRefs(props)
const emit = defineEmits<Emits>()
const localCurrentPage = ref(props.currentPage)

const totalPages = computed(() => {
  return (totalProducts.value % pageSize.value ? 1 : 0) + Math.floor(totalProducts.value / pageSize.value)
})

watch(localCurrentPage, newVal => {
  emit('updateCurrentPage', newVal)
})
</script>
