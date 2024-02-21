<template>
  <NuxtLink :to="{ name: 'index' }" class="app-logo px-2">
    <span class="app-logo__text">
      Specto
    </span>
  </NuxtLink>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.app-logo {
  text-decoration: unset;

  .app-logo__text {
    color: map-get($theme-colors, 'primary-color');
    font-size: 18rem;
    font-weight: bold;
  }

  @media #{map-get($display-rules, 'xl')} {
    .app-logo__text {
      font-size: 30rem;
    }
  }
}
</style>
