export type TUserCheckJwt = {
  isValidToken: boolean
}

export async function checkTokenHealth(token: string) {
  const asyncQuery = useAsyncQuery()
  return await asyncQuery<TUserCheckJwt>(
    'GET',
    `/api/user/checkAuthStatus?token=${token}`,
  )
}
