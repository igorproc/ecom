interface IConditionStoreState {
  navigationDrawerIsOpen: boolean,
  adminAddProductModalIsOpen: boolean
}

export const useConditionStore = defineStore('condition-store', {
  state: (): IConditionStoreState => {
    return {
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
  },
})
