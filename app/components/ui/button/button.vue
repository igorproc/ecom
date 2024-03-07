<template>
  <component
    :is="link ? nuxtLinkComponent : 'button'"
    :to="link"
    :style="{
      '--ui-button-background-color': backgroundColor
    }"
    :class="{
      '--is-outlined': variant === 'outlined',
      '--is-text': variant === 'text',
      '--custom-background': backgroundColor
    }"
    class="ui-button"
  >
    <div class="ui-button__prepend button-prepend">
      <UiIcon v-if="prependIcon" :name="prependIcon" />
      <slot name="prepend" />
    </div>

    <div class="ui-button__content button-content">
      <span class="button-content__label">
        {{ label }}
      </span>
    </div>
  </component>
</template>

<script setup lang="ts">
// Types & Interfaces
import type { TUiIconNames } from '#build/types/ui-icon'
import type { NuxtLinkProps } from '#app/components/nuxt-link'

type ButtonType = 'text' | 'outlined'

interface Props {
  label: string,
  variant?: ButtonType,
  link?: NuxtLinkProps | string,
  backgroundColor?: string,
  prependIcon?: TUiIconNames,
}

const nuxtLinkComponent = defineAsyncComponent(() => import('#app/components/nuxt-link'))
const props = defineProps<Props>()

const { variant } = toRefs(props)
</script>

<style lang="scss" scoped>
.ui-button {
  padding: 8rem 12rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: map-get($theme-colors, 'accent-color') 1rem solid;
  background-color: map-get($theme-colors, 'accent-color');
  text-decoration: unset;

  .ui-button__content {
    margin: 0 8rem;

    .button-content__label {
      color: map-get($theme-colors, 'primary-color');
      font-size: 16rem;
      font-weight: bold;
    }
  }

  &.--custom-background {
    background-color: var(--ui-button-background-color);
    border: 1px solid var(--ui-button-background-color);
  }

  &.--is-outlined {
    background-color: transparent;
  }

  &.--is-text {
    background-color: transparent;
    border: unset;
  }

  @media #{map-get($display-rules, 'xl')} {
    padding: 12rem 32rem;
  }
}
</style>
