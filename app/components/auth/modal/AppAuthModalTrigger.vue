<template>
  <div class="app-auth-modal-trigger">
    <a-button
      type="link"
      @click="conditionStore.openAuthModal"
    >
      <LoginOutlined />
      <span>
        войти
      </span>
    </a-button>
  </div>
</template>

<script setup lang="ts">
// Pinia Stores
import { useConditionStore } from '~/store/condition'

const conditionStore = useConditionStore()
</script>

<style lang="scss">
.app-auth-modal-trigger {
  .ant-btn {
    padding: 0 !important;
  }
}
</style>
