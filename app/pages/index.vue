<template>
  <div class="app-main-page main-page">
    <div class="main-page__slider">
      <AppMainSlider />
    </div>
  </div>
</template>

<script setup lang="ts">
// Components
import AppMainSlider from '~/components/main/AppMainSlider.vue'
</script>

<style lang="scss">
.app-main-page {
  .main-page__slider {
    margin: -0.75rem -2.5rem;
  }
}
</style>
