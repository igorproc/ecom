<template>
  <vs-card class="app-dropzone-input">
    <template #title>
      Перетащите сюда файл
    </template>
    <div class="app-dropzone-input__actions">
      <div v-if="!state.files.length" v-bind="getRootProps()">
        <div :class="{ isDragActive }">
          <input v-bind="getInputProps()" />
          <div class="pa-4">
            <Icon v-if="isDragActive" icon="ci:more-horizontal"></Icon>
            <Icon v-else icon="ci:file-upload" />
          </div>
        </div>
      </div>
    </div>
  </vs-card>
</template>

<script setup lang="ts">
import {
  VsCard
} from 'vuesax-alpha'
import { useDropzone } from 'vue3-dropzone'

import { Icon } from '@iconify/vue'

interface Emits {
  (name: 'uploadFile', payload: unknown): () => void
}

const emits = defineEmits<Emits>()
const state = reactive({
  files: [],
})

const onDrop = (acceptFiles, rejectReasons) => {
  state.files = acceptFiles
  emits('uploadFile', acceptFiles)
}
const handleClickDeleteFile = (index) => {
  state.files.splice(index, 1)
}
const { getRootProps, getInputProps, isDragActive, ...rest } = useDropzone({
  onDrop,
})
</script>

<style lang="scss">
.app-dropzone-input {
  min-height: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & &__actions {
    width: 100%;
  }
}
</style>