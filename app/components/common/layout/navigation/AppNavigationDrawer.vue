<template>
  <UiDrawer
    v-model:open="conditionStore.navigationDrawerIsOpen"
    background-color="#000"
    root-class-name="app-navigation-drawer-container drawer-container"
  >
<!--    <div class="drawer-container__user-actions">-->
<!--      <AppUserBadge v-if="userStore.userData && !userStore.isGuest" />-->
<!--      <AppAuthModalTrigger v-else />-->
<!--    </div>-->

<!--    <a-menu-->
<!--      id="app-navigation-drawer"-->
<!--      v-model:selectedKeys="selectedKeys"-->
<!--      mode="inline"-->
<!--      class="drawer-container__menu drawer-menu"-->
<!--    >-->
<!--      <a-menu-item-->
<!--        v-for="menuItem in drawerLinksList"-->
<!--        :key="menuItem.key"-->
<!--        :disabled="menuItem.disabled"-->
<!--        class="drawer-menu__link-item"-->
<!--        @click="selectTab(menuItem)"-->
<!--      >-->
<!--        <span>-->
<!--          {{ menuItem.label }}-->
<!--        </span>-->
<!--      </a-menu-item>-->
<!--    </a-menu>-->

<!--    <div class="drawer-container__logout-action">-->
<!--      <AppLogout-->
<!--        v-if="userStore.userData && !userStore.isGuest"-->
<!--        class=""-->
<!--      />-->
<!--    </div>-->
  </UiDrawer>
</template>

<script setup lang="ts">
// Ui Components
import UiDrawer from '~/components/ui/drawer/drawer.vue'
// Components
import AppLogout from '~/components/auth/AppLogout.vue'
import AppUserBadge from '~/components/user/AppUserBadge.vue'
import AppAuthModalTrigger from '~/components/auth/modal/AppAuthModalTrigger.vue'
// Pinia Stores
import { useUserStore } from '~/store/user'
import { useConditionStore } from '~/store/condition'
// Types & Interfaces
import type { TNavigationDrawerLinkListItem } from '~/types/global'

const router = useRouter()
const userStore = useUserStore()
const conditionStore = useConditionStore()

const selectedKeys = ref<string[]>([])
const itemsIsDisabled = ref(false)

type TSelectTab = {
  key: string | number,
  cb: () => Promise<unknown> | unknown
}
const selectTab = async (itemInstance: TSelectTab) => {
  itemsIsDisabled.value = true
  await itemInstance.cb()
  itemsIsDisabled.value = false
}

const defaultLinkList: TNavigationDrawerLinkListItem[] = [
  {
    key: 'all-cart',
    label: 'Корзина',
    disabled: itemsIsDisabled.value,
    cb: async () => await router.push('user/cart'),
  },
  {
    key: 'all-wishlist',
    label: 'Избранные товары',
    disabled: itemsIsDisabled.value,
    cb: async () => await router.push('user/wishlist'),
  },
]
const authorizeLinkList: TNavigationDrawerLinkListItem[] = [
  ...defaultLinkList,
  {
    key: 'user-orders',
    label: 'Заказы',
    disabled: itemsIsDisabled.value,
    cb: async () => await router.push('user/orders'),
  },
]
const adminLinkList: TNavigationDrawerLinkListItem[] = [
  {
    key: 'admin-product-add',
    label: 'Добавление товаров',
    disabled: itemsIsDisabled.value,
    cb: async () => await router.push('admin/products'),
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

  .drawer-container__user-actions {
    padding: 0.5rem;
  }

  .drawer-container__menu {
    height: 90%;
    border: none !important;

    .drawer-menu__user-actions,
    .drawer-menu__link-item {
      padding: 0.5rem !important;
    }
  }

  .drawer-container__logout-action {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
