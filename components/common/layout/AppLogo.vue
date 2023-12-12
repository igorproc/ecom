<template>
  <NuxtLink :to="{ name: 'index' }" class="app-logo px-2">
    <span class="app-logo__text">
      Specto.su Shop
    </span>
  </NuxtLink>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.app-logo {
  .app-logo__text {
    font-size: lib-font-size(18);
    font-weight: bold;
  }

  //@media #{map-get($display-breakpoints, 'md')} {
  //  .app-logo__text {
  //    font-size: lib-font-size(22);
  //  }
  //}
}
</style>
