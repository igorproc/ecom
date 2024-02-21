<template>
  <div class="ui-image">
    <Suspense>
      <template #default>
        <LazyImage
          :src="src"
          :alt="alt || ''"
        />
      </template>
      <template #fallback>
        <ui-skeleton-image />
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
// Components
import LazyImage from '~/components/ui/image/lazyImage.vue'

interface Props {
  src: string,
  alt?: string,
}

const props = defineProps<Props>()
</script>
