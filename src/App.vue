<script setup lang="ts"></script>

<template>
  <header>
    <div>
      <nav>
        <RouterLink :to="{ name: 'home' }">Home</RouterLink>
        <RouterLink :to="{ name: 'signUp' }">Sign Up</RouterLink>
        <RouterLink :to="{ name: 'signIn' }">Sign In</RouterLink>
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
