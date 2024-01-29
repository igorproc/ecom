import type { TConfigurableProductOptions } from '~/api/product/configurable/shred.types'

export async function createOptionGroup (productId: number, optionGroupLabel: string) {
  const asyncQuery = useAsyncQuery()

  return await asyncQuery<TConfigurableProductOptions>(
    'POST',
    '/api/product/configurable/createOptionGroup',
    {
      optionData: {
        productId,
        label: optionGroupLabel,
      },
    },
  )
}
