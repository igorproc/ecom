// Local fs Model
import { localFileManager } from '~/server/models/upload/local'
// S3 fs Model
import { cdnFileManager } from '~/server/models/upload/cdn'
import { readFileSync } from "fs";

export const UploadModel = {
  async uploadFile(file: File) {
    try {
      // Upload File to local store
      const localPath = await localFileManager.uploadLocalFile(file)
      if (!localPath) {
        return localPath
      }
      // Get File from Local store
      const localFileData = localFileManager.getFile(localPath)
      if (!localFileData) {
        return
      }
      // Upload File to S3 Storage
      const isLoaded = await cdnFileManager.uploadFile({
        fileName: localFileData.fileName,
        createReadStream: localFileData.fileReadStream
      })
      localFileManager.deleteFile(localPath)
      if (!isLoaded) {
        return
      }
      // Link
      return { link: isLoaded }
    } catch (e) {
      console.error(e)
      throw new Error(e)
    }
  }
}
