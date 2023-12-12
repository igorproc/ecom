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
} | TResponseError

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

// Product Api Types
enum EAddProductTypes {
  'BASE',
  'CONFIGURABLE'
}

export type TAddProductInput = {
  name: string,
  price: number,
  type: keyof typeof EAddProductTypes,
  imageUrl: string,
}

type TConfigurableProductOption = {
  attributeId: number,
  attributeCode: string,
  label: string,
  values: TConfigurableProductOptionValue[]
}

type TConfigurableProductOptionValue = {
  valueIndex: number,
  label: string,
  value: string
}

type TConfigurableProductVariant = {
  variants: {
    code: string,
    value: string
  }[],
  product: {
    sku: string,
    productImage: string
  }
}

export type TProduct = {
  __typename: keyof typeof EAddProductTypes,
  pid: number,
  name: string,
  price: number,
  productImage: string,
  configurableOptions?: TConfigurableProductOption[],
  variants?: TConfigurableProductVariant[]
}
