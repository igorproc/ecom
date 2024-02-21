<template>
  <a-form
    key="user-register-form"
    :model="registerData"
    autocomplete
    class="app-sign-up-form"
    @finish="submit"
  >
    <a-form-item
      name="register-email"
      class="app-sign-up-form__field"
    >
      <a-input
        v-model:value="registerData.email.value"
        :status="registerData.email.errors.length ? 'error' : ''"
        :placeholder="registerData.email.errors.join() || 'Email'"
        @change="inputField"
      />
    </a-form-item>
    <a-form-item
      name="register-password"
      class="app-sign-up-form__field"
    >
      <a-input
        v-model:value="registerData.password.value"
        :status="registerData.password.errors.length ? 'error' : ''"
        :placeholder="registerData.password.errors.join() || 'password'"
        type="password"
        @change="inputField"
      />
    </a-form-item>
    <a-form-item
      name="register-birthday"
      class="app-sign-up-form__field"
    >
      <a-input
        v-model:value="registerData.birthday.value"
        :status="registerData.birthday.errors.length ? 'error' : ''"
        :placeholder="registerData.birthday.errors.join() || 'Birthday'"
        type="date"
        class="app-sign-up-form__field"
        @change="birthdayInput"
      />
    </a-form-item>
    <a-form-item
      name="register-role"
      class="app-sign-up-form__field"
    >
      <a-select
        v-model:value="registerData.role.value"
        :status="registerData.role.errors.length ? 'error' : ''"
        :placeholder="registerData.role.errors.join() || 'Role'"
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
        type="link"
        :disabled="isLoading"
        class="actions__change-form"
        @click="emit('changeForm')"
      >
        Есть аккаунт?
      </a-button>

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
import { object, string, date, number } from 'yup'
// Pinia Methods
import { createUser } from '~/store/user/auth'

interface Emits {
  (name: 'changeForm'): void,
  (name: 'formCompete'): void,
}

const availableRoles = [
  { label: 'admin', value: 'admin' },
  { label: 'user', value: 'user' },
]

const emit = defineEmits<Emits>()
const validationSchema = useForm({
  validationSchema: toTypedSchema(
    object({
      email: string().email().required(),
      password: string().required(),
      birthday: string().required(),
      role: string(),
    }),
  ),
})

const isDisabled = ref(true)
const isLoading = ref(false)
const registerBirthday = ref(0)
const registerData = reactive({
  email: useField('email'),
  password: useField('password'),
  birthday: useField('birthday'),
  role: useField('role'),
})

const resetForm = () => {
  validationSchema.resetForm()
  isDisabled.value = true
  isLoading.value = false
}
const inputField = () => {
  isDisabled.value = !!Object.values(validationSchema.errors.value).length
}
const birthdayInput = () => {
  inputField()
  registerBirthday.value = new Date(registerData.birthday.value as string).getTime() / 1000
}
const submit = async () => {
  try {
    if (isDisabled.value) {
      return
    }
    isLoading.value = true

    await createUser({
      email: registerData.email.value as string,
      password: registerData.password.value as string,
      birthday: registerBirthday.value,
      role: registerData.role.value as string,
    })

    resetForm()
    emit('formCompete')
  } catch (error) {
    throw error
  }
}
</script>

<style lang="scss">
.app-sign-up-form {
  padding: 0.75rem 1rem;

  .app-sign-up-form__actions {

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
