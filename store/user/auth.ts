// Pinia Stores & Methods with store
import { useUserStore } from '~/store/user/index'
import { wishlistDataOnCreate, wishlistDataOnLogin, wishlistDataOnLogout } from '~/store/wishlist/auth'
// Api Methods
import { userApi } from '~/api/user'
// Types & Interfaces
import type { TUserLoginInput, TUserRegisterInput } from '~/types/api'

export const loginUser = async (loginData: TUserLoginInput) => {
  try {
    const userStore = useUserStore()
    const cookieTokenValue = useCookie(
      'Authorization',
      { maxAge: 60 * 60 * 24 * 14 },
    )

    if (cookieTokenValue.value) {
      userStore.isGuest = true
      if (!userStore.userData) {
        const userData = await userApi.getUserData(cookieTokenValue.value as string)
        if (!userData) {
          return
        }

        userStore.userData = userData
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

    await Promise.all([
      wishlistDataOnLogin(),
    ])
    return true
  } catch (error) {
    throw error
  }
}

export const createUser = async (registerData: TUserRegisterInput) => {
  try {
    const userStore = useUserStore()
    const cookieTokenValue = useCookie(
      'Authorization',
      { maxAge: 60 * 60 * 24 * 14 },
    )

    if (cookieTokenValue.value && !userStore.userData) {
      userStore.isGuest = false
      userStore.userData = await userApi.getUserData(cookieTokenValue.value as string)
      await wishlistDataOnCreate()
      return
    }

    const userIsLogin = await userApi.createUser(registerData)
    if (!userIsLogin) {
      return
    }

    cookieTokenValue.value = userIsLogin.token
    userStore.isGuest = false
    userStore.userData = userIsLogin.userData

    await Promise.all([
      wishlistDataOnCreate()
    ])
    return true
  } catch (error) {
    throw error
  }
}

export const logoutUser = async () => {
  try {
    const userStore = useUserStore()
    const cookieTokenValue = useCookie('Authorization')

    userStore.isGuest = true
    userStore.userData = null
    cookieTokenValue.value = ''

    await Promise.all([
      wishlistDataOnLogout(),
    ])
    return true
  } catch (error) {
    throw error
  }
}
