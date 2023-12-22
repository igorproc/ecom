<template>
  <VsSidebar
    v-model="activeTab"
    v-model:open="conditionStore.navigationDrawerIsOpen"
    right
    class="app-navigation-drawer drawer"
  >
    <div class="drawer__top-side top-side">
      <AppUserBadge v-if="!userStore.isGuest" />
      <div v-else>
        <vs-sidebar-group>
          <template #header>
            <vs-sidebar-item arrow>
              <template #icon>
                <i class="bx bx-group" />
              </template>
              Войти
            </vs-sidebar-item>
          </template>
          <div id="SignIn">
            <AppSignIn />
          </div>
        </vs-sidebar-group>
        <vs-sidebar-group>
          <template #header>
            <vs-sidebar-item arrow>
              <template #icon>
                <i class="bx bx-group" />
              </template>
              Зарегестрироваться
            </vs-sidebar-item>
          </template>
          <div id="SignUp">
            <AppSignUp />
          </div>
        </vs-sidebar-group>
      </div>
    </div>
    <div v-if="drawerLinksList.length" class="drawer__link-list list">
      <vs-sidebar-item
        v-for="item in drawerLinksList"
        :id="item.title"
        :key="item.title"
        :to="item.url"
        class="list__item"
      >
        <template v-if="item.prependIcon" #icon>
          <Icon :icon="item.prependIcon" class="list__item-prepend-icon" />
        </template>
        <span v-if="item.url" class="list__item-title">
          {{ item.title }}
        </span>
      </vs-sidebar-item>
    </div>
    <div class="drawer__bottom-side bottom-side">
      <div
        v-if="!userStore.isGuest"
        class="bottom-side__logout-action"
      >
        <ClientOnly>
          <AppThemeSwitcher />
        </ClientOnly>
        <AppLogout />
      </div>
    </div>
  </VsSidebar>
</template>

<script setup lang="ts">
import { VsSidebar, VsSidebarItem, VsSidebarGroup } from 'vuesax-alpha'

import { useConditionStore } from '~/store/condition'
import { useUserStore } from '~/store/user'

import { Icon } from '@iconify/vue'
import AppUserBadge from '~/components/user/AppUserBadge.vue'
import AppSignIn from '~/components/auth/AppSignIn.vue'
import AppSignUp from '~/components/auth/AppSignUp.vue'
import AppLogout from '~/components/auth/AppLogout.vue'

import type { TNavigationDrawerLinkListItem } from '~/types/global'
import AppThemeSwitcher from '~/components/common/layout/AppThemeSwitcher.vue'

const conditionStore = useConditionStore()
const userStore = useUserStore()

const defaultLinkList: TNavigationDrawerLinkListItem[] = [
  { title: 'Корзина', url: '/cart', prependIcon: 'gridicons:cart' },
  { title: 'Избранные товары', url: '/wishlist', prependIcon: 'gridicons:thumbs-up' },
]
const adminLinkList: TNavigationDrawerLinkListItem[] = [
  { title: 'Добавление товаров', url: 'admin/products', prependIcon: 'gridicons:product' },
]

const activeTab = ref('')

const drawerLinksList = computed(() => {
  if (userStore.isGuest || !userStore.userData) {
    return defaultLinkList
  }

  const authorizeLinkList: TNavigationDrawerLinkListItem[] = [
    ...defaultLinkList,
    { title: 'Профиль', url: 'user/profile', prependIcon: 'gridicons:house' },
    { title: 'Заказы', url: 'user/checkout', prependIcon: 'gridicons:tag' },
  ]
  if (userStore.userData.role === 'ADMIN') {
    return [...authorizeLinkList, ...adminLinkList]
  }

  return authorizeLinkList
})
</script>

<style lang="scss">
.app-navigation-drawer {
  padding: 0.825rem 0;

  .vs-sidebar__body {
    gap: 0.5rem;
    position: relative;
    display: flex;
    flex-direction: column;

    .drawer__top-side {
      padding: 0.25rem;
      width: 100%;

      .vs-sidebar-group__content {
        content: none !important;
      }
    }

    .drawer__link-list {
      width: 100%;
      .list__item {
        padding: 0.25rem;
        .item__icon {
          font-size: 22px;
        }
      }
    }

    .drawer__bottom-side {
      padding: 0.25rem;
      width: 100%;

      .bottom-side__logout-action {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
</style>
