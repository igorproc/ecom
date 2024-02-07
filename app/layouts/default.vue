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
  overflow: auto;

  .app-header {
    padding: 0 1.5rem !important;
  }

  & &__main {
    height: calc(100vh - 64px);
    padding: 0.5rem 1.5rem;
  }

  @media #{map-get($display-breakpoints, 'md')} {
    .app-header {
      padding: 1rem 2.5rem !important;
    }

    & &__main {
      padding: 1rem 2.5rem;
    }
  }
}
</style>
