import Database from 'better-sqlite3'
import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'

import * as schema from '~/server/db/schema'

export const sqlite = new Database('server/db/static/sqlite.db')
export const db: BetterSQLite3Database<typeof schema> = drizzle(sqlite, { schema })
