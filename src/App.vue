<script setup lang="ts">
import { useAuthStore } from './stores/auth';
import { ref } from 'vue';
import { Header } from './components/layout';

const authStore = useAuthStore();

// Theme control
const theme = ref('myCustomLightTheme');
</script>

<template>
  <v-responsive max-height="100%">
    <v-app :theme="theme">
      <Header :show-tabs="authStore.isAuthenticated" v-model="theme" />

      <v-main>
        <v-container>
          <p v-if="authStore.loading.get">loading</p>
          <RouterView v-else />
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<style scoped></style>
