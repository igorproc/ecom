<template>
  <v-app-bar>
    <v-row class="h-100">
      <v-col cols="8" md="3" class="d-flex justify-start align-center py-0">
        <AppLogo />
      </v-col>
      <v-spacer />
      <v-col cols="2" class="d-flex justify-end align-center py-0">
        <AppNavigationTrigger />
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script setup lang="ts">
import AppLogo from '~/components/common/AppLogo.vue'
import AppNavigationTrigger from '~/components/common/navigation/AppNavigationTrigger.vue'
</script>
