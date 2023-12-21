<template>
  <form class="app-sign-up-form" @submit.prevent="submit">
    <vs-input
      v-model="registerData.email.value"
      label="email"
      class="app-sign-up-form__field"
      @change="inputField"
    >
      <template v-if="registerData.email.errors.length" #message-danger>
        {{ registerData.email.errors.join(', ') }}
      </template>
    </vs-input>
    <vs-input
      v-model="registerData.password.value"
      :error-messages="registerData.password.errors"
      type="password"
      label="password"
      class="app-sign-up-form__field"
      @change="inputField"
    >
      <template v-if="registerData.password.errors.length" #message-danger>
        {{ registerData.password.errors.join(', ') }}
      </template>
    </vs-input>
    <vs-input
      v-model="registerData.birthday.value"
      :error-messages="registerData.birthday.errors"
      type="date"
      label="Birth day"
      class="app-sign-up-form__field"
      @change="inputField"
    >
      <template v-if="registerData.birthday.errors.length" #message-danger>
        {{ registerData.birthday.errors.join(', ') }}
      </template>
    </vs-input>
    <vs-select
      v-model="registerData.role.value"
      :items="availableRoles"
      :error-messages="registerData.role.errors"
      label="Current role"
    >
      <vs-option
        v-for="option in availableRoles"
        :key="option.label"
        :label="option.label"
        :value="option.value"
      />
      <template v-if="registerData.role.errors.length" #message-danger>
        {{ registerData.role.errors.join(', ') }}
      </template>
    </vs-select>
    <div class="app-sign-up-form__actions actions">
      <vs-button
        :disabled="isLoading"
        :loading="isLoading"
        type="submit"
        :class="{ '--disabled': isDisabled }"
        class="actions__submit-action"
      >
        Зарегестрироваться
      </vs-button>
    </div>
  </form>
</template>

<script setup lang="ts">
import {
  VsInput,
  VsButton,
  VsSelect,
  VsOption,
} from 'vuesax-alpha'

import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { object, string, date } from 'yup'

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
