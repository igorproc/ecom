import { integer, sqliteTable, text, real } from 'drizzle-orm/sqlite-core'
import { InferSelectModel, InferInsertModel, sql } from 'drizzle-orm'

import { EProductTypes } from '~/server/db/types/product'
import { EUserRoles } from '~/server/db/types/user'


// Models
export const user = sqliteTable('user', {
  uid: integer('uid').primaryKey({ autoIncrement: true }),
  email: text('email').notNull(),
  password: text('password').notNull(),
  birthday: integer('birthday').notNull(),
  role: text('role').default(EUserRoles['user']),
  updatedAt: integer('updated_at').default(sql`CURRENT_TIMESTAMP`),
  createdAt: integer('created_at').default(sql`CURRENT_TIMESTAMP`)
})

export const product = sqliteTable('product', {
  pid: integer('pid').primaryKey({ autoIncrement: true }),
  __typename: text('__typename').default(EProductTypes['simple']),
  name: text('title').notNull(),
  price: real('price').notNull(),
  productImage: text('product_image_url').default('')
})

export const productOptions = sqliteTable('product-configurable-options', {
  pcoid: integer('pcoid').primaryKey({ autoIncrement: true }),
  pid: integer('pid').notNull(),
  label: text('attribute_label').notNull()
})

export const productOption = sqliteTable('product-configurable-option-item', {
  pcoiid: integer('pcoiid').primaryKey({ autoIncrement: true }),
  pcoid: integer('pcoid').notNull(),
  label: text('label').notNull(),
  value: text('value').notNull()
})

export const productVariants = sqliteTable('product-configurable-variants', {
  pcvid: integer('pcvid').primaryKey({ autoIncrement: true }),
  sku: text('sku').notNull(),
  imageUrl: text('image_url').default(''),
})

export const productVariant = sqliteTable('product-configurable-variant-item', {
  pcviid: integer('pcviid').primaryKey({ autoIncrement: true }),
  optionId: integer('pcoiid').notNull()
})

export const fileManager = sqliteTable('file-manager', {
  fmid: integer('fmid').primaryKey({ autoIncrement: true }),
  url: text('url').notNull()
})

// Types
export type TUser = InferSelectModel<typeof user>
export type TUserInput = InferInsertModel<typeof user>

export type TProduct = InferSelectModel<typeof product>
export type TProductInput = InferInsertModel<typeof product>

export type TFileManager = InferSelectModel<typeof fileManager>
export type TFileManager = InferInsertModel<typeof fileManager>
