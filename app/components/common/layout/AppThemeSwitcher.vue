<template>
  <vs-switch :model-value="switchDataModel" @change="changeTheme">
    <template #off>
      <Icon icon="ph:moon" />
    </template>
    <template #on>
      <Icon icon="ph:sun" />
    </template>
  </vs-switch>
</template>

<script setup lang="ts">
const active = useCookie('selected-theme')
const $html = document.querySelector('html')

if ($html && active.value === 'dark') {
  $html.classList.add('dark')
}

const switchDataModel = computed(() => !active.value || active.value === 'light')

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
</script>
