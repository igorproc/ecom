<template>
  <vs-dialog
    v-if="modalIsVisible"
    v-model="conditionStore.adminAddProductModalIsOpen"
  >
    <AppAdminAddProductForm />
  </vs-dialog>
</template>

<script setup lang="ts">
// Ui Components
import {
  VsDialog,
} from 'vuesax-alpha'
// Pinia Stores
import { useUserStore } from '~/store/user'
import { useConditionStore } from '~/store/condition'
// Components
import AppAdminAddProductForm from '~/components/admin/products/modal/AppAdminAddProductForm.vue'

const userStore = useUserStore()
const conditionStore = useConditionStore()

const modalIsVisible = computed(() => {
  if (userStore.isGuest) {
    return false
  }
  if (userStore.userData && userStore.userData.role === 'ADMIN') {
    return true
  }
})
</script>

<style lang="scss">
.app-admin-add-product-modal {
  .modal__card {
    padding: 2.5rem;
    position: relative;

    .card__close-action {
      position: absolute;
      top: 0;
      right: 0;

      .action__icon {
        font-size: 22px;
      }
    }
  }
}
</style>
