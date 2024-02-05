export type TConfigurableProductOptions = {
  optionId: number
  optionLabel: string
  values: {
    label: string
    optionId: number
    value: string
  }[]
}

export type TConfigurableProductVariants = {
  attributes: {
    code: string
    valueId: number
  }[]
  product: {
    id: number
    sku: string
    imageUrl: string
  }
}

export type TConfigurableProductOption = {
  pcoiid: number,
  pcoid: number,
  label: string,
  value: string,
}
