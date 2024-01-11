<template>
  <div class="app-navigation-drawer-container drawer-container">
    <a-menu
      v-model:selectedKeys="activeTab"
      theme="dark"
      mode="inline"
      class="drawer-container__menu drawer-menu"
    >
      <a-menu-item
        v-for="menuItem in drawerLinksList"
        :key="menuItem.key"
        :disabled="menuItem.disabled"
        class="drawer-menu__link-item"
      >
        <component :is="menuItem.icon" />
        <span>
          {{ menuItem.label }}
        </span>
      </a-menu-item>

      <div class="drawer-menu__auth-actions">
        <a-sub-menu v-if="userStore.isGuest" key="guest-register">
          <template #title>
            <user-outlined />
            <span>Зарегестрироваться</span>
          </template>
          <AppSignUp />
        </a-sub-menu>
        <a-sub-menu v-if="userStore.isGuest" key="guest-auth">
          <template #title>
            <user-outlined />
            <span>Войти</span>
          </template>
          <AppSignIn />
        </a-sub-menu>
      </div>
    </a-menu>

    <AppLogout
      v-if="userStore.userData && !userStore.isGuest"
      class="drawer__container-logout-action"
    />
  </div>
</template>

<script setup lang="ts">
// Icons
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  TableOutlined,
} from '@ant-design/icons-vue'
// Components
import AppSignUp from '~/components/auth/AppSignUp.vue'
import AppSignIn from '~/components/auth/AppSignIn.vue'
import AppLogout from '~/components/auth/AppLogout.vue'
// Pinia Stores
import { useUserStore } from '~/store/user'
// Types & Interfaces
import type { TNavigationDrawerLinkListItem } from '~/types/global'

const router = useRouter()
const userStore = useUserStore()

const activeTab = ref<(string | number)[]>([])
const itemsIsDisabled = ref(false)

type TSelectTab = {
  key: string | number,
  cb: () => Promise<unknown> | unknown
}
const selectTab = async (itemInstance: TSelectTab) => {
  activeTab.value[0] = itemInstance.key
  await itemInstance.cb()
}

const defaultLinkList: TNavigationDrawerLinkListItem[] = [
  {
    key: 'all-cart',
    label: 'Корзина',
    icon: () => h(ShoppingCartOutlined),
    disabled: itemsIsDisabled.value,
    onClick: () => selectTab({
      key: 'all-cart',
      cb: async () => await router.push('user/cart'),
    }),
  },
  {
    key: 'all-wishlist',
    label: 'Избранные товары',
    icon: () => h(HeartOutlined),
    disabled: itemsIsDisabled.value,
    onClick: () => selectTab({
      key: 'all-wishlist',
      cb: async () => await router.push('user/wishlist'),
    }),
  },
]
const authorizeLinkList: TNavigationDrawerLinkListItem[] = [
  ...defaultLinkList,
  {
    key: 'user-profile',
    label: 'Профиль',
    icon: () => h(HomeOutlined),
    disabled: itemsIsDisabled.value,
    onClick: () => selectTab({
      key: 'user-profile',
      cb: async () => await router.push('user/profile'),
    }),
  },
  {
    key: 'user-orders',
    label: 'Заказы',
    icon: () => h(UnorderedListOutlined),
    disabled: itemsIsDisabled.value,
    onClick: () => selectTab({
      key: 'user-orders',
      cb: async () => await router.push('user/orders'),
    }),
  },
]
const adminLinkList: TNavigationDrawerLinkListItem[] = [
  {
    key: 'admin-product-add',
    label: 'Добавление товаров',
    icon: () => h(TableOutlined),
    disabled: itemsIsDisabled.value,
    onClick: () => selectTab({
      key: 'admin-product-add',
      cb: async () => await router.push('admin/products'),
    }),
  },
]

const drawerLinksList = computed(() => {
  if (userStore.isGuest || !userStore.userData) {
    return defaultLinkList
  }

  if (userStore.userData.role === 'ADMIN') {
    return [...authorizeLinkList, ...adminLinkList]
  }

  return authorizeLinkList
})
</script>

<style lang="scss">
.app-navigation-drawer-container {
  padding: 0.825rem 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  .drawer-container__menu {
    .ant-menu-item, .ant-menu-submenu-title {
      padding-left: 0.75rem !important;
    }
  }
}
</style>
