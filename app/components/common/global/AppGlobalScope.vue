<template>
  <div class="app-global-scope">
    <ClientOnly>
      <AppNotification />
      <AppNavigationDrawer />

<!--      <div v-if="userStore.isGuest" class="app-global-scope__guest">-->
<!--        <AppAuthModal />-->
<!--      </div>-->
<!--      <div v-if="userStore.isAdmin" class="app-global-scope__admin">-->
<!--        <AppAdminAddProductModal />-->
<!--      </div>-->
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
// Components
import AppNotification from '~/components/common/global/AppNotification.vue'
import AppNavigationDrawer from '~/components/common/layout/navigation/AppNavigationDrawer.vue'
import AppAdminAddProductModal from '~/components/admin/products/modal/AppAdminAddProductModal.vue'
import AppAuthModal from '~/components/auth/modal/AppAuthModal.vue'
// Pinia Stores
import { useUserStore } from '~/store/user'

const userStore = useUserStore()
</script>
