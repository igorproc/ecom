<template>
  <vs-button
    size="small"
    :color="buttonColor"
    :active="isActiveItem"
    class="app-configurable-product-default-switch app-default-switch"
    :class="{ '--disabled': isDisabled }"
    @click="selectOption"
  >
    {{ optionData.label }}
  </vs-button>
</template>

<script setup lang="ts">
// Ui Components
import {
  Color,
  VsButton,
} from 'vuesax-alpha'
// Types & Interfaces
import { TConfigurableProductOptions } from '~/types/api'

interface Props {
  optionLabel: TConfigurableProductOptions['optionLabel'],
  optionData: TConfigurableProductOptions['values'][0],
  isActiveItem: boolean,
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
    return optionData.value.value as Color
  }
  return 'primary'
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
  color: #000;

  &.--disabled {
    cursor: auto;
    opacity: 0.6;
  }
}
</style>
