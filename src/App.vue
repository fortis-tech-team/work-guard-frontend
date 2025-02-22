<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();
const router = useRouter();

async function logout() {
  await authStore.logout();
  router.push({ name: 'signIn' });
}
</script>

<template>
  <header>
    <div>
      <nav>
        <RouterLink :to="{ name: 'home' }" v-if="authStore.isAuthenticated">Home</RouterLink>
        <RouterLink :to="{ name: 'signUp' }" v-if="!authStore.isAuthenticated">
          Sign Up
        </RouterLink>
        <RouterLink :to="{ name: 'signIn' }" v-if="!authStore.isAuthenticated">Sign In</RouterLink>

        <button @click="logout" v-if="authStore.isAuthenticated">Sair</button>
      </nav>
    </div>
  </header>

  <p v-if="authStore.loading.get">loading testing</p>
  <RouterView v-else />
</template>

<style scoped>
nav {
  display: flex;
  gap: 1rem;
}
</style>
