<template>
  <div class="app-default-layout">
    <AppHeader />

    <div class="app-default-layout__main">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/common/layout/AppHeader.vue'
</script>

<style lang="scss">
.app-default-layout {
  & &__main {
    margin-top: 83px;
    height: calc(100vh - 83px);
  }
}
</style>
