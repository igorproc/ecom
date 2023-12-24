// Global Api Types
export type TResponseError = {
  error: {
    code: number,
    message: string
  }
}

// User Api Types
export type TUserData = {
  birthday: number
  email: string
  password: string
  role: string
  uid: number
}

export type TUserLogin = {
  token: string,
  userData: TUserData
}

export type TUserLoginInput = {
  email: string,
  password: string,
}

export type TUserRegisterInput = {
  email: string,
  password: string,
  birthday: string,
  role: string
}

export type TUserCheckJwt = {
  isValidToken: boolean
}

// User Wishlist Types
export type TWishlistData = {
  wishlistId: number,
  isGuestCart: boolean,
  uid: number,
  cartId: string,
}

export type TWishlistDataWishProductIds = {
  wishlistData: TWishlistData,
  productIds:  { productId: number, variantId?: number }[]
}

export type TWishlistOperationWithProductInput = {
  productId: number,
  variantId?: number,
}

export type TWishlistRemoveProduct = {
  successDeleting: boolean
}
// Product Api Types
export enum EAddProductTypes {
  'base' = 'BASE',
  'configurable' = 'CONFIGURABLE',
}

export type TAddProductInput = {
  name: string,
  price: number,
  type: keyof typeof EAddProductTypes,
  productImage: string,
}

export type TProduct = {
  pid: number
  __typename: EAddProductTypes
  name: string
  price: number
  productImage: string
  productOptions: TConfigurableProductOptions[] | null
  productVariants: TConfigurableProductVariants[] | null
  createdAt: string
  updatedAt: string
}

export type TConfigurableProductOptions = {
  optionId: number
  optionLabel: string
  values: {
    label: string
    optionId: number
    value: string
  }[]
}

type TConfigurableProductVariants = {
  attributes: {
    code: string
    valueId: number
  }[]
  product: {
    id: number
    sku: string
    imageUrl: string
  }
}

export type TConfigurableProductOptionInput = {
  label: string,
  value: string,
}

export type TConfigurableProductOption = {
  pcoiid: number,
  pcoid: number,
  label: string,
  value: string,
}
