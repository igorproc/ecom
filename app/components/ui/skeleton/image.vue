<template>
  <div class="skeleton-image">
    <div class="skeleton-image__shine"></div>
  </div>
</template>

<style lang="scss">
.skeleton-image {
  position: relative;
  overflow: hidden;
  background-color: #{map-get($white-color-palette, 'white-5')};
  height: 100%;
  border-radius: 5px;
}

.skeleton-image__shine {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
  animation: shine 2s infinite;
}
</style>
