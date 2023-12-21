// Models
import { ConfigurableProductModel } from '~/server/models/product/configurable'

interface IQueryData {
  optionGroupId: number
}

interface IQueryBody {
  label: string,
  value: string,
}

export default defineEventHandler(async event => {
  try {
    const configurableProductModel = new ConfigurableProductModel()
    const req = getQuery<IQueryData>(event)
    const body = await readBody<IQueryBody>(event)

    if (!req.optionGroupId || !body.label || !body.value) {
      return { error: { code: 501, message: 'No Required Fields are sends' } }
    }

    return configurableProductModel.actions.addItemToOptionGroup(
      req.optionGroupId,
      body,
    )
  } catch (error) {
    throw error
  }
})
