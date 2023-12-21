// Interfaces & Types
import { NuxtOptions } from '@nuxt/schema'

export default {
  driver: 's3',
  bucket: process.env.S3_BUCKET_NAME || '',
  endpoint: process.env.S3_URL || '',
  region: process.env.S3_REGION || '',
  accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
} as NuxtOptions['s3']
