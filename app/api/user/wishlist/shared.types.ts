export type TWishlistData = {
  wishlistId: number,
  isGuestCart: boolean,
  userId: number,
  wishlistToken: string,
}

export type TWishlistOperationWithProductInput = {
  productId: number,
  variantId?: number,
  wishlistToken: string,
}
