<template>

</template>

<script setup lang="ts">
interface Props {
  totalPages: number,
  currentPage: number,
}

interface Emits {
  (name: 'currentPage:update', pageNumber: number): void
}

const props = defineProps<Props>()

const currentPages = computed(() => {
  if (props.currentPage - props.currentPage < 3) {
    return []
  }

  const pages = []
  for (let i = props.currentPage; i < props.currentPage + 3; i++) {
    pages.push({
      id: Date.now().toString(32),
      currentPage: i,
    })
  }
  return pages
})

</script>
