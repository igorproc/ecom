// Pinia stores
import { useUserStore } from '~/store/user/index'
// Api Methods
import { userApi } from '~/api/user'

export const initializeUser = async () => {
  const userStore = useUserStore()
  const cookieTokenValue = useCookie('Authorization')

  if (!cookieTokenValue.value) {
    return
  }

  const tokenIsValid = await userApi.checkTokenOnValid(cookieTokenValue.value)
  if (!tokenIsValid) {
    return
  }

  const userData = await userApi.getUserData(cookieTokenValue.value)
  if (!userData) {
    return
  }

  userStore.userData = userData
  userStore.isGuest = false
}
