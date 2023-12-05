interface IConditionStoreState {
  navigationDrawerIsOpen: boolean
}

export const useConditionStore = defineStore('condition-store', {
  state: (): IConditionStoreState => {
    return {
      navigationDrawerIsOpen: false,
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
  },
})
