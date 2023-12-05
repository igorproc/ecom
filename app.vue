<template>
	<div>
		<NuxtLayout>
      <ClientOnly>
        <AppGlobalScope />
      </ClientOnly>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<script setup lang="ts">
import AppGlobalScope from '~/components/common/AppGlobalScope.vue'
</script>
