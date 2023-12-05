import type { TUserData } from '~/types/api'

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
  }
})
