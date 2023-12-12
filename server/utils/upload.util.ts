import path from 'path'
import shortId from 'short-uuid'
import * as fs from "fs";

export const getFileName = (fileName: string) => {
  const fileType = fileName.split('.')[1]
  return `${shortId.generate()}.${fileType}`
}

export const getLocalFilePath = (fileName: string) => {
  return path.resolve(`./server/storage/${fileName}`)
}

export const extractFileNameFromPath = (filePath: string) => {
  const exposedString = filePath.split('/')
  return exposedString[exposedString.length - 1].split('.')[0]
}

export const fileBufferToBase64 = (arrayBuffer) => {
  const unBufferuzedString = String.fromCharCode(...new Uint8Array(arrayBuffer))
  return btoa(unBufferuzedString)
}
