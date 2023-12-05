export default defineEventHandler(async (event) => {
  const req = await readBody(event)

  if (!req.file) {
    return {
      error: { code: 501, message: 'File is not send' }
    }
  }


})