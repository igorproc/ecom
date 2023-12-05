import { UserModel } from "~/server/models/user";

export default defineEventHandler((event) => {
  const req = getQuery(event)

  if (!req.token) {
    return
  }

  return UserModel.getUserData(req.token)
})
