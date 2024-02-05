// Pinia Stores & Methods with store
import { useUserStore } from '~/store/user/index'
// Api Methods
import { getUserData } from '~/api/user/userData'
import { loginUser as apiLoginUser } from '~/api/user/login'
import { createUser as apiCreateUser } from '~/api/user/create'
// Types & Interfaces
import type { TUserLoginInput } from '~/api/user/login'
import type { TUserRegisterInput } from '~/api/user/create'
import { wishlistOnLoginUser } from '~/store/wishlist/auth'

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
        const userData = await getUserData(cookieTokenValue.value as string)
        if (!userData) {
          return
        }

        userStore.userData = userData
      }
      return true
    }

    const userIsLogin = await apiLoginUser(loginData)
    if (!userIsLogin) {
      return
    }

    cookieTokenValue.value = userIsLogin.token
    userStore.isGuest = false
    userStore.userData = userIsLogin.userData

    await wishlistOnLoginUser(userIsLogin.token)
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
      userStore.userData = await getUserData(cookieTokenValue.value as string)
      return
    }

    const userIsLogin = await apiCreateUser(registerData)
    if (!userIsLogin) {
      return
    }

    cookieTokenValue.value = userIsLogin.token
    userStore.isGuest = false
    userStore.userData = userIsLogin.userData
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
  } catch (error) {
    throw error
  }
}
