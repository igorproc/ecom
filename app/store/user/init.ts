// Pinia stores
import { useUserStore } from '~/store/user/index'
// Api Methods
import { checkTokenHealth } from '~/api/user/checkTokenHealth'
import { getUserData } from '~/api/user/userData'

export const initializeUser = async () => {
  const userStore = useUserStore()
  const cookieTokenValue = useCookie('Authorization')
  if (!cookieTokenValue.value) {
    return
  }

  const userData = await getUserData(cookieTokenValue.value)
  if (!userData) {
    return
  }

  userStore.userData = userData
  userStore.isGuest = false
}
