export const concatArray = <T>(fromArray: T[], witchArray: T[], keys: Array<keyof T>): T[] => {
  return fromArray.filter(fromItem => {
    return !witchArray.some(witchItem => {
      return compareValues<T>(fromItem, witchItem, keys)
    })
  })
}

function compareValues<T>(obj1: T, obj2: T, keys: Array<keyof T>): boolean {
  for (const key of keys) {
    if (obj1[key] !== obj2[key]) {
      return false
    }
  }
  return true
}
