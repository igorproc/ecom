// Node Deps
import { eq } from 'drizzle-orm'
// Db Connector
import { db } from '~/server/db/config/connection'
// Db Schema
import {
  productOptions,
  productOption,
  productVariants,
  productVariant, TProductOptionInput,
} from '~/server/db/schema'
// Types & Interfaces
import {
  TConfigurableProductOption,
  TConfigurableProductOptions,
  TConfigurableProductVariant,
  TConfigurableProductVariants,
  TConfigurableProductOptionInput,
} from '~/server/db/types/product'

export class ConfigurableProductModel {
  protected readonly closedApi = {
    getProductOptionGroup: (optionGroup: number) => {
      return db
        .select()
        .from(productOptions)
        .where(eq(productOptions.pcoid, optionGroup))
        .get()
    },
    getProductOptionById: (productOptionId: number) => {
      return db
        .select()
        .from(productOption)
        .where(eq(productOption.pcoiid, productOptionId))
        .get()
    },
    getProductOptionGroupById: (productOptionGroupId: number) => {
      const productOptionGroup: TConfigurableProductOption[] = []

      const dbOptionGroupItems = db
        .select()
        .from(productOption)
        .where(eq(productOption.pcoid, productOptionGroupId))
        .all()

      dbOptionGroupItems.forEach(item => {
        productOptionGroup.push({
          label: item.label,
          optionId: item.pcoiid,
          value: item.value,
        })
      })
      return productOptionGroup
    },
    getProductVariantGroupById: (productVariantGroupId: number) => {
      const productVariantGroup: TConfigurableProductVariant[] = []

      const dbProductVariants = db
        .select()
        .from(productVariant)
        .where(eq(productVariant.pcvid, productVariantGroupId))
        .all()

      dbProductVariants.forEach(item => {
        const productOptionGroup = this.closedApi.getProductOptionGroup(item.optionGroupId)
        const productOption = this.closedApi.getProductOptionById(item.optionId)

        if (!productOptionGroup || !productOption) {
          return
        }

        productVariantGroup.push({
          code: productOptionGroup.label,
          valueId: productOption.pcoiid,
        })
      })

      return productVariantGroup
    },
  }
  protected readonly validation = {
    optionGroupItemDataIsUnique: (optionGroupId: number, itemData: TConfigurableProductOptionInput) => {
      const dbAllItemsFromGroup = db
        .select()
        .from(productOption)
        .where(eq(productOption.pcoid, optionGroupId))
        .all()

      const matchedItem = dbAllItemsFromGroup.filter(groupItem => {
        if (groupItem.label !== itemData.label && groupItem.value !== itemData.value) {
          return
        }
        return groupItem
      })

      return !matchedItem.length
    },
    optionGroupLabelIsUnique: (productId: number, label: string) => {
      const optionGroupList = db
        .select()
        .from(productOptions)
        .where(eq(productOptions.pid, productId))
        .all()

      const matchedCandidate = optionGroupList.filter(groupItem => groupItem.label === label)

      return !matchedCandidate.length
    },
  }
  public readonly getters = {
    getProductOptions: (productId: number) => {
      const productOptionGroups = db
        .select()
        .from(productOptions)
        .where(eq(productOptions.pid, productId))
        .all()

      if (!productOptionGroups.length) {
        return null
      }
      const productOptionsGroups: TConfigurableProductOptions[] = []

      productOptionGroups.forEach(item => {
        productOptionsGroups.push({
          optionId: item.pcoid,
          optionLabel: item.label,
          values: this.closedApi.getProductOptionGroupById(item.pcoid),
        })
      })

      return productOptionsGroups
    },
    getProductVariants: (productId: number) => {
      const productVariantGroups = db
        .select()
        .from(productVariants)
        .where(eq(productVariants.pid, productId))
        .all()

      if (!productVariantGroups.length) {
        return null
      }
      const variantData: TConfigurableProductVariants[] = []

      productVariantGroups.forEach(item => {
        variantData.push({
          attributes: this.closedApi.getProductVariantGroupById(item.pcvid),
          product: {
            id: item.pcvid,
            sku: item.sku,
            imageUrl: item.imageUrl || '',
          },
        })
      })

      return variantData
    },
  }
  public readonly actions = {
    addItemToOptionGroup: (optionGroupId: number, itemData: TConfigurableProductOptionInput) => {
      if (
        !this.validation.optionGroupItemDataIsUnique(optionGroupId, itemData)
      ) {
        return { error: { code: 501, message: 'Item with this value or label was created' } }
      }

      const payload: TProductOptionInput = {
        pcoid: optionGroupId,
        label: itemData.label,
        value: itemData.value,
      }

      return db
        .insert(productOption)
        .values(payload)
        .returning()
        .get()
    },
    addOptionGroup: (productId: number, label: string) => {
      if (
        !this.validation.optionGroupLabelIsUnique(productId, label)
      ) {
        return { error: { code: 501, message: 'Group with this label was created' } }
      }

      const optionGroupData = db
        .insert(productOptions)
        .values({ pid: productId, label: label })
        .returning()
        .get()

      if (!optionGroupData) {
        return
      }
      return {
        optionId: optionGroupData.pcoid,
        optionLabel: optionGroupData.label,
      }
    },
  }
}
