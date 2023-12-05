import { S3 } from 'aws-sdk'

export const UploadModel = {
  awsConfig: new S3({
    endpoint: 'https://s3.timeweb.com',
    accessKeyId: 'ce76845',
    secretAccessKey: 'f7920e2d91ad2046bd1446b11ec0a3d5',
    region: 'ru-1'
  }),
}
