<template>
  <div class="clearfix">
    <a-upload
      v-model:file-list="fileList"
      name="image"
      action="/api/product/uploadImage"
      list-type="picture-card"
      @preview="handlePreview"
    >
      <div v-if="!fileList.length">
        <PlusOutlined />
        <div style="margin-top: 8px">Upload</div>
      </div>
    </a-upload>

    <a-modal
      :open="previewVisible"
      :title="previewTitle"
      :footer="null"
      @cancel="handleCancel"
    >
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script lang="ts" setup>

interface Emits {
  (name: 'imageIsUploaded', imageUrl?: string): void
}
function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

const emit = defineEmits<Emits>()

const previewVisible = ref(false)
const previewImage = ref('')
const previewTitle = ref('')

const fileList = ref<UploadProps['fileList']>([])

watch(fileList, (newFileList) => {
  if (!newFileList || !newFileList.length) {
    emit('imageIsUploaded')
  }

  emit('imageIsUploaded', newFileList[0].response as string)
})

const handleCancel = () => {
  previewVisible.value = false
  previewTitle.value = ''
}
const handlePreview = async (file: UploadProps['fileList'][number]) => {
  if (!file.url && !file.preview) {
    file.preview = (await getBase64(file.originFileObj)) as string
  }

  previewImage.value = file.url || file.preview
  previewVisible.value = true
  previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
}
</script>
