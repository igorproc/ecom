<template>
  <div class="app-product-list-pagination">
    <ui-pagination
      :items="mock"
      v-model:current-page="localCurrentPage"
      :total-pages="totalPages"
      next-page-action
    />
  </div>
</template>

<script setup lang="ts">
// Types & Interfaces
import type { IPaginationItem } from '~/components/ui/pagination/pagination.vue'

interface Props {
  totalPages: number,
  currentPage: number,
}

interface Emits {
  (name: 'updateCurrentPage', pageNumber: number): void
}

const mock: IPaginationItem[] = [
  {
    text: 1,
    value: 1,
  },
  {
    text: 2,
    value: 2,
  },
  {
    text: 3,
    value: 3,
  }
]

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const localCurrentPage = ref(props.currentPage)

watch(localCurrentPage, newVal => {
  emit('updateCurrentPage', newVal)
})
</script>
