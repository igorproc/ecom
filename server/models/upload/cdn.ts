// Node Deps
import aws from 'aws-sdk'
import type { ReadStream } from 'fs'
// S3 Helpers
import { s3Config } from '~/config/s3.config'

interface IUploadFile {
  createReadStream: ReadStream,
  fileName: string
}

export const cdnFileManager = {
  s3: new aws.S3(s3Config),
  async uploadFile (fileData: IUploadFile) {
    try {
      const payload = {
        Bucket: s3Config.bucketName,
        Key: `${fileData.fileName}`,
        Body: fileData.createReadStream,
        ACL: 'public-read'
      }

      const isLoaded = await this.s3.upload(payload).promise()
      return isLoaded || ''
    } catch (error) {
      throw new Error(error)
    }
  }
}
