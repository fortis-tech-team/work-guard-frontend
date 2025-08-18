<script setup lang="ts">
import { inject } from 'vue';
import { useDisplay } from 'vuetify';
import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth';
import { ref } from 'vue';

const { mobile } = useDisplay();
const authStore = useAuthStore();
const router = useRouter();

// Navigation control
const drawer = ref(!mobile.value);
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
  <v-responsive max-height="100%">
    <v-app :theme="theme">
      <v-navigation-drawer
        v-model="drawer"
        :rail="!mobile"
        expand-on-hover
        v-if="authStore.isAuthenticated"
      >
        <template v-slot:prepend>
          <v-list-item
            lines="two"
            prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
            subtitle="Logged in"
            :title="authStore.user?.displayName || 'Bem-vindo'"
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
        <v-app-bar-nav-icon v-if="mobile" variant="text" @click.stop="drawer = !drawer" />
        <v-app-bar-title>Work Guard</v-app-bar-title>

        <v-btn
          :prepend-icon="theme === 'myCustomLightTheme' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
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
