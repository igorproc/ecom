<template>
  <div class="app-default-layout">
    <AppHeader />
    <div class="app-default-layout__main">
      <slot />
    </div>
    <AppFooter />

    <AppGlobalScope />
  </div>
</template>

<script setup lang="ts">
// Components
import AppHeader from '~/components/common/layout/AppHeader.vue'
import AppGlobalScope from '~/components/common/global/AppGlobalScope.vue'
import AppFooter from '~/components/common/layout/AppFooter.vue'
</script>

<style lang="scss">
.app-default-layout {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: map-get($theme-colors, 'background-colors');

  &__main {
    padding: 10rem 15rem;
  }

  @media #{map-get($display-rules, 'xl')} {
    &__main {
      padding: 25rem 65rem;


    }
  }
}
</style>
