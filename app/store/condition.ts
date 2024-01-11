interface IConditionStoreState {
  authorizeModalIsOpen: boolean,
  navigationDrawerIsOpen: boolean,
  adminAddProductModalIsOpen: boolean
}

export const useConditionStore = defineStore('condition-store', {
  state: (): IConditionStoreState => {
    return {
      authorizeModalIsOpen: false,
      navigationDrawerIsOpen: false,
      adminAddProductModalIsOpen: false,
    }
  },
  actions: {
    toggleNavigationDrawer() {
      this.navigationDrawerIsOpen = !this.navigationDrawerIsOpen
    },
    closeNavigationDrawer() {
      this.navigationDrawerIsOpen = false
    },
    openNavigationDrawer() {
      this.navigationDrawerIsOpen = true
    },
    openAdminAddProductModal() {
      this.adminAddProductModalIsOpen = true
    },
    closeAdminAddProductModal() {
      this.adminAddProductModalIsOpen = false
    },
    openAuthorizeModal() {
      this.adminAddProductModalIsOpen = true
    },
    closeAuthorizeModal() {
      this.adminAddProductModalIsOpen = false
    },
  },
})
