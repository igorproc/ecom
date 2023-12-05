<template>
  <v-app>
    <v-layout class="app-default-layout">
      <v-app-bar title="Application bar"></v-app-bar>

      <v-navigation-drawer>
        <v-list>
          <v-list-item title="Navigation drawer"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main class="d-flex align-center justify-center">
        <slot />
      </v-main>
    </v-layout>
  </v-app>
</template>