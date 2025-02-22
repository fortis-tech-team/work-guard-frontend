<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

onBeforeMount(() => {
  if (authStore.isAuthenticated) router.push({ name: 'home' });
});

const user = ref({
  email: '',
  password: '',
});

async function signIn() {
  const data = await authStore.login(user.value);

  if (data?.uid) router.push({ name: 'home' });
}
</script>

scr

<template>
  <div class="about">
    <label for="">Login</label>
    <input type="text" v-model="user.email" />
    <br />
    <label for="">Senha</label>
    <input type="text" v-model="user.password" />

    <br />
    <button @click="signIn">Login</button>
  </div>
</template>

<style></style>
