interface ICartStoreState {
  cartId: string,
  cartIdsList: {
    productCartId: number,
    productId: number,
    variantId: number | null,
  }[],
}

export const useCartStore = defineStore('cart-store', {
  state: (): ICartStoreState => {
    return {
      cartId: 'a64e8d6a-49ad-4931-8031-3028ff9c70c5',
      cartIdsList: [],
    }
  },
  actions: {
    addItemToCart(productId: number, productCartId: number, variantId: number | null) {
      this.cartIdsList.push({
        productCartId,
        productId,
        variantId,
      })
    },
    removeItemFromCart(productId: number, variantId: number | null) {
      if (!variantId) {
        this.cartIdsList = this.cartIdsList.filter(cartId => cartId.productId !== productId)
        return
      }
      this.cartIdsList = this.cartIdsList.filter(cartId => {
        return cartId.productId !== productId && cartId.variantId !== variantId
      })
    },
  },
})
