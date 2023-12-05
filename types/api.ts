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
