// Node Deps
import { createReadStream, unlinkSync, writeFile } from 'fs'
import { outputFile } from 'fs-extra'
// Local fs Helpers
import { extractFileNameFromPath, getFileName, getLocalFilePath } from '~/server/utils/upload.util'

export const localFileManager = {
  async uploadLocalFile (file: File) {
    try {
      const fileBuffer = await file.arrayBuffer()
      if (!fileBuffer.byteLength) {
        return
      }

      const fileName = getFileName(file.name)
      const fileLocalPath = getLocalFilePath(fileName)

      await outputFile(fileLocalPath, Buffer.from(fileBuffer))
      return fileLocalPath
    } catch (error) {
      throw new Error(error)
    }
  },
  deleteFile (filePath: string) {
    try {
      unlinkSync(filePath)
      return true
    } catch (error) {
      throw new Error(error)
    }
  },
  getFile (filePath: string) {
    try {
      const fileName = extractFileNameFromPath(filePath)
      const fileReadStream = createReadStream(filePath)
      fileReadStream.on('error', (e) => {
        console.error('File read error:', e)
      })

      return {
        fileName,
        fileReadStream
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}
