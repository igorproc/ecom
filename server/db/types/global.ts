// External Types
import type { Endpoint } from 'aws-sdk'

export type TResponseError = {
  status: number,
  error: { code: number, message: string }
}

export type TS3Config = {
  bucketName: string,
  dirName?: string,
  region: string,
  accessKeyId: string,
  secretAccessKey: string,
  endpoint: Endpoint,
  sslEnabled: boolean
}
