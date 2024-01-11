<template>
  <div class="app-admin-edit-product-options-list product-option-list">
    <h2 class="product-option-list__title">
      Options List
    </h2>

    <div class="product-option-list__tabs">
      <UiTabs class=" option-list-tabs">
        <template #header-append>
          <div class="option-list-tabs__add-new-group add-new-group">
            <vs-button
              v-if="!addNewOptionGroupIsOpen"
              type="border"
              @click="addNewOptionGroupIsOpen = true"
            >
              Add new group
            </vs-button>
            <div v-else class="add-new-group__field-container">
              <vs-input
                v-model="addNewOptionGroupData"
                placeholder="label"
              />
              <vs-button type="transparent" @click="addNewOptionGroup">
                <PlusOutlined />
              </vs-button>
            </div>
          </div>
        </template>
        <UiTab
          v-for="groupItem in productOptions"
          :key="groupItem.optionId"
          :title="groupItem.optionLabel"
          class="option-list-tabs__item tabs-item"
        >
          <AppAdminEditProductOptionItem
            :group-values="groupItem"
            @add-option-item="addNewOptionToGroup"
          />
        </UiTab>
      </UiTabs>
    </div>
    <AppAdminEditProductAddOptionItemModal
      v-if="addNewItemDialogIsOpen && addedItemGroupId"
      :added-item-group-id="addedItemGroupId"
      @modal-is-close="addNewItemDialogIsOpen = false"
      @form-is-submit="isSuccessFormSubmit"
    />
  </div>
</template>

<script setup lang="ts">
// Ui components
import UiTabs from '~/components/common/ui/UiTabs.vue'
import UiTab from '~/components/common/ui/tabs/UiTab.vue'
// Components
import AppAdminEditProductOptionItem from '~/components/admin/product/configurable/option/AppAdminEditProductOptionItem.vue'
import AppAdminEditProductAddOptionItemModal
  from '~/components/admin/product/configurable/option/modal/AppAdminEditProductAddOptionItemModal.vue'
// Api Methods
import { productApi } from '~/api/product'
// Pinia Stores
import { useAdminStore } from '~/store/user/admin'
// Types & Interfaces
import type { TProduct } from '~/types/api'

interface Props {
  productId: TProduct['pid']
  productOptions: TProduct['productOptions'] | null
}

const adminStore = useAdminStore()
const props = defineProps<Props>()
const { productId, productOptions } = toRefs(props)

const addNewOptionGroupIsOpen = ref(false)
const addNewOptionGroupData = ref('')
const addNewItemDialogIsOpen = ref(false)
const addedItemGroupId = ref<number | null>(null)

const addNewOptionGroup = async () => {
  if (!addNewOptionGroupData.value.length) {
    return
  }

  if (productOptions.value) {
    const matchCandidate = productOptions.value
      .find(item => item.optionLabel.toLowerCase() === addNewOptionGroupData.value.toLowerCase())

    if (matchCandidate) {
      return
    }
  }

  const groupIsAdded = await productApi.addToConfigurableProductOptionGroup(
    productId.value,
    addNewOptionGroupData.value,
  )
  if (!groupIsAdded) {
    return
  }

  adminStore.addOptionGroup(groupIsAdded)
  addNewOptionGroupIsOpen.value = false
  addNewOptionGroupData.value = ''
}
const addNewOptionToGroup = (groupId: number) => {
  addNewItemDialogIsOpen.value = true
  addedItemGroupId.value = groupId
}
const isSuccessFormSubmit = () => {
  addNewItemDialogIsOpen.value = false
  addedItemGroupId.value = null
}
</script>

<style lang="scss">
.app-admin-edit-product-options-list {
  .product-option-list__tabs .option-list-tabs__add-new-group {
    .add-new-group__field-container {
      display: flex;
      align-items: center;
      gap: 0.25rem
    }
  }

  .product-option-list {
    &__title {
      text-align: center;
      font-size: 1.3rem;
      font-weight: bold;
    }
  }
}
</style>
