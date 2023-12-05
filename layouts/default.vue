<template>
  <v-app>
    <v-layout class="app-default-layout">
      <AppHeader />

      <v-main class="d-flex align-center justify-center">
        <slot />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import AppHeader from '~/components/common/AppHeader.vue'
</script>
