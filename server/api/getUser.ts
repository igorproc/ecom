import { db } from '~/server/db/config/connection'
import { TUser, user } from '~/server/db/schema'

export default defineEventHandler(() => {
  try {
    const usersRes: TUser[] = db.select().from(user).all()
    if (!usersRes.length) {
      return { users: null }
    }
    return { users: usersRes }
  } catch (error) {
    throw error
  }
})
