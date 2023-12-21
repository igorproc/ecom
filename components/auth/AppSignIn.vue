<template>
  <form class="app-sign-in-form" @submit.prevent="submit">
    <vs-input
      v-model="loginData.email.value"
      label="email"
      class="app-sign-in-form__field"
      @change="emailInput"
    >
      <template v-if="loginData.email.errors.length" #message-danger>
        {{ loginData.email.errors.join(', ') }}
      </template>
    </vs-input>
    <vs-input
      v-model="loginData.password.value"
      type="password"
      label="password"
      class="app-sign-in-form__field"
      @change="passwordInput"
    >
      <template v-if="loginData.password.errors.length" #message-danger>
        {{ loginData.password.errors.join(', ') }}
      </template>
    </vs-input>
    <div class="app-sign-in-form__actions actions">
      <VsButton
        :loading="isLoading"
        type="submit"
        :class="{ '--disabled': isDisabled }"
        class="actions__submit-action"
      >
        Войти
      </VsButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { VsInput, VsButton } from 'vuesax-alpha'

import { object, string } from 'yup'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { loginUser } from '~/store/user/auth'

useForm({
  validationSchema: toTypedSchema(
    object({
      email: string().email().required(),
      password: string().required(),
    }),
  ),
})

const isLoading = ref(false)
const isDisabled = ref(false)
const loginData = reactive({
  email: useField('email'),
  password: useField('password'),
})

const emailInput = () => {
  isDisabled.value = !!loginData.email.errors.length
}
const passwordInput = () => {
  isDisabled.value = !!loginData.password.errors.length
}
const submit = async () => {
  try {
    if (isDisabled.value) {
      return
    }

    isLoading.value = true

    const userData = await loginUser({
      email: loginData.email.value as string,
      password: loginData.password.value as string,
    })
    if (!userData) {
      isLoading.value = false
      isDisabled.value = true
      return
    }

    isLoading.value = false
  } catch (error) {
    throw error
  }
}
</script>

<style lang="scss">
.app-sign-in-form {
  padding: 0.5rem 1rem;

  & .vs-input {
    margin-top: 1.75rem !important;

    .app-sign-in-form__field {
      width: 100%;
    }

    &:first-child {
      margin-top: 1.5rem !important;
    }
  }

  & &__actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .actions__submit-action {
      &.--disabled {
        cursor: unset;
        opacity: 0.6;
      }
    }
  }
}
</style>
