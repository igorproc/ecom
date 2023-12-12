<template>
  <vs-dialog
    v-if="modalIsVisible"
    v-model="conditionStore.adminAddProductModalIsOpen"
    full-screen
    class="app-admin-add-product-modal"
  >
    <AppAdminAddProductForm />
  </vs-dialog>
</template>

<script setup lang="ts">
import {
  VsDialog,
  VsButton,
} from 'vuesax-alpha'

import { Icon } from '@iconify/vue'

import { useUserStore } from '~/store/user'
import { useConditionStore } from '~/store/condition'

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