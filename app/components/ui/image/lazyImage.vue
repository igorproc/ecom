<template>
  <img
    :src="src"
    :alt="alt"
    @load="emit('loaded')"
  >
</template>

<script setup lang="ts">
interface Props {
  src: string,
  alt: string,
}

interface Emits {
  (name: 'loaded'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
</script>
