interface IConditionStoreState {
  authModalIsOpen: boolean,
  navigationDrawerIsOpen: boolean,
  adminAddProductModalIsOpen: boolean,
}

export const useConditionStore = defineStore('condition-store', {
  state: (): IConditionStoreState => {
    return {
      authModalIsOpen: false,
      navigationDrawerIsOpen: false,
      adminAddProductModalIsOpen: false,
    }
  },
  actions: {
    openNavigationDrawer() {
      this.navigationDrawerIsOpen = true
    },
    closeNavigationDrawer() {
      this.navigationDrawerIsOpen = false
    },
    openAuthModal() {
      this.authModalIsOpen = true
    },
    closeAuthModal() {
      this.authModalIsOpen = false
    },
    openAdminAddProductModal() {
      this.adminAddProductModalIsOpen = true
    },
    closeAdminAddProductModal() {
      this.adminAddProductModalIsOpen = false
    },
  },
})
