<template>
  <VsNavbar class="app-header header">
    <VsRow class="header__container container">
      <VsCol :sm="8" :md="3" class="container__logo">
        <AppLogo />
      </VsCol>
      <VsCol :sm="2" :md="7" />
      <VsCol :sm="2" class="container__actions actions">
        <AppNavigationTrigger class="actions__open-navigation" />
      </VsCol>
    </VsRow>
  </VsNavbar>
</template>

<script setup lang="ts">
import { VsNavbar, VsRow, VsCol } from 'vuesax-alpha'

import AppLogo from '~/components/common/layout/AppLogo.vue'
import AppNavigationTrigger from '~/components/common/navigation/AppNavigationTrigger.vue'
import AppUserBadge from "~/components/user/AppUserBadge.vue";
import AppLogout from "~/components/auth/AppLogout.vue";
</script>

<style lang="scss">
.app-header {
  .vs-navbar__center {
    width: 100%;
  }
  .header__container {
    width: 100%;
    .container__logo {
      display: flex;
      align-items: center;
    }
    .container__actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
</style>