<template>
  <vs-button type="transparent" class="app-user-logout" @click="logoutUser">
    Выйти
  </vs-button>
</template>

<script setup lang="ts">
// Pinia Methods
import { logoutUser } from '~/store/user/auth'
</script>

<style lang="scss">
.app-user-logout {
  .vs-button__content {
    font-weight: bold;
  }
}
</style>
