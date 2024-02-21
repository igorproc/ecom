import type { TUserData } from '~/api/user/shared.types'

interface IUserStoreState {
  isGuest: boolean,
  userData: TUserData | null,
  cartId: string | null,
  wishlistId: string | null,
}

export const useUserStore = defineStore('user-store', {
  state: (): IUserStoreState => {
    return {
      isGuest: true,
      userData: null,
      cartId: null,
      wishlistId: null,
    }
  },
  getters: {
    isAdmin: state => {
      if (!state.userData || state.isGuest) {
        return false
      }
      return state.userData.role === 'ADMIN'
    },
  },
})
