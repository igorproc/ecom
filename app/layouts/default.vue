<template>
  <a-layout class="app-default-layout">
    <AppHeader />

    <a-layout class="app-default-layout__main">
      <a-layout-content>
        <slot />
      </a-layout-content>
    </a-layout>

    <AppGlobalScope />
  </a-layout>
</template>

<script setup lang="ts">
// Components
import AppHeader from '~/components/common/layout/AppHeader.vue'
import AppGlobalScope from '~/components/common/global/AppGlobalScope.vue'
</script>

<style lang="scss">
.app-default-layout {
  overflow: hidden;

  & &__main {
    height: calc(100vh - 64px);

    @media #{map-get($display-breakpoints, 'md')} {
      padding: 0.75rem;
    }
  }
}
</style>
