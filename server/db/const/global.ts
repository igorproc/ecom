import { genSaltSync } from 'bcrypt'

export const USER_PASSWORD_SALT=genSaltSync(5)
export const JWT_SECRET_KEY='6353ee40aa5cad'
export const JWT_TOKEN_LIFETIME=60*60*24*14