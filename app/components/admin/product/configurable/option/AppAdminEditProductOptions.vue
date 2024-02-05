<template>
  <div class="app-admin-edit-product-options-list product-option-list">

    <a-tabs size="large" class="product-option-list__tabs">
      <template #rightExtra>
        <a-button
          @click="addNewOptionGroupIsOpen = true"
        >
          Add new group
        </a-button>
      </template>

      <a-tab-pane
        v-for="productOption in productOptions"
        :key="productOption.optionId"
        :tab="productOption.optionLabel as any"
      >
        <AppAdminEditProductOptionItem
          :group-values="productOption"
          @add-option-item="addNewOptionToGroup"
        />
      </a-tab-pane>
    </a-tabs>

    <AppAdminEditProductAddOptionItemModal
      v-if="addNewItemDialogIsOpen && addedItemGroupId"
      :added-item-group-id="addedItemGroupId"
      @modal-is-close="addNewItemDialogIsOpen = false"
      @form-is-submit="isSuccessFormSubmit"
    />
  </div>
</template>

<script setup lang="ts">
// Components
import AppAdminEditProductOptionItem from '~/components/admin/product/configurable/option/AppAdminEditProductOptionItem.vue'
import AppAdminEditProductAddOptionItemModal
  from '~/components/admin/product/configurable/option/modal/AppAdminEditProductAddOptionItemModal.vue'
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'

interface Props {
  productId: TProduct['pid']
  productOptions: TProduct['productOptions'] | null
}

const props = defineProps<Props>()
const { productId, productOptions } = toRefs(props)

const addNewOptionGroupIsOpen = ref(false)

const addNewItemDialogIsOpen = ref(false)
const addedItemGroupId = ref<number | null>(null)

const addNewOptionToGroup = (groupId: number) => {
  addNewItemDialogIsOpen.value = true
  addedItemGroupId.value = groupId
}
const isSuccessFormSubmit = () => {
  addNewItemDialogIsOpen.value = false
  addedItemGroupId.value = null
}
</script>
