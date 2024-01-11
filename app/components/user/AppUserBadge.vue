<template>
  <div
    v-if="userStore.userData && !userStore.isGuest"
    class="app-user-badge"
  >
    <vs-avatar badge badge-color="success" class="badge__avatar">
      <img alt="User Avatar" src="https://randomuser.me/api/portraits/men/78.jpg">
    </vs-avatar>
    <span v-if="userStore.userData.email" class="badge__email">
      {{ userStore.userData.email }}
    </span>
  </div>
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
