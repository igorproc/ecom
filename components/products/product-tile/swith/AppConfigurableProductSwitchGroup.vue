<template>
  <div class="app-configurable-product-switch-group-list product-switch-group-list">
    <vs-button-group
      v-for="optionGroup in productOptions"
      :key="optionGroup.optionId"
      class="product-switch-group-list__group"
    >
      <AppConfigurableProductDefaultSwitch
        v-for="optionItem in optionGroup.values"
        :key="optionItem.value"
        :option-label="optionGroup.optionLabel"
        :option-data="optionItem"
        :is-active-item="isActiveOption(optionItem.optionId)"
        :is-disabled="isDisabledOption(optionItem.optionId)"
        @option-selected="selectOption"
      />
    </vs-button-group>
    {{ viableVariantsAndOptionsIdsListBySelected }}
  </div>
</template>

<script setup lang="ts">
// Ui Components
import { VsButtonGroup } from 'vuesax-alpha'
// Components
import AppConfigurableProductDefaultSwitch from
    '~/components/products/product-tile/swith/switches/Select.vue'
// Types & Interfaces
import { TConfigurableProductOptions } from '~/types/api'
import { TConfigurableProductVariants } from '~/server/db/types/product'

interface Props {
  productOptions: TConfigurableProductOptions[],
  productVariants: TConfigurableProductVariants[]
}

const props = defineProps<Props>()
const { productOptions, productVariants } = toRefs(props)

const selectedOptionIds = ref<number[]>([])

const allViableOptionsFromVariants = computed(() => {
  const idsList: Record<string, number[]> = {}

  productVariants.value.forEach(productVariant => {
    productVariant.attributes.forEach(variantItem => {
      const productOptionGroupCandidate = productOptions.value
        .find(optionItem => optionItem.optionLabel === variantItem.code)
      if (!productOptionGroupCandidate) {
        return
      }

      const productOptionCandidate = productOptionGroupCandidate
        .values.find(optionItem => optionItem.optionId === variantItem.valueId)
      if (!productOptionCandidate) {
        return
      }
      if (!idsList[productVariant.product.id]) {
        idsList[productVariant.product.id] = [productOptionCandidate.optionId]
        return
      }

      idsList[productVariant.product.id] = [
        ...Object.values(idsList[productVariant.product.id]),
        productOptionCandidate.optionId,
      ]
    })
  })

  return idsList
})
const viableVariantsAndOptionsIdsListBySelected = computed(() => {
  if (
    !allViableOptionsFromVariants.value ||
    !Object.values(allViableOptionsFromVariants.value).length
  ) {
    return {
      variants: [],
      optionIds: [],
    }
  }

  const variantsList: string[] = []
  const idsList: number[] = []

  if (!selectedOptionIds.value.length) {
    for (const [key, value] of Object.entries(allViableOptionsFromVariants.value)) {
      variantsList.push(key)
      idsList.push(...value)
    }
    return {
      variants: [...new Set(variantsList)],
      optionIds: [... new Set(idsList)],
    }
  }

  selectedOptionIds.value.forEach(selectedOptionId => {
    for (const [key, value] of Object.entries(allViableOptionsFromVariants.value)) {
      if (value.includes(selectedOptionId)) {
        variantsList.push(key)
        idsList.push(...value)
        return
      }
    }
  })

  return {
    variants: [...new Set(variantsList)],
    optionIds: [... new Set(idsList)],
  }
})

const isActiveOption = (optionId: number) => {
  return selectedOptionIds.value.includes(optionId)
}
const isDisabledOption = (optionId: number) => {
  return !viableVariantsAndOptionsIdsListBySelected.value.optionIds
    .includes(optionId)
}
const selectOption = (optionData: TConfigurableProductOptions['values'][0]) => {
  if (!selectedOptionIds.value.includes(optionData.optionId)) {
    selectedOptionIds.value.push(optionData.optionId)
    return
  }
  selectedOptionIds.value = selectedOptionIds.value.filter(id => id !== optionData.optionId)
}
</script>

<style lang="scss">
.app-configurable-product-switch-group-list {
  margin-top: 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  .product-switch-group-list__group {
    justify-content: flex-start;
  }
}
</style>
