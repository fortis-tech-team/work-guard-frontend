<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth';
import { ref } from 'vue';

const authStore = useAuthStore();
const router = useRouter();

// Theme control
const theme = ref('myCustomLightTheme');
function handleTheme() {
  theme.value = theme.value === 'myCustomLightTheme' ? 'dark' : 'myCustomLightTheme';
}

// Logout
async function logout() {
  await authStore.logout();
  router.push({ name: 'login' });
}
</script>

<template>
  <v-responsive class="border rounded" max-height="500">
    <v-app :theme="theme">
      <v-navigation-drawer rail expand-on-hover v-if="authStore.isAuthenticated">
        <v-list>
          <v-list-item title="Navigation drawer" />
        </v-list>
      </v-navigation-drawer>

      <v-app-bar class="px-3" v-if="authStore.isAuthenticated">
        <v-app-bar-title>Work Guard</v-app-bar-title>

        <RouterLink :to="{ name: 'home' }" v-if="authStore.isAuthenticated">Home</RouterLink>

        <v-spacer />

        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          text="Toggle Theme"
          slim
          @click="handleTheme"
        />

        <v-btn
          @click="logout"
          v-if="authStore.isAuthenticated"
          prepend-icon="mdi-logout"
          text="Logout"
          slim
        />
      </v-app-bar>

      <v-main>
        <v-container>
          <p v-if="authStore.loading.get">loading</p>
          <RouterView v-else />
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<style scoped>
nav {
  display: flex;
  gap: 1rem;
}
</style>
