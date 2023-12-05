import type { Config } from 'drizzle-kit'

export default {
  schema: './server/db/schema.ts',
  out: './server/db/static/migrations',
  driver: 'better-sqlite',
  dbCredentials: { url: './server/db/static/sqlite.db' },
  verbose: true,
  strict: true,
} satisfies Config
