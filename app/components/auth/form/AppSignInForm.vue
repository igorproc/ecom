<template>
  <a-form
    key="user-auth-form"
    :model="loginData"
    autocomplete
    class="app-sign-in-form"
    @finish="submit"
  >
    <a-form-item
      name="auth-email"
      class="app-sign-in-form__field-container form-field-container"
    >
      <a-input
        v-model:value="loginData.email.value"
        :placeholder="loginData.email.errors.join() || 'email'"
        :status="loginData.email.errors.length ? 'error' : ''"
        type="email"
        label="email"
        @change="changeField"
      />
    </a-form-item>

    <a-form-item
      name="auth-password"
      class="app-sign-in-form__field-container form-field-container"
    >
      <a-input
        v-model:value="loginData.password.value"
        :placeholder="loginData.password.errors.join(', ') || 'password'"
        :status="loginData.password.errors.length ? 'error' : ''"
        type="password"
        label="password"
        @change="changeField"
      />
    </a-form-item>

    <a-form-item
      name="auth-submit"
      class="app-sign-in-form__actions-container form-actions-container"
    >
      <a-button
        type="link"
        :disabled="isLoading"
        @click="emit('changeForm')"
      >
        Зарегестрироваться
      </a-button>

      <a-button
        :disabled="isDisabled"
        type="primary"
        html-type="submit"
        class="form-actions-container__submit"
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

interface Emits {
  (name: 'changeForm'): void,
  (name: 'formCompete'): void,
}

const emit = defineEmits<Emits>()
const validationSchema = useForm({
  validationSchema: toTypedSchema(
    object({
      email: string().email().required(),
      password: string().required(),
    }),
  ),
})

const isLoading = ref(false)
const isDisabled = ref(true)
const loginData = reactive({
  email: useField('email'),
  password: useField('password'),
})

const resetForm = () => {
  validationSchema.resetForm()
  isDisabled.value = true
  isLoading.value = false
}
const changeField = () => {
  isDisabled.value = !!Object.values(validationSchema.errors.value).length
}
const submit = async () => {
  try {
    if (isDisabled.value) {
      return
    }
    isLoading.value = true

    const userIsAuth = await loginUser({
      email: loginData.email.value as string,
      password: loginData.password.value as string,
    })
    if (!userIsAuth) {
      resetForm()
      return
    }

    resetForm()
    emit('formCompete')
  } catch (error) {
    throw error
  }
}
</script>

<style lang="scss">
.app-sign-in-form {
  padding: 0.75rem 1rem;

  & &__actions-container {

    .ant-row {
      width: 100%;
      .ant-form-item-control-input-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
</style>
