export const arrayContains = <F extends [], T extends []>(where: F, what: T): boolean => {
  if (!what) {
    return false
  }
  for (let i = 0; i < what.length; i++) {
    for (let j = 0; j < where.length; j++) {
      if (what[i] == where[j]) {
        break
      }
      if (j === where.length - 1) {
        return false
      }
    }
  }
  return true
}
