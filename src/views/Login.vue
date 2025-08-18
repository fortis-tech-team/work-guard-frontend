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
  authStore.login(user.value).then(() => {
    router.push({ name: 'home' });
  });
}
</script>

<template>
  <v-form @submit.prevent="signIn">
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-text-field
          id="email"
          v-model="user.email"
          :readonly="authStore.loading.login"
          label="E-mail"
          clearable
          required
        />
        <v-text-field
          v-model="user.password"
          :readonly="authStore.loading.login"
          :counter="10"
          label="Last name"
          type="password"
          id="password"
          required
          clearable
        />
        <v-btn
          :loading="authStore.loading.login"
          size="large"
          type="submit"
          variant="elevated"
          block
        >
          Entrar
        </v-btn>
        <v-btn
          :readonly="authStore.loading.login"
          size="large"
          variant="elevated"
          block
          class="mt-5"
          @click="router.push({ name: 'sign-up' })"
        >
          Cadastrar
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<style></style>
