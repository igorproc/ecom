import type { TConfigurableProductOption } from '~/api/product/configurable/shred.types'

export type TConfigurableProductOptionInput = {
  label: string,
  value: string,
}

export async function addItemToOptionGroup (optionGroupId: number, optionItemData: TConfigurableProductOptionInput) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<TConfigurableProductOption>(
    'POST',
    '/api/product/configurable/addItemToOptionGroup',
    {
      optionItemData: {
        optionGroupId,
        ...optionItemData,
      },
    },
  )
}
