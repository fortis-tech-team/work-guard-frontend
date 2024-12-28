<script setup lang="ts">
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()

function logout() {
  authStore.logout()
}
</script>

<template>
  <header>
    <div>
      <nav>
        <RouterLink :to="{ name: 'home' }">Home</RouterLink>
        <RouterLink :to="{ name: 'signUp' }" v-if="!authStore.isAuthenticated">
          Sign Up
        </RouterLink>
        <RouterLink :to="{ name: 'signIn' }" v-if="!authStore.isAuthenticated">Sign In</RouterLink>

        <button @click="logout" v-if="authStore.isAuthenticated">Sair</button>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  gap: 1rem;
}
</style>
