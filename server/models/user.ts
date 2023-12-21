// Node Deps
import { compareSync, hashSync } from 'bcrypt'
import { eq } from 'drizzle-orm'
// Db Utils
import { db } from '~/server/db/config/connection'
import { user } from '~/server/db/schema'
import { USER_PASSWORD_SALT } from '~/server/db/const/global'
// Models
import { AuthModel } from '~/server/models/auth'
// Types & Interfaces
import type { TUserInput } from '~/server/db/schema'
import { EUserRoles, TUserCreate, TUserLogin } from '~/server/db/types/user'

export class UserModel {
  private readonly validation = {
    checkEmailIsExists(email: string) {
      try {
        const userCandidate = db
          .select()
          .from(user)
          .where(eq(user.email, email))
          .get()

        return !!userCandidate
      } catch (error) {
        throw error
      }
    },
  }
  public readonly getters = {
    getUserData(token: string) {
      try {
        const tokenPayload = AuthModel.decodeJwtToken(token)
        if (typeof tokenPayload === 'string') {
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
    },
    checkUserIsAuthorized(token: string) {
      try {
        return {
          isValidToken: AuthModel.checkJwtToken(token),
        }
      } catch (error) {
        throw error
      }
    },
  }
  public readonly actions = {
    createUser: (createData: TUserCreate) => {
      try {
        if (this.validation.checkEmailIsExists(createData.email)) {
          return {
            error: { code: 501, message: 'User with this email is exists' },
          }
        }

        const createdUserData: TUserInput = {
          email: createData.email,
          password: hashSync(createData.password, USER_PASSWORD_SALT),
          birthday: createData.birthday,
        }
        if (createData.role) {
          createdUserData.role = EUserRoles[createData.role]
        }

        const createdUser = db
          .insert(user)
          .values(createdUserData)
          .returning()
          .get()

        return this.actions.loginUser({
          email: createdUser.email as string,
          password: createData.password,
        })
      } catch (error) {
        throw error
      }
    },
    loginUser: (loginData: TUserLogin) => {
      try {
        const userCandidate = db
          .select()
          .from(user)
          .where(eq(user.email, loginData.email))
          .get()

        if (!userCandidate) {
          return {
            error: { code: 501, message: 'Invalid email or password' },
          }
        }
        const passwordIsCorrect = compareSync(loginData.password, userCandidate?.password)

        if (!passwordIsCorrect) {
          return {
            error: { code: 501, message: 'Invalid email or password' },
          }
        }

        return {
          token: AuthModel.createJwtToken({ email: loginData.email, uid: userCandidate.uid }),
          userData: userCandidate,
        }
      } catch (error) {
        throw error
      }
    },
  }
}
