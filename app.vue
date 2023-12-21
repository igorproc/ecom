<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ClientOnly>
      <AppGlobalScope />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import AppGlobalScope from '~/components/common/global/AppGlobalScope.vue'
</script>
