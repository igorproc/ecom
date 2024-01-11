<template>
  <a-form
    :model="loginData"
    autocomplete
    class="app-sign-in-form"
    @finish="submit"
  >
    <a-form-item class="app-sign-in-form__actions actions">
      <a-input
        v-model:value="loginData.email.value"
        :placeholder="loginData.email.errors.join()"
        label="email"
        class="app-sign-in-form__field"
        @change="emailInput"
      />
    </a-form-item>

    <a-form-item class="app-sign-in-form__actions actions">
      <a-input
        v-model:value="loginData.password.value"
        :placeholder="loginData.password.errors.join(', ')"
        type="password"
        label="password"
        class="app-sign-in-form__field"
        @change="passwordInput"
      />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button
        :disabled="isDisabled"
        type="primary"
        html-type="submit"
        class="actions__submit-action"
      >
        Войти
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
// Node Deps
import { object, string } from 'yup'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
// Pinia Stores
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
