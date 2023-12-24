<template>
  <VsNavbar class="app-header header">
    <VsRow class="header__container container">
      <VsCol :xs="8" :sm="8" :md="3" class="vs-col-8 container__logo">
        <AppLogo />
      </VsCol>
      <VsCol :xs="1" :sm="2" :md="7" />
      <VsCol :xs="3" :sm="2" :md="2" class="container__actions actions">
        <AppNavigationTrigger class="actions__open-navigation" />
      </VsCol>
    </VsRow>
  </VsNavbar>
</template>

<script setup lang="ts">
import { VsNavbar, VsRow, VsCol } from 'vuesax-alpha'

import AppLogo from '~/components/common/layout/AppLogo.vue'
import AppNavigationTrigger from '~/components/common/layout/navigation/AppNavigationTrigger.vue'
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
