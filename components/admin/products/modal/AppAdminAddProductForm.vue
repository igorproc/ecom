<template>
  <form class="app-admin-add-product-form" @click.prevent="submit">
    <vs-row>
      <vs-col :sm="12" :md="6" :lg="4">
        <vs-input
          v-model="addProductValues.name.value"
          label="Название"
          type="input"
          placeholder="e.g Kit Cat"
          class="app-admin-add-product-form__input"
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
        <AppDropzone />
      </vs-col>
    </vs-row>
    <div class="app-admin-add-product-form__actions">
      <vs-button type="submit">
        Добавить Продукт
      </vs-button>
    </div>
  </form>
</template>

<script setup lang="ts">
import {
  VsRow,
  VsCol,
  VsInput,
  VsSelect,
  VsOption,
  VsButton
} from 'vuesax-alpha'

import { consola } from 'consola'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { object, string, number } from 'yup'

import { productApi } from '~/api/product'
import AppDropzone from '~/components/common/input/AppDropzone.vue'

const productTypes: { label: string, value: string }[] = [
  {
    label: 'Стандартный',
    value: 'BASE'
  },
  {
    label: 'Конфигурируемый',
    value: 'CONFIGURABLE'
  }
]

useForm({
  validationSchema: toTypedSchema(
    object({
      name: string().required(),
      price: number().required(),
      type: string().required()
    })
  )
})

const addProductValues = reactive({
  name: useField('name'),
  price: useField('price'),
  type: useField('type'),
  imageUrl: 'qwe',
})

const submit = async () => {
  try {
    const productIsCreated = await productApi.addProduct({
      name: addProductValues.name.value,
      price: addProductValues.price.value,
      type: addProductValues.type.value,
      imageUrl: addProductValues.imageUrl
    })
    if (!productIsCreated) {
      return
    }
    consola.info(productIsCreated)
  } catch (error) {
    throw new Error(error)
  }
  consola.info('add product')
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
