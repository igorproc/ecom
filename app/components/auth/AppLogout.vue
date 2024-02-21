<template>
  <a-button
    :disabled="isLoading"
    class="app-user-logout"
    @click="onUserLogout"
  >
    Выйти
  </a-button>
</template>

<script setup lang="ts">
// Pinia Methods
import { logoutUser } from '~/store/user/auth'

const isLoading = ref(false)
const onUserLogout = async () => {
  isLoading.value = true
  await logoutUser()
  isLoading.value = false
}
</script>
