<template>
  <a-modal
    v-model:open="conditionStore.authModalIsOpen"
    :footer="null"
    wrap-class-name="app-auth-modal"
    @close="conditionStore.closeAuthModal()"
  >
    <div class="app-auth-modal__form">
      <AppSignUpForm
        v-if="isRegisterForm"
        @change-form="changeForm"
        @form-compete="successForm"
      />
      <AppSignInform
        v-else
        @change-form="changeForm"
        @form-compete="successForm"
      />
    </div>
  </a-modal>
</template>

<script setup lang="ts">
// Components
import AppSignUpForm from '~/components/auth/form/AppSignUpForm.vue'
import AppSignInform from '~/components/auth/form/AppSignInForm.vue'
// Pinia Stores
import { useConditionStore } from '~/store/condition'

const conditionStore = useConditionStore()

const isRegisterForm = ref(true)

const changeForm = () => {
  isRegisterForm.value = !isRegisterForm.value
}
const successForm = () => {
  conditionStore.closeAuthModal()
}
</script>

<style lang="scss">
.app-auth-modal {
  .ant-modal-content {
    padding: 1rem;

    .app-auth-modal__form {
      padding: 0.5rem;
    }
  }
}
</style>
