<template>
  <vs-dialog
    v-model="modalIsOpen"
    @close="emits('modalIsClose')"
  >
    <div class="app-admin-edit-product-add-option-item-modal add-option-item-modal">
      <div class="add-option-item-modal__fields">
        <vs-input
          v-model="addNewItemData.label.value"
          label="label"
          placeholder="e.g Yellow"
          @change="filedInput"
        >
          <template v-if="addNewItemData.label.errors.length" #message-danger>
            {{ addNewItemData.label.errors.join(', ') }}
          </template>
        </vs-input>
        <vs-input
          v-model="addNewItemData.value.value"
          label="value"
          placeholder="e.g #fff | 102"
          @change="filedInput"
        >
          <template v-if="addNewItemData.value.errors.length" #message-danger>
            {{ addNewItemData.value.errors.join(', ') }}
          </template>
        </vs-input>
      </div>
      <div class="add-option-item-modal__actions">
        <vs-button
          :loading="addNewItemSubmitIsDisabled"
          @click="submitAddNewOptionToGroup"
        >
          Submit
        </vs-button>
      </div>
    </div>
  </vs-dialog>
</template>

<script setup lang="ts">
// Node Deps
import { object, string } from 'yup'
// Pinia Stores
import { useAdminStore } from '~/store/user/admin'
// Api Methods
import { productApi } from '~/api/product'

interface Props {
  addedItemGroupId: number
}

interface Emits {
  (name: 'modalIsClose'): () => void,

  (name: 'formIsSubmit'): () => void,
}

const emits = defineEmits<Emits>()
const props = defineProps<Props>()
const { addedItemGroupId } = toRefs(props)
const adminStore = useAdminStore()
const addItemValidationForm = useForm({
  validationSchema: toTypedSchema(
    object({
      label: string().required(),
      value: string().required(),
    }),
  ),
})

const modalIsOpen = ref(true)
const addNewItemSubmitIsDisabled = ref(true)
const addNewItemData = reactive({
  label: useField('label'),
  value: useField('value'),
})
const filedInput = () => {
  if (Object.values(addItemValidationForm.errorBag.value).length) {
    addNewItemSubmitIsDisabled.value = true
    return
  }
  addNewItemSubmitIsDisabled.value = false
}
const submitAddNewOptionToGroup = async () => {
  try {
    if (addNewItemSubmitIsDisabled.value || !addedItemGroupId.value) {
      return
    }

    addNewItemSubmitIsDisabled.value = true
    const optionItemData = await productApi.addToConfigurableProductOptionItem(
      addedItemGroupId.value,
      {
        label: addNewItemData.label.value as string,
        value: addNewItemData.value.value as string,
      },
    )

    if (!optionItemData) {
      return
    }

    adminStore.addOptionToGroupByGroupId(optionItemData)
    addItemValidationForm.resetForm()
    emits('formIsSubmit')
  } catch (error) {
    throw error
  }
}
</script>

<style lang="scss">
.app-admin-edit-product-add-option-item-modal {
  .add-option-item-modal__fields {
    display: flex;
    align-items: center;

    .vs-input:last-child {
      margin-left: 0.5rem;
    }
  }

  .add-option-item-modal__actions {
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
