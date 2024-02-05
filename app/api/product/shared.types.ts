import type {
  TConfigurableProductOptions,
  TConfigurableProductVariants
} from '~/api/product/configurable/shred.types'

export enum EAddProductTypes {
  'base' = 'BASE',
  'configurable' = 'CONFIGURABLE',
}

export type TProduct = {
  pid: number
  __typename: EAddProductTypes
  name: string
  price: number
  productImage: string
  productOptions?: TConfigurableProductOptions[] | null
  productVariants?: TConfigurableProductVariants[] | null
  createdAt: string
  updatedAt: string
}
