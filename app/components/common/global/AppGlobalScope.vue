<template>
  <div class="app-global-scope">
    <AppNotification />

    <div v-if="userStore.isAdmin" class="app-global-scope__admin">
      <AppAdminAddProductModal />
    </div>
  </div>
</template>

<script setup lang="ts">
// Components
import AppNotification from '~/components/common/global/AppNotification.vue'
import AppAdminAddProductModal from '~/components/admin/products/modal/AppAdminAddProductModal.vue'
// Pinia Stores
import { useUserStore } from '~/store/user'

const userStore = useUserStore()
</script>
