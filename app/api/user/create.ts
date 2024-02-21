import type { TUserData } from '~/api/user/shared.types'

export type TUserRegisterInput = {
  email: string,
  password: string,
  birthday: number,
  role: string
}

export type TRegisterUser = {
  userData: TUserData,
  token: string,
}

export async function createUser (userData: TUserRegisterInput) {
  const asyncQuery = useAsyncQuery()
  return await asyncQuery<TRegisterUser>(
    'POST',
    '/api/user/create',
    { createUserData: userData },
  )
}
