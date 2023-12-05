import { UserModel } from '~/server/models/user'

export default defineEventHandler((event) => {
  const req = getQuery(event)

  if (!req.email || !req.password) {
    return { error: { code: 501, message: 'No Required Fields are sends' } }
  }

  return UserModel.loginUser({
    email: req.email as string,
    password: req.password as string
  })
})
