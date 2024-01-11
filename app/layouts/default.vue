<template>
  <a-layout class="app-default-layout">
    <AppHeader />

    <a-layout class="app-default-layout__main">
      <a-layout-content>
        <slot />
      </a-layout-content>

      <a-layout-sider
        v-model:collapsible="conditionStore.navigationDrawerIsOpen"
        collapsed-width="0"
        width="250"
      >
        <AppNavigationDrawer
          v-model:collapsed="conditionStore.navigationDrawerIsOpen"
          :default-collapsed="false"
          collapsible
        />
      </a-layout-sider>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
// Components
import AppHeader from '~/components/common/layout/AppHeader.vue'
import AppNavigationDrawer from '~/components/common/layout/navigation/AppNavigationDrawer.vue'
// Pinia Stores
import { useConditionStore } from '~/store/condition'

const conditionStore = useConditionStore()
</script>

<style lang="scss">
.app-default-layout {
  overflow: hidden;

  & &__main {
    height: calc(100vh - 64px);
  }
}
</style>
