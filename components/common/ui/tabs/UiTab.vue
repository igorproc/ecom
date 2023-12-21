<template>
  <div v-show="selectedTitle === title" class="tabs__content">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string,
  isAction?: boolean
}

defineProps<Props>()
const selectedTitle = inject('selectedTitle')
</script>

<style lang="scss">
.tabs__content {
  display: block;
}
</style>
