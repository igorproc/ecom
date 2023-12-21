<template>
  <div class="app-dropzone-input">
    <div class="app-dropzone-input__title">
      <span>Перетащите сюда файл</span>
    </div>
    <div class="app-dropzone-input__actions input-actions">
      <div
        v-if="!state.files.length"
        v-bind="getRootProps()"
        class="input-actions__close-action-wrapper close-action-wrapper"
      >
        <input v-bind="getInputProps()">
        <vs-button class="close-action-wrapper__action">
          <Icon icon="ci:file-upload" class="action__icon" />
          <span class="action__title">
            Загрузить
          </span>
        </vs-button>
      </div>
      <div v-else>
        <span v-for="file in state.files" :key="file.fileLink">
          <AppDropzoneItem
            :image-name="file.file.name"
            :image-url="file.fileLink"
            @delete-file="handleClickDeleteFile"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// UI Components
import {
  VsButton,
} from 'vuesax-alpha'
import { useDropzone } from 'vue3-dropzone'
import { Icon } from '@iconify/vue'
// Node Deps & Composable
import { useS3Object } from '#imports'
// Pinia Stores
import { useNotificationStore } from '~/store/notification'
// Components
import AppDropzoneItem from '~/components/common/input/AppDropzoneItem.vue'

interface IFilesState {
  files: { fileLink: string, file: File, }[]
}

interface Emits {
  (name: 'uploadFile', payload: string): () => void
}

const runtimeConfig = useRuntimeConfig()
const s3upload = useS3Object()
const notificationStore = useNotificationStore()
const emits = defineEmits<Emits>()

const state = reactive<IFilesState>({
  files: [],
})

const onDrop = async (acceptFiles: File[], rejectReasons: string[]) => {
  try {
    if (rejectReasons.length) {
      notificationStore.openErrorNotification(rejectReasons.join(', '))
      return
    }
    const isSuccessUpload = await s3upload.upload(acceptFiles[acceptFiles.length - 1])
    if (!isSuccessUpload) {
      return
    }
    const exposedFileUrl = isSuccessUpload.split('/')
    const fileUrl = `${runtimeConfig.public.s3Url}/${runtimeConfig.public.s3Bucket}/${exposedFileUrl[exposedFileUrl.length - 1]}`

    state.files.push({ fileLink: fileUrl, file: acceptFiles[acceptFiles.length - 1] })
    emits(
      'uploadFile',
      fileUrl,
    )
  } catch (error) {
    throw error
  }
}
const handleClickDeleteFile = async (fileUrl: string) => {
  try {
    await s3upload.remove(fileUrl)

    const fileCandidateIndex = state.files.findIndex(file => file.fileLink === fileUrl)
    if (!~fileCandidateIndex) {
      return
    }
    state.files.splice(fileCandidateIndex, 1)
  } catch (error) {
    throw error
  }
}
const { getRootProps, getInputProps } = useDropzone({
  onDrop,
})
</script>

<style lang="scss">
.app-dropzone-input {
  min-height: 50px;
  padding: 4px 7px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & &__title {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & &__actions {
    .close-action-wrapper__action {
      margin: 0.25rem 0;

      .action__icon {
        font-size: 1rem;
      }

      .action__title {
        margin-left: 0.25rem;
      }
    }
  }
}
</style>
