<template>
  <NuxtLink
    v-if="userStore.userData && !userStore.isGuest"
    :to="{ name: 'user-profile' }"
    class="app-user-badge"
  >
    <a-avatar
      src="https://randomuser.me/api/portraits/men/78.jpg"
      shape="square"
      class="badge__avatar"
    />
    <span v-if="userStore.userData.email" class="badge__email">
      {{ userStore.userData.email }}
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
// Pinia Stores
import { useUserStore } from '~/store/user'

const userStore = useUserStore()
</script>

<style lang="scss">
.app-user-badge {
  display: flex;
  align-items: center;

  .badge__email {
    width: 70%;
    margin-left: 0.5rem;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
