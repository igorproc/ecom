import { UploadModel } from '~/server/models/upload'

type TRequestFormData = {
  file: File
}

export default defineEventHandler(async (event) => {
  try {
    const req = await readFormData<TRequestFormData>(event)
    if (!req.get('file')) {
      return {
        error: { code: 501, message: 'File is not send' }
      }
    }

    return await UploadModel.uploadFile(req.get('file') as File)
  } catch (error) {
    throw new Error(error)
  }
})
