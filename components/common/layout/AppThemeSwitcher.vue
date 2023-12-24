<template>
  <vs-switch :model-value="active === 'light'" @change="changeTheme">
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

const active = useCookie('selected-theme')
const $html = document.querySelector('html')

const changeTheme = () => {
  if (!$html) {
    return
  }

  if (active.value === 'dark') {
    active.value = 'light'
    $html.classList.remove('dark')
    return
  }
  active.value = 'dark'
  $html.classList.add('dark')
}

if ($html && active.value === 'dark') {
  $html.classList.add('dark')
}
</script>
