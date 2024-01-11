<template>
  <div>
    <a-style-provider hash-priority="high">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>

      <ClientOnly>
        <AppGlobalScope />
      </ClientOnly>
    </a-style-provider>
  </div>
</template>

<script setup lang="ts">
import AppGlobalScope from '~/components/common/global/AppGlobalScope.vue'
</script>
