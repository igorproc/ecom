export const useServerOnly = (callback: () => void) => {
  if (!process.server) {
    return
  }
  callback()
}
