<template>
  <div class="app-navigation-drawer-trigger px-2">
    <v-btn icon class="trigger__action" @click="conditionStore.openNavigationDrawer">
      <Icon icon="gridicons:menu" class="action__icon" />
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
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
