<template>
  <a-form
    :model="registerData"
    autocomplete
    class="app-sign-up-form"
    @finish="submit"
  >
    <a-form-item class="app-sign-up-form__field">
      <a-input
        v-model:value="registerData.email.value"
        :label="registerData.email.errors.join()"
        label="email"
        @change="inputField"
      />
    </a-form-item>
    <a-form-item class="app-sign-up-form__field">
      <a-input
        v-model:value="registerData.password.value"
        :label="registerData.password.errors.join()"
        type="password"
        @change="inputField"
      />
    </a-form-item>
    <a-form-item class="app-sign-up-form__field">
      <a-input
        v-model="registerData.birthday.value"
        :label="registerData.birthday.errors.join()"
        type="date"
        class="app-sign-up-form__field"
        @change="inputField"
      />
    </a-form-item>
    <a-form-item>
      <a-select
        v-model:value="registerData.role.value"
        :label="registerData.role.errors.join()"
        :items="availableRoles"
      >
        <a-select-option
          v-for="option in availableRoles"
          :key="option.label"
          :label="option.label"
          :value="option.value"
        />
      </a-select>
    </a-form-item>
    <a-form-item class="app-sign-up-form__actions actions">
      <a-button
        type="primary"
        html-type="submit"
        :loading="isLoading"
        :disabled="isLoading"
        class="actions__submit-action"
        @click="submit"
      >
        Зарегестрироваться
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
// Node Deps
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { object, string, date } from 'yup'
// Pinia Methods
import { createUser } from '~/store/user/auth'

const availableRoles = [
  { label: 'admin', value: 'admin' },
  { label: 'user', value: 'user' },
]

useForm({
  validationSchema: toTypedSchema(
    object({
      email: string().email().required(),
      password: string().required(),
      birthday: date().required(),
      role: string(),
    }),
  ),
})

const isDisabled = ref(true)
const isLoading = ref(false)
const registerData = reactive({
  email: useField('email'),
  password: useField('password'),
  birthday: useField('birthday'),
  role: useField('role'),
})

const inputField = () => {
  if (
    registerData.email.errors.length ||
    registerData.password.errors.length ||
    registerData.birthday.errors.length
  ) {
    isDisabled.value = true
    return
  }
  isDisabled.value = false
}
const submit = async () => {
  try {
    if (isDisabled.value) {
      return
    }

    isLoading.value = true

    const userIsCreated = await createUser({
      email: registerData.email.value as string,
      password: registerData.password.value as string,
      birthday: registerData.birthday.value as string,
      role: registerData.role.value as string,
    })

    if (!userIsCreated) {
      isLoading.value = false
      return
    }
    isLoading.value = false
  } catch (error) {
    throw error
  }
}
</script>

<style lang="scss">
.app-sign-up-form {
  padding: 0.5rem 1rem;
  & .vs-input {
    .app-sign-up-form__field {
      width: 100%;
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
