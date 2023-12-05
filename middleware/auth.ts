import { useUserStore } from '~/store/user'

export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore()

  if (userStore.isGuest) {
    return false
  }
  if (to.meta?.isAdminPage && (userStore.userData && userStore.userData.role !== 'ADMIN' )) {
    return false
  }
  return true
})
