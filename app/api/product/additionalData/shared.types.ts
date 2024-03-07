type TAdditionalDataItem = {
  id: number
  label: string
  description: string
}

export type TAdditionalDataGroup = {
  id: number
  label: string
  items: TAdditionalDataItem[]
}
