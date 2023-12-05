export enum EUserRoles {
    'admin' = 'ADMIN',
    'user' = 'USER'
  }

export type TUserRoles = keyof typeof EUserRoles

export type TUserCreate = {
  email: string,
  password: string,
  birthday: number,
  role: keyof typeof EUserRoles
}

export type TUserLogin = {
  email: string,
  password: string,
}

export type TUserJwtPayload = {
  email: string,
  uid: number
}
