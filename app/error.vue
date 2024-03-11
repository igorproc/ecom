<template>
  <NuxtLayout name="default">
    <div class="app-root app-root--error">

      <div class="app-root__error-content error-content">
        <div class="error-content-info">
          <h1>
            {{ error.statusCode }}
          </h1>
          <h2>Page not found</h2>
        </div>
        <ui-button variant="outlined" label="Go Home" link="/" />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const error = useError()
const router = useRouter()
</script>

<style lang="scss">
.app-root--error {
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .app-root__error-content {
    .error-content-info {
      text-align: center;
    }

    .ui-button {
      margin-top: 35rem;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
