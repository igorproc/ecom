import type { TUserData } from '~/api/user/shared.types'

export type TUserLogin = {
  token: string,
  userData: TUserData
}

export type TUserLoginInput = {
  email: string,
  password: string,
}

export async function loginUser(userData: TUserLoginInput) {
  const asyncQuery = useAsyncQuery()
  return await asyncQuery<TUserLogin>(
    'POST',
    '/api/user/login',
    { loginData: userData },
  )
}
