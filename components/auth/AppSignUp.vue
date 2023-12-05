<template>
  <v-form class="app-sign-in-form" @submit.prevent="submit">
    <v-text-field
      v-model="registerData.email.value"
      :error-messages="registerData.email.errors"
      label="email"
    />
    <v-text-field
      v-model="registerData.password.value"
      :error-messages="registerData.password.errors"
      type="password"
      label="password"
      class="mt-2"
    />
    <v-text-field
      v-model="registerData.birthday.value"
      :error-messages="registerData.birthday.errors"
      type="date"
      label="Birth day"
    />
    <v-select
      v-model="registerData.role.value"
      :items="availableRoles"
      :error-messages="registerData.role.errors"
      label="Current role"
      item-title="label"
      item-value="value"
    />
    <div class="d-flex align-center justify-end">
      <v-btn
        :disabled="isLoading"
        :loading="isLoading"
        type="submit"
      >
        Зарегестрироваться
      </v-btn>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { object, string } from 'yup'
import { createUser } from "~/store/user/auth";

const availableRoles = [
  { label: 'admin', value: 'admin' },
  { label: 'user', value: 'user' }
]

useForm({
  validationSchema: toTypedSchema(
    object({
      email: string().email().required(),
      password: string().required(),
      birthday: string().required(),
      role: string()
    })
  )
})

const isLoading = ref(false)
const formDateIsOpen = ref(false)
const registerData = reactive({
  email: useField('email'),
  password: useField('password'),
  birthday: useField('birthday'),
  role: useField('role')
})

const submit = async () => {
  try {
    if (
      registerData.email.errors.length ||
      registerData.password.errors.length ||
      registerData.birthday.errors.length ||
      registerData.role.errors.length
    ) {
      return
    }
    isLoading.value = true

    const userIsCreated = await createUser({
      email: registerData.email.value as string,
      password: registerData.password.value as string,
      birthday: registerData.birthday.value as string,
      role: registerData.role.value as string
    })

    if (!userIsCreated) {
      isLoading.value = false
      return
    }
    isLoading.value = false
  } catch (error) {
    throw new Error(error)
  }
}
</script>
