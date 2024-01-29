<template>
  <a-modal
    open
    :footer="null"
    @close="emit('modalIsClose')"
  >
    <div class="app-admin-edit-product-add-option-item-modal add-option-item-modal">
      <a-input-group size="large" class="add-option-item-modal__fields">
        <a-row :gutter="8">
          <a-col :sm="24" :md="12">
            <a-input
              v-model:value="addNewItemData.label.value"
              :status="addNewItemData.label.errors.length ? 'error' : ''"
              :placeholder="addNewItemData.label.errors[0] || 'label'"
              @change="filedInput"
            />
          </a-col>

          <a-col :sm="24" :md="12">
            <a-input
              v-model:value="addNewItemData.value.value"
              :status="addNewItemData.value.errors.length ? 'error' : ''"
              :placeholder="addNewItemData.value.errors[0] || 'value'"
              @change="filedInput"
            />
          </a-col>
        </a-row>
      </a-input-group>

      <div class="add-option-item-modal__actions">
        <a-button
          :disabled="addNewItemSubmitIsDisabled"
          @click="submitAddNewOptionToGroup"
        >
          Submit
        </a-button>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
// Node Deps
import { object, string } from 'yup'
// Pinia Stores
import { useAdminStore } from '~/store/user/admin'
// Api Methods
import { addItemToOptionGroup } from '~/api/product/configurable/addItemToOptionGroup'

interface Props {
  addedItemGroupId: number
}

interface Emits {
  (name: 'modalIsClose'): () => void,
  (name: 'formIsSubmit'): () => void,
}

const emit = defineEmits<Emits>()
const props = defineProps<Props>()
const { addedItemGroupId } = toRefs(props)
const adminStore = useAdminStore()

const validationSchema = useForm({
  validationSchema: toTypedSchema(
    object({
      label: string().required(),
      value: string().required(),
    }),
  ),
})

const addNewItemSubmitIsDisabled = ref(true)
const addNewItemData = reactive({
  label: useField('label'),
  value: useField('value'),
})
const filedInput = () => {
  if (Object.values(validationSchema.errorBag.value).length) {
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

    const optionItemData = await addItemToOptionGroup(
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
    validationSchema.resetForm()
    emit('formIsSubmit')
  } catch (error) {
    throw error
  }
}
</script>

<style lang="scss">
.app-admin-edit-product-add-option-item-modal {
  padding: 1.5rem 0;

  .ant-row {
    width: 100%;
  }

  .add-option-item-modal__actions {
    padding: 0 0.5rem;
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
