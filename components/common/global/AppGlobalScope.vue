<template>
  <div class="app-global-scope">
    <AppNavigationDrawer />
    <AppNotification />
    <AppAdminAddProductModal />
  </div>
</template>

<script setup lang="ts">
import AppNavigationDrawer from '~/components/common/layout/navigation/AppNavigationDrawer.vue'
import AppNotification from '~/components/common/global/AppNotification.vue'
import AppAdminAddProductModal from '~/components/admin/products/modal/AppAdminAddProductModal.vue'
</script>
