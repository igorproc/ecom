<template>
  <div class="app-admin-add-product-form">
    <vs-row>
      <vs-col :sm="12" :md="6" :lg="4">
        <vs-input
          v-model="addProductValues.name.value"
          label="Название"
          type="input"
          placeholder="e.g Kit Cat"
          class="app-admin-add-product-form__input"
          @change="filedInput"
        >
          <template v-if="addProductValues.name.errors.length" #message-danger>
            {{ addProductValues.name.errors.join(', ') }}
          </template>
        </vs-input>
      </vs-col>
      <vs-col :sm="12" :md="6" :lg="4">
        <vs-input
          v-model="addProductValues.price.value"
          label="Цена (в USD)"
          type="number"
          placeholder="e.g 14"
          class="app-admin-add-product-form__input"
          @change="filedInput"
        >
          <template v-if="addProductValues.price.errors.length" #message-danger>
            {{ addProductValues.price.errors.join(', ') }}
          </template>
        </vs-input>
      </vs-col>
      <vs-col :sm="12" :md="6" :lg="4">
        <vs-select
          v-model="addProductValues.type.value"
          label="Тип товара"
          class="app-admin-add-product-form__input"
          @update:model-value="filedInput"
        >
          <template v-if="addProductValues.type.errors.length" #message-danger>
            {{ addProductValues.type.errors.join(', ') }}
          </template>
          <vs-option
            v-for="item in productTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </vs-select>
      </vs-col>
      <vs-col :sm="12" :md="6" :lg="4">
        <ClientOnly>
          <AppDropzone @upload-file="addProductImage" />
        </ClientOnly>
      </vs-col>
    </vs-row>
    <div class="app-admin-add-product-form__actions">
      <vs-button :disabled="isDisabled" @click.stop="submit">
        Добавить Продукт
      </vs-button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Ui Components
import {
  VsRow,
  VsCol,
  VsInput,
  VsSelect,
  VsOption,
  VsButton,
} from 'vuesax-alpha'
// Node Deps
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { object, string, number } from 'yup'
// Pinia Stores
import { useProductStore } from '~/store/product'
import { useConditionStore } from '~/store/condition'
// Api Methods
import { productApi } from '~/api/product'
// Types & Interfaces
import { EAddProductTypes } from '~/types/api'
// Components
import AppDropzone from '~/components/common/input/AppDropzone.vue'

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

    const productIsCreated = await productApi.addProduct({
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
  & &__input,
  .vs-select {
    min-width: calc(100% - 0.25rem);
  }

  .app-dropzone-input {
    min-width: calc(100% - 0.25rem);
    margin-top: 1.25rem;
  }

  & &__actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
