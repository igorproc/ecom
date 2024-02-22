<template>
  <header class="app-header header">
    <div class="header__logo">
      <AppLogo />
    </div>
    <div v-if="isTablet" class="header__navigation-trigger">
      <AppNavigationTrigger />
    </div>
    <div v-else class="header__content content">
      <div class="content__link-list">
        <AppHeaderLinkList />
      </div>
      <div class="content__actions-list">
        <AppHeaderActionsList />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// Components
import AppLogo from '~/components/common/layout/AppLogo.vue'
import AppNavigationTrigger from '~/components/common/layout/navigation/AppNavigationTrigger.vue'
import AppHeaderLinkList from '~/components/common/layout/header/AppHeaderLinkList.vue'
import AppHeaderActionsList from '~/components/common/layout/header/AppHeaderActionsList.vue'
// Composables
import { useSSRWindowSize } from '~/composables/useSSRWisndowSize'
// Constants
import { DEFAULT_BREAKPOINT_SIZES } from '~/const/app'

const { width } = useSSRWindowSize()
const isTablet = computed(() => width.value <= DEFAULT_BREAKPOINT_SIZES.lg)
</script>

<style lang="scss">
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10rem 15rem;

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

  @media #{map-get($display-rules, 'lg')} {
    padding: 25rem 65rem;

    .header__content {
      max-width: 66%;
      width: 100%;

      display: flex;
      align-items: center;
      justify-content: space-between;

      .content__link-list {
        width: 450rem;
      }

      .content__actions-list {
        width: 150rem;
      }
    }
  }
}
</style>
