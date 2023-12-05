export const useClientOnly = (callback: () => void) => {
  if (!process.client) {
    return
  }
  callback()
}
