export enum EProductTypes {
  'base' = 'BASE',
  'configurable' = 'CONFIGURABLE',
}

export type TAddProductInput = {
  name: string,
  price: number,
  productImage: string
  type: keyof typeof EProductTypes
}

// Configurable Types
export type TConfigurableProductOptions = {
  optionId: number,
  optionLabel: string,
  values: TConfigurableProductOption[] | null
}

export type TConfigurableProductOption = {
  label: string,
  optionId: number,
  value: string
}

export type TConfigurableProductVariants = {
  attributes: TConfigurableProductVariant[],
  product: {
    id: number,
    sku: string,
    imageUrl: string
  }
}

export type TConfigurableProductVariant = {
  code: string,
  valueId: number,
}

export type TConfigurableProductOptionInput = {
  label: string,
  value: string,
}
