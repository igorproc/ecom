<template>
  <div ref="$item" class="app-dropzone-item">
    <img
      :src="imageUrl"
      :alt="imageName"
      class="app-dropzone-item__image"
      @load="imageIsLoaded"
    >
    <div class="app-dropzone-item__image" />
    <button
      v-if="!imageIsLoading"
      class="app-dropzone-item__delete-action delete-action"
      @click="emits('deleteFile', imageUrl)"
    >
      <CloseOutlined class="delete-action__icon" />
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  imageUrl: string,
  imageName: string
}

interface Emits {
  (name: 'deleteFile', imageUrl: string): () => void
}

const props = defineProps<Props>()
const { imageUrl, imageName } = toRefs(props)
const emits = defineEmits<Emits>()

const imageIsLoading = ref(true)
const $item = ref()
let itemLoader: null

const imageIsLoaded = () => {
  imageIsLoading.value = false
  if (!itemLoader) {
    return
  }
}
</script>

<style lang="scss">
.app-dropzone-item {
  position: relative;
  border-radius: 0.5rem;
  padding: 0.25rem;
  width: 120px;
  height: 120px;
  & &__delete-action {
    position: absolute;
    top: -5px;
    right: -5px;
    background: transparent;
    border: unset;
    .delete-action__icon {
      font-size: 1.5rem;
      &:hover {
        transition: 400ms;
        transform: scale(1.1);
      }
    }
  }
}
</style>
