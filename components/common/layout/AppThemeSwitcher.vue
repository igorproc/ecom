<template>
  <vs-switch v-model="active" @change="changeTheme">
    <template #off>
      <Icon icon="ph:moon" />
    </template>
    <template #on>
      <Icon icon="ph:sun" />
    </template>
  </vs-switch>
</template>

<script setup lang="ts">
// Ui Comopnents
import {
  VsSwitch,
} from 'vuesax-alpha'
import { Icon } from '@iconify/vue'

const active = ref(true)
const $html = document.querySelector('html')

const changeTheme = () => {
  if (!$html) {
    return
  }

  if (active.value) {
    $html.classList.add('dark')
    return
  }
  $html.classList.remove('dark')
}
</script>
