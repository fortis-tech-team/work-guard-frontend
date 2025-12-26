<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { useDisplay } from 'vuetify';
import { useRouter, useRoute, type RouteLocationRaw } from 'vue-router';
import Logo from '@/assets/images/logo.png';

defineProps<{
  showTabs?: boolean;
}>();

const router = useRouter();
const route = useRoute();
const { mobile } = useDisplay();

// Functions
function redirectTo(location: RouteLocationRaw) {
  router.push(location);
}

// Theme control
const theme = defineModel<string>();
function handleTheme() {
  theme.value = theme.value === 'myCustomLightTheme' ? 'dark' : 'myCustomLightTheme';
}

// Tabas section
const activeTab = ref('home');
const routeToTabMap: Record<string, string> = {
  home: 'home',
  'list-work-permission': 'task-manager',
  // Add more routes and their corresponding tab values here
};

onMounted(async () => {
  await router.isReady(); // Ensure the route is fully resolved
  activeTab.value = routeToTabMap[route.name as string] || 'home';
});

// // Logout
// async function logout() {
//   await authStore.logout();
//   window.location.reload();
// }
</script>

<template>
  <v-app-bar class="px-8 border-b-sm" flat>
    <div class="header-logo" @click="redirectTo({ name: 'home' })">
      <v-img height="18" width="18" :src="Logo" />
      <h3>Workguard</h3>
    </div>

    <template v-slot:append>
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
      <v-btn icon="mdi mdi-account-circle" @click="redirectTo({ name: 'account' })" />

      <v-btn icon="mdi-cog-outline" @click="redirectTo({ name: 'account' })" />
    </template>
    <template v-slot:extension>
      <v-tabs v-model="activeTab" align-tabs="center" class="w-100">
        <v-tab
          value="home"
          class="text-body-2 font-weight-medium"
          style="min-width: 180px"
          @click="redirectTo({ name: 'home' })"
        >
          Nova Tarefa
        </v-tab>
        <v-tab
          value="task-manager"
          class="text-body-2 font-weight-medium"
          style="min-width: 180px"
          @click="redirectTo({ name: 'list-work-permission' })"
        >
          Gerenciar Tarefas
        </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<style scoped>
.header-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem 0.5rem 0.5rem 0;
}
</style>
