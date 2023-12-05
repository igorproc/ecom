export const clearFields = (dataFields: Record<any, any>) => {
  const defaultDataTypes = {
    'object': null,
    'string': '',
    'number': 0,
    'boolean': false
  }

  const values = {}
  for (const [key, value]: [string, any] of Object.entries(dataFields)) {
    values[key] = defaultDataTypes[typeof value]
  }
}
