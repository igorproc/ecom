export function generateRandomId () {
  return `${Date.now().toString(32).slice(0, 5)}-${Math.random().toString(32)}`
}
