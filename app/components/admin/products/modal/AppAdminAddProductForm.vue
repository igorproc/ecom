<template>
  <a-form
    layout="inline"
    name="admin-add-product"
    class="app-admin-add-product-form"
  >
    <a-form-item>
      <a-input
        v-model:value="addProductValues.name.value"
        type="input"
        label="Название"
        placeholder="e.g Kit Cat"
        class="app-admin-add-product-form__input"
        @change="filedInput"
      />
    </a-form-item>
    <a-form-item>
      <a-input
        v-model:value="addProductValues.price.value"
        label="Цена (в USD)"
        type="number"
        placeholder="e.g 14"
        class="app-admin-add-product-form__input"
        @change="filedInput"
      />
    </a-form-item>
    <a-form-item>
      <a-select
        v-model:value="addProductValues.type.value"
        label="Тип товара"
        class="app-admin-add-product-form__input"
        @update:model-value="filedInput"
      >
        <a-select-option
          v-for="item in productTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </a-select>
    </a-form-item>
    <a-form-item>
      <a-upload />
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
// Node Deps
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { object, string, number } from 'yup'
// Pinia Stores
import { useProductStore } from '~/store/product'
import { useConditionStore } from '~/store/condition'
// Api Methods
import { addProduct } from '~/api/product/addProduct'
// Types & Interfaces
import { EAddProductTypes } from '~/api/product/shared.types'

const productTypes: { label: string, value: string }[] = [
  {
    label: 'Стандартный',
    value: 'base',
  },
  {
    label: 'Конфигурируемый',
    value: 'configurable',
  },
]

const conditionStore = useConditionStore()
const productStore = useProductStore()
const validationForm = useForm({
  validationSchema: toTypedSchema(
    object({
      name: string().required(),
      price: number().required(),
      type: string().required(),
    }),
  ),
})

const isDisabled = ref(true)
const addProductValues = reactive({
  name: useField('name'),
  price: useField('price'),
  type: useField('type'),
  productImage: '',
})

const filedInput = () => {
  if (Object.values(validationForm.errorBag.value).length) {
    isDisabled.value = true
    return
  }
  isDisabled.value = false
}
const addProductImage = (imageUrl: string) => {
  addProductValues.productImage = imageUrl
  filedInput()
}
const submit = async () => {
  try {
    if (isDisabled.value) {
      return
    }
    isDisabled.value = true

    const productIsCreated = await addProduct({
      name: addProductValues.name.value as string,
      price: addProductValues.price.value as number,
      type: addProductValues.type.value as keyof typeof EAddProductTypes,
      productImage: addProductValues.productImage as string,
    })
    if (!productIsCreated) {
      return
    }

    validationForm.resetForm()
    productStore.addToProductList(productIsCreated)
    conditionStore.closeAdminAddProductModal()
    isDisabled.value = false
  } catch (error) {
    throw error
  }
}
</script>

<style lang="scss">
.app-admin-add-product-form {
  padding: 0.75rem;
}
</style>
