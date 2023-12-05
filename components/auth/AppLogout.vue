<template>
  <v-btn @click="logoutUser">
    Выйти из аккаунта
  </v-btn>
</template>

<script setup lang="ts">
import { logoutUser } from '~/store/user/auth'
</script>
