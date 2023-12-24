import { useUserStore } from '~/store/user/index'
import { userApi } from '~/api/user'
import { utilApi } from "~/api/util.api";

export const initializeUser = async () => {
  const userStore = useUserStore()
  const cookieTokenValue = useCookie('Authorization')

  if (!cookieTokenValue.value) {
    return
  }

  const tokenIsValid = await userApi.checkTokenOnValid(cookieTokenValue.value as string)
  if (!tokenIsValid) {
    return
  }

  const userData = await userApi.getUserData(cookieTokenValue.value as string)
  if (!userData) {
    return
  }

  userStore.userData = userData
  userStore.isGuest = false
}
