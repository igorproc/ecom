<template>
  <div
    class="app-navigation-drawer-trigger"
  >
    <a-button
      type="link"
      class="trigger__action"
      @click="conditionStore.toggleNavigationDrawer"
    >
      <MenuOutlined class="action__icon" />
    </a-button>
  </div>
</template>

<script setup lang="ts">
// Pinia Stores
import { useConditionStore } from '~/store/condition'

const conditionStore = useConditionStore()
</script>

<style lang="scss">
.app-navigation-drawer-trigger {
  .trigger__action {
    .action__icon {
      font-size: 24px;
    }
  }
}
</style>
