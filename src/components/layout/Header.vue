<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useDisplay } from 'vuetify';
import { useWorkPermissionStore } from '@/stores/work-permission';
import { useRouter, useRoute, type RouteLocationRaw } from 'vue-router';
import Logo from '@/assets/images/logo.png';
import { formatFirestoreTimestamp } from '@/helper/dateFormatter';

defineProps<{
  showTabs?: boolean;
}>();

const router = useRouter();
const route = useRoute();
const workPermissionStore = useWorkPermissionStore();
const authStore = useAuthStore();
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
const activeTab = computed(() => routeToTabMap[route.name as string] || 'home');
const routeToTabMap: Record<string, string> = {
  home: 'home',
  'list-work-permission': 'task-manager',
  // Add more routes and their corresponding tab values here
};

// Logout
async function logout() {
  await authStore.logout();
  window.location.reload();
}
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

      <v-menu transition="slide-y-transition" v-if="authStore.isAuthenticated">
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi mdi-account-circle" v-bind="props" />
        </template>
        <v-list>
          <v-list-item @click="redirectTo({ name: 'account' })">
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn
        v-if="authStore.isAuthenticated"
        icon="mdi-cog-outline"
        @click="redirectTo({ name: 'account' })"
      />
    </template>
    <template v-slot:extension v-if="authStore.isAuthenticated">
      <v-tabs
        v-if="!route.meta.hideExtension"
        :model-value="activeTab"
        align-tabs="center"
        class="w-100"
      >
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

      <div class="header-actions" v-else>
        <v-btn icon="mdi-arrow-left" @click="router.back()" />
        <p :title="workPermissionStore.workPermission?.activityTitle" class="actions-title">
          {{ workPermissionStore.workPermission?.activityTitle }}
        </p>
        <div class="fill-space"></div>
        <span class="actions-info">
          {{ formatFirestoreTimestamp(workPermissionStore.workPermission?.createdAt) }}
        </span>
      </div>
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
.header-actions {
  display: flex;
  align-items: center;
  width: 100%;
}
.actions-title {
  font-weight: 600;
  color: #35393b;
  margin-left: 1rem;
  width: 100%;
  white-space: nowrap; /* Prevents the text from breaking */
  overflow: hidden; /* Hides the overflow content */
  text-overflow: ellipsis; /* Adds '...' to indicate overflow */
}
.actions-info {
  font-size: 12px;
  font-weight: 500;
  color: #5d6164;
  white-space: nowrap;
}
.fill-space {
  width: 100%;
}
</style>
