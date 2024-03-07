<template>
  <img
    :src="src"
    :alt="alt"
    class="ui-lazy-image"
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

<style lang="scss" scoped>
.ui-lazy-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

