<template>
  <a-button
    :disabled="isDisabled"
    :style="{ '--select-color': buttonColor }"
    :class="{ '--is-active': isActive }"
    class="app-configurable-product-default-switch app-default-switch"
    @click="selectOption"
  >
    <span class="app-default-switch__label">
      {{ optionData.label }}
    </span>
  </a-button>
</template>

<script setup lang="ts">
// Types & Interfaces
import type { TConfigurableProductOptions } from '~/api/product/configurable/shred.types'
interface Props {
  optionLabel: TConfigurableProductOptions['optionLabel'],
  optionData: TConfigurableProductOptions['values'][0],
  isActive: boolean,
  isDisabled?: boolean,
}

interface Emits {
  (name: 'optionSelected', optionData: Props['optionData']): () => void,
}

const emits = defineEmits<Emits>()
const props = defineProps<Props>()
const { isDisabled, optionLabel, optionData } = toRefs(props)

const buttonColor = computed(() => {
  if (optionLabel.value.toLowerCase() === 'color') {
    return optionData.value.value
  }
  return '#000'
})

const selectOption = () => {
  if (isDisabled.value) {
    return
  }

  emits('optionSelected', optionData.value)
}
</script>

<style lang="scss">
.app-configurable-product-default-switch {
  transition: background-color 0.3s ease 0s, color 0.3s ease 0s;

  .app-default-switch__label {
    color: var(--select-color);
  }

  &.--is-active {
    background-color: var(--select-color);

    .app-default-switch__label {
      color: #fff;
    }
  }
}
</style>
