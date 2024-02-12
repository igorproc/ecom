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

export interface IWishlistDataProductId {
  itemId: number,
  productId: number,
  variantId?: number,
}
