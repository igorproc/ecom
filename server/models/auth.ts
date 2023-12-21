import jwt from 'jsonwebtoken'

import { JWT_SECRET_KEY, JWT_TOKEN_LIFETIME } from '~/server/db/const/global'
import { TUserJwtPayload } from '~/server/db/types/user'

export const AuthModel = {
  createJwtToken: (loginData: TUserJwtPayload) => {
    try {
      return jwt.sign(loginData, JWT_SECRET_KEY, { algorithm: 'HS512', expiresIn: JWT_TOKEN_LIFETIME })
    } catch (error) {
      throw error
    }
  },
  checkJwtToken: (token: string) => {
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET_KEY)

      return !!(typeof decodedToken !== 'string' && decodedToken.exp && Date.now() > decodedToken.exp)
    } catch (error) {
      throw error
    }
  },
  decodeJwtToken: (token: string) => {
    try {
      return jwt.verify(token, JWT_SECRET_KEY)
    } catch (error) {
      throw error
    }
  },
}
