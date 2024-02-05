<template>
  <a-layout-header class="app-header header">
    <a-row class="header__container container">
      <a-col
        :xs="10"
        :md="5"
        class="container__logo"
      >
        <AppLogo />
      </a-col>
      <a-col :xs="11" :md="17" />
      <a-col
        :xs="3"
        :md="2"
        class="container__actions actions"
      >
        <AppNavigationTrigger class="actions__open-navigation" />
      </a-col>
    </a-row>
  </a-layout-header>
</template>

<script setup lang="ts">
import AppLogo from '~/components/common/layout/AppLogo.vue'
import AppNavigationTrigger from '~/components/common/layout/navigation/AppNavigationTrigger.vue'
</script>

<style lang="scss">
.app-header {
  padding: initial !important;

  .header__container {
    width: 100%;

    .container__logo {
      height: 64px;
    }

    .container__actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }

  @media #{map-get($display-breakpoints, 'md')} {
    padding: 0 0.75rem !important;
  }
}
</style>
