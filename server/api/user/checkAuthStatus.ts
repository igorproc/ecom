import { UserModel } from '~/server/models/user'

export default defineEventHandler(event => {
  const userModel = new UserModel()
  const req = getQuery(event)
  if (!req.token) {
    return
  }

  return userModel.getters.checkUserIsAuthorized(req.token as string)
})
