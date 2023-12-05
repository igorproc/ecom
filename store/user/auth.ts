import { useUserStore } from '~/store/user/index'
import { userApi } from '~/api/user'
import { TUserLoginInput, TUserRegisterInput } from '~/types/api'

export const loginUser = async (loginData: TUserLoginInput) => {
  try {
    const userStore = useUserStore()
    const cookieTokenValue = useCookie(
      'Authorization',
      { maxAge: 60*60*24*14 }
    )

    if (cookieTokenValue.value) {
      userStore.isGuest = true

      if (!userStore.userData) {
        userStore.userData = await userApi.getUserData(cookieTokenValue.value as string)
      }
      return
    }

    const userIsLogin = await userApi.loginUser(loginData)
    if (!userIsLogin) {
      return
    }

    cookieTokenValue.value = userIsLogin.token
    userStore.isGuest = false
    userStore.userData = userIsLogin.userData

    return true
  } catch (error) {
    throw new Error(error)
  }
}

export const createUser = async (registerData: TUserRegisterInput) => {
  try {
    const userStore = useUserStore()
    const cookieTokenValue = useCookie(
      'Authorization',
      { maxAge: 60*60*24*14 }
    )

    if (cookieTokenValue.value) {
      userStore.isGuest = true

      if (!userStore.userData) {
        const userData = await userApi.getUserData(cookieTokenValue.value as string)
        userStore.userData = userData
      }
      return
    }

    const userIsLogin = await userApi.createUser(registerData)
    if (!userIsLogin) {
      return
    }

    cookieTokenValue.value = userIsLogin.token
    userStore.isGuest = false
    userStore.userData = userIsLogin.userData
    return true
  } catch (error) {
    throw new Error(error)
  }
}

export const logoutUser = () => {
  const userStore = useUserStore()
  const cookieTokenValue = useCookie('Authorization')

  userStore.isGuest = true
  userStore.userData = null
  cookieTokenValue.value = ''
}
