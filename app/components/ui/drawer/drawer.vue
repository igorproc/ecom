<template>
  <div
    :class="{
      '--is-open': drawerIsOpen,
    }"
    :style="{
      '--animation-speed': animationSpeed,
      '--provided-color': backgroundColor,
    }"
    class="ui-drawer"
  >
    <div class="drawer__overlay" />
    <div
      ref="target"
      class="drawer__content"
      :style="{ maxWidth }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
// Node Deps
import { onClickOutside } from '@vueuse/core'

interface Emits {
  (name: 'update:open', optionGroupId: boolean): void
}

interface Props {
  open?: boolean,
  maxWidth?: string,
  animationSpeed?: number,
  backgroundColor?: string,
}

const props = withDefaults(
  defineProps<Props>(),
  {
    isOpen: false,
    maxWidth: '300rem',
    animationSpeed: 300,
  },
)
const emit = defineEmits<Emits>()

const target = ref(null)
const isTransitioning = ref(false)

const drawerIsOpen = computed(() => props.open)

useClientOnly(() => {
  onClickOutside(target, () => emit('update:open', false))
})
</script>

<style lang="scss" scoped>
.ui-drawer {
  animation-name: slideOutToLeft;

  &__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 200;
    opacity: 0;
    transition-property: opacity;
    background-color: #000000;
    user-select: none;
  }

  &__content {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;

    height: 100%;
    width: 100%;
    z-index: 100;
    overflow: auto;

    background-color: map-get($theme-colors, 'surface-color'); /** Backfall */
    background-color: var(--provided-color);

    animation-name: slideInFromRight;
    animation-fill-mode: both;
    animation-duration: var(--animation-speed);

    display: flex;
    flex-direction: column;
    transform: translateX(100%);
  }

  &.--is-open {
    visibility: visible;

    .drawer__overlay {
      animation-duration: var(--animation-speed);
      opacity: 0.5;
    }

    .drawer__content {
      transform: translateX(0);
    }
  }
}
</style>
