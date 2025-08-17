<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

onBeforeMount(() => {
  if (authStore.isAuthenticated) router.push({ name: 'home' });
});

const user = ref({
  email: '',
  password: '',
  first_name: '',
});

async function signUp() {
  authStore.register(user.value).then(() => {
    router.push({ name: 'home' });
  });
}
</script>

scr

<template>
  <v-form @submit.prevent="signUp">
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-text-field
          id="first_name"
          v-model="user.first_name"
          :readonly="authStore.loading.create"
          label="Name"
          clearable
          required
        />
        <v-text-field
          id="email"
          v-model="user.email"
          :readonly="authStore.loading.create"
          label="E-mail"
          clearable
          required
        />
        <v-text-field
          v-model="user.password"
          :readonly="authStore.loading.create"
          :counter="10"
          label="Password"
          type="password"
          id="password"
          required
          clearable
        />
        <v-btn
          :loading="authStore.loading.create"
          size="large"
          variant="elevated"
          type="submit"
          block
        >
          Cadastrar
        </v-btn>
        <v-btn
          class="mt-5"
          :readonly="authStore.loading.create"
          size="large"
          variant="elevated"
          block
          @click="router.push({ name: 'login' })"
        >
          Fazer login
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<style></style>
