export async function addProductImage(file: File) {
  const asyncQuery = useAsyncQuery()
  const formData = new FormData()

  formData.set('image', file)
  return await asyncQuery<string>(
    'POST',
    '/api/product/addImage',
    formData,
  )
}
