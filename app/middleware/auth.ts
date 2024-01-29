import { useUserStore } from '~/store/user'

export default defineNuxtRouteMiddleware(async to => {
  const router = useRouter()
  const userStore = useUserStore()

  if (userStore.isGuest || !userStore.userData) {
    await router.push({ name: 'index' })
    return
  }
  if (to.meta?.isAdminPage && !userStore.isAdmin) {
    await router.push({ name: 'index' })
  }
  return true
})
