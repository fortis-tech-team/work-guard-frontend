<script setup lang="ts">
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
  window.location.reload();
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
            subtitle="Logged in"
            :title="authStore.user?.displayName || 'Bem-vindo'"
          >
            <template #prepend>
              <v-avatar icon="mdi mdi-account-circle" />
            </template>
          </v-list-item>
        </template>

        <v-divider />

        <v-list density="compact" nav @update:selected="changePage">
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home" />
          <v-list-item
            prepend-icon="mdi mdi-clipboard-text"
            title="Permissoes de trabalho"
            value="list-work-permission"
          />
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account" />
        </v-list>
      </v-navigation-drawer>

      <v-app-bar class="px-3" v-if="authStore.isAuthenticated">
        <v-app-bar-nav-icon v-if="mobile" variant="text" @click.stop="drawer = !drawer" />
        <v-app-bar-title class="cursor-pointer" @click="router.push({ name: 'home' })">
          Work Guard
        </v-app-bar-title>

        <v-btn
          v-if="!mobile"
          :prepend-icon="theme === 'myCustomLightTheme' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          text="Toggle Theme"
          slim
          @click="handleTheme"
        />

        <v-btn
          v-else
          aria-label="Toggle Theme"
          :icon="theme === 'myCustomLightTheme' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          @click="handleTheme"
        />

        <v-btn v-if="!mobile" @click="logout" prepend-icon="mdi-logout" text="Logout" slim />
        <v-btn aria-label="Logout" v-else @click="logout" icon="mdi-logout" />
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
