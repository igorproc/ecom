import type {
  TConfigurableProductOptions,
  TConfigurableProductVariants,
} from '~/api/product/configurable/shred.types'
import type {
  TProductBrand
} from '~/api/product/brand/shared.types'
import type {
  TAdditionalDataGroup
} from '~/api/product/additionalData/shared.types'

export enum EAddProductTypes {
  'base' = 'BASE',
  'configurable' = 'CONFIGURABLE',
}

export type TProduct = {
  pid: number
  __typename: EAddProductTypes
  brand: TProductBrand | null
  name: string
  description: string
  price: number
  productImage: string
  additionalData: TAdditionalDataGroup | null
  productOptions?: TConfigurableProductOptions[] | null
  productVariants?: TConfigurableProductVariants[] | null
  createdAt: string
  updatedAt: string
}
