export const formattedPrice = (price: number | null, currency = 'USD') => {
  if (!price) {
    return {}
  }
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 2,
  }).format(price)
}
