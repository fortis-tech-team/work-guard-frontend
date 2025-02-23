<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth';
import { ref } from 'vue';

const authStore = useAuthStore();
const router = useRouter();

// Navigation control
function changePage(page: unknown) {
  if (Array.isArray(page) && page.length > 0 && typeof page[0] === 'string') {
    const routerName = page[0];
    router.push({ name: routerName });
  } else {
    router.push({ name: 'home' });
  }
}

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
  <v-responsive max-height="500">
    <v-app :theme="theme">
      <v-navigation-drawer rail expand-on-hover v-if="authStore.isAuthenticated">
        <template v-slot:prepend>
          <v-list-item
            lines="two"
            prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
            subtitle="Logged in"
            title="Jane Smith"
          />
        </template>

        <v-divider />

        <v-list density="compact" nav @update:selected="changePage">
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home" />
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account" />
          <v-list-item
            disabled
            prepend-icon="mdi-account-group-outline"
            title="Users"
            value="users"
          />
        </v-list>
      </v-navigation-drawer>

      <v-app-bar class="px-3" v-if="authStore.isAuthenticated">
        <v-app-bar-title>Work Guard</v-app-bar-title>

        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          text="Toggle Theme"
          slim
          @click="handleTheme"
        />

        <v-btn @click="logout" prepend-icon="mdi-logout" text="Logout" slim />
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

<style scoped></style>
