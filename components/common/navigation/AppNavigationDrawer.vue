<template>
  <v-navigation-drawer
    v-model="conditionStore.navigationDrawerIsOpen"
    temporary
    :absolute="true"
    location="right"
    class="app-navigation-drawer drawer"
  >
    <div class="drawer__top-side top-side">
      <AppUserBadge v-if="!userStore.isGuest" />

      <v-expansion-panels v-else class="top-side__auth-links">
        <v-expansion-panel elevation="0" title="Войти">
          <v-expansion-panel-text >
            <AppSignIn />
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel elevation="0" title="Зарегестрироваться">
          <v-expansion-panel-text>
            <AppSignUp />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-divider></v-divider>
    </div>

    <v-list
      v-if="drawerLinksList.length"
      density="compact"
      nav
      class="drawer__link-list"
    >
      <v-list-item
        v-for="listItem in drawerLinksList"
        :key="listItem.title"
        class="list__item"
      >
        <template #prepend>
          <Icon
            v-if="listItem.prependIcon"
            :icon="listItem.prependIcon"
            class="item__icon mr-2"
          />
        </template>
        <NuxtLink :to="listItem.url" class="item__link">
          <v-list-item-title>{{ listItem.title }}</v-list-item-title>
        </NuxtLink>
      </v-list-item>
    </v-list>

    <div class="drawer__bottom-side bottom-side w-100 py-2">
      <div
        v-if="!userStore.isGuest"
        class="bottom-side__logout-action d-flex align-center justify-end"
      >
        <AppLogout />
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useConditionStore } from '~/store/condition'
import { useUserStore } from '~/store/user'

import { Icon } from '@iconify/vue'
import AppUserBadge from '~/components/common/AppUserBadge.vue'
import AppSignIn from '~/components/auth/AppSignIn.vue'
import AppSignUp from '~/components/auth/AppSignUp.vue'
import AppLogout from '~/components/auth/AppLogout.vue'

import type { TNavigationDrawerLinkListItem } from '~/types/global'

const conditionStore = useConditionStore()
const userStore = useUserStore()

const defaultLinkList: TNavigationDrawerLinkListItem[] = [
  { title: 'Корзина', url: '/cart', prependIcon: 'gridicons:cart' },
  { title: 'Избранные товары', url: '/wishlist', prependIcon: 'gridicons:thumbs-up' }
]
const adminLinkList: TNavigationDrawerLinkListItem[] = [
  { title: 'Добавление товаров', url: 'admin/products', prependIcon: 'gridicons:product' }
]

const drawerLinksList = computed(() => {
  if (userStore.isGuest || !userStore.userData) {
    return defaultLinkList
  }

  const authorizeLinkList: TNavigationDrawerLinkListItem[] = [
    ...defaultLinkList,
    { title: 'Профиль', url: 'user/profile', prependIcon: 'gridicons:house' },
    { title: 'Заказы', url: 'user/checkout', prependIcon: 'gridicons:tag' }
  ]
  if (userStore.userData.role === 'ADMIN') {
    return [...authorizeLinkList, ...adminLinkList]
  }

  return authorizeLinkList
})
</script>

<style lang="scss">
.app-navigation-drawer {
  .v-navigation-drawer__content {
    position: relative;
    display: flex;
    flex-direction: column;
    .drawer__top-side {
      .top-side__auth-links {
        .v-expansion-panel-text__wrapper {
          padding: 1rem 0.5rem;
        }
      }
    }
    .drawer__link-list {
      .list__item {
        .item__icon {
          font-size: 22px;
        }
      }
    }
    .drawer__bottom-side {
      position: absolute;
      bottom: 0;
    }
  }
}
</style>