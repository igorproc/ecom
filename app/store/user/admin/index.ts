// Types & Interfaces
import type {
  TConfigurableProductOption,
  TProduct,
} from '~/types/api'
import { TConfigurableProductOptions } from '~/types/api'

interface IAdminStoreState {
  configurableProduct: TProduct | null
}

export const useAdminStore = defineStore('admin-store', {
  state: (): IAdminStoreState => {
    return {
      configurableProduct: null,
    }
  },
  actions: {
    setConfigurableProduct(product: TProduct) {
      this.configurableProduct = product
    },
    addOptionToGroupByGroupId(groupData: TConfigurableProductOption) {
      if (!this.configurableProduct || !this.configurableProduct.productOptions) {
        return
      }

      const optionGroupCandidate = this.configurableProduct.productOptions
        .find(item => item.optionId === groupData.pcoid)

      if (!optionGroupCandidate) {
        return
      }
      optionGroupCandidate.values.push({
        optionId: groupData.pcoiid,
        label: groupData.label,
        value: groupData.value,
      })
    },
    addOptionGroup(groupData: TConfigurableProductOptions) {
      if (!this.configurableProduct) {
        return
      }
      if (!this.configurableProduct.productOptions) {
        this.configurableProduct.productOptions = [groupData]
        return
      }
      this.configurableProduct.productOptions.push(groupData)
    },
  },
})
