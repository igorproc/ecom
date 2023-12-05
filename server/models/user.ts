import { compareSync, hashSync } from 'bcrypt'
import { eq } from 'drizzle-orm'

import { TUserInput, user } from '~/server/db/schema'
import { db } from '~/server/db/config/connection'
import { AuthModel } from '~/server/models/auth'
import { USER_PASSWORD_SALT } from '~/server/db/const/global' 
import { EUserRoles, TUserCreate, TUserLogin } from '~/server/db/types/user'

export const UserModel = {
  checkEmailIsExists(email: string) {
    try {
      const userCandidate = db
        .select()
        .from(user)
        .where(eq(user.email, email))
        .get()

      return !!userCandidate
    } catch (error) {
      throw new Error(error)
    }
  },

  createUser(createData: TUserCreate) {
    try {
      if (this.checkEmailIsExists(createData.email)) {
        return {
          error: { code: 501, message: 'User with this email is exists' }
        }
      }

      const createdUserData: TUserInput = {
        email: createData.email,
        password: hashSync(createData.password, USER_PASSWORD_SALT),
        role: createData.role ? EUserRoles[createData.role] : EUserRoles['user'],
        birthday: createData.birthday
      }

      const createdUser = db
        .insert(user)
        .values(createdUserData)
        .returning()
        .get()

      return this.loginUser({
        email: createdUser.email as string,
        password: createData.password
      })
    } catch (error) {
      throw error
    }
  },

  loginUser(loginData: TUserLogin) {
    try {
      const userCandidate = db
        .select()
        .from(user)
        .where(eq(user.email, loginData.email))
        .get()

      if (!userCandidate) {
        return {
          error: { code: 501, message: 'Invalid email or password' }
        }
      }
      const passwordIsCorrect = compareSync(loginData.password, userCandidate?.password)

      if (!passwordIsCorrect) {
        return {
          error: { code: 501, message: 'Invalid email or password' }
        }
      }

      return {
        token: AuthModel.createJwtToken({ email: loginData.email, uid: userCandidate.uid }),
        userData: userCandidate
      }
    } catch (error) {
      throw error
    }
  },

  checkUserIsAuthorized(token: string) {
    try {
      return AuthModel.checkJwtToken(token)
    } catch (error) {
      throw error
    }
  },

  getUserData(token: string) {
    try {
      const tokenPayload = AuthModel.decodeJwtToken(token)
      if (!tokenPayload.uid) {
        return
      }

      const userCandidate = db
        .select()
        .from(user)
        .where(eq(user.uid, tokenPayload.uid))
        .get()
      if (!userCandidate) {
        return
      }

      return userCandidate
    } catch (error) {
      throw error
    }
  }
}
