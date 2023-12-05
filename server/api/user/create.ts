import { TUserCreate } from '~/server/db/types/user'
import { UserModel } from '~/server/models/user'

export default defineEventHandler((event) => {
  try {
    const req = getQuery(event)

    if (!req.email || !req.password || !req.birthday) {
      return {
        error: { code: 501, message: 'Not all required fields are send' }
      }
    }

    const userData: TUserCreate = {
      email: req.email as string,
      password: req.password as string,
      birthday: req.birthday as number,
      role: req?.role
    }
    return UserModel.createUser(userData)

  } catch (error) {
    throw error
  }
})
