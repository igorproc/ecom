<template>
  <v-list-item
    v-if="!userStore.isGuest && userStore.userData"
    prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
  >
    <v-list-item-title>{{ userStore.userData.email }}</v-list-item-title>
  </v-list-item>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/user'

const userStore = useUserStore()
</script>
