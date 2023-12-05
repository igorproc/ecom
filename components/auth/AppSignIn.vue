<template>
  <v-form class="app-sign-in-form" @submit.prevent="submit">
    <v-text-field
      v-model="loginData.email.value"
      :error-messages="loginData.email.errors"
      label="email"
    ></v-text-field>
    <v-text-field
      v-model="loginData.password.value"
      :error-messages="loginData.password.errors"
      type="password"
      label="password"
      class="mt-2"
    ></v-text-field>
    <div class="d-flex align-center justify-end">
      <v-btn type="submit">
        Войти
      </v-btn>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import { loginUser } from '~/store/user/auth'
import { object, string } from 'yup'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'

useForm({
 validationSchema: toTypedSchema(
   object({
     email: string().email().required(),
     password: string().required()
   })
 )
})

const isLoading = ref(false)
const loginData = reactive({
  email: useField('email'),
  password: useField('password')
})

const submit = async () => {
  try {
    if (
      loginData.email.errors.length ||
      loginData.password.errors.length
    ) {
      return
    }

    isLoading.value = true

    const userData = await loginUser({
      email: loginData.email.value as string,
      password: loginData.password.value as string
    })
    if (!userData) {
      isLoading.value = false
      return
    }

    isLoading.value = false
  } catch (error) {
    throw new Error(error)
  }
}
</script>
