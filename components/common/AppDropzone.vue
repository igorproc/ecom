<template>
  <v-card class="app-dropzone d-flex flex-column align-start">
    <v-card-title>Перетащите сюда файл</v-card-title>
    <v-card-actions class="w-100">
      <v-card v-if="!state.files.length" v-bind="getRootProps()">
        <div :class="{ isDragActive }">
          <input v-bind="getInputProps()" />
          <div class="pa-4">
            <Icon v-if="isDragActive" icon="ci:more-horizontal"></Icon>
            <Icon v-else icon="ci:file-upload" />
          </div>
        </div>
      </v-card>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
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
