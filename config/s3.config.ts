// Node Deps
import AWS from 'aws-sdk'
// Interfaces & Types
import { TS3Config } from '~/server/db/types/global'

export const s3Config: TS3Config = {
  bucketName: process.env.S3_BUCKET_NAME,
  region: process.env.S3_REGION,
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  endpoint: new AWS.Endpoint(process.env.S3_URL),
  sslEnabled: false,
}
