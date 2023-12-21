// Models
import { ConfigurableProductModel } from '~/server/models/product/configurable'

interface IQueryData {
  productId: number,
  groupLabel: string,
}

export default defineEventHandler(event => {
  const configurableProductModel = new ConfigurableProductModel()
  const req = getQuery<IQueryData>(event)

  if (!req.productId || !req.groupLabel) {
    return { error: { code: 501, message: 'No Required Fields are sends' } }
  }

  return configurableProductModel.actions.addOptionGroup(req.productId, req.groupLabel)
})
