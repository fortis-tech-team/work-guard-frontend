<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const loading = computed(() => authStore.loading.update);
const error = computed(() => authStore.error);
const user = computed(() => authStore.user);

const success = ref(false);

const handleVerifyEmail = async () => {
  authStore.verifyEmail().then(() => {
    success.value = true;
  });
};

const reloadPage = () => {
  window.location.reload();
};
</script>

<template>
  <v-row v-if="!authStore.isEmailVerified">
    <v-col cols="12" md="12">
      <v-alert type="info" class="mb-4">
        Para acessar todas as funcionalidades, você precisa verificar seu e-mail. Clique no botão
        abaixo para receber o e-mail de verificação.
      </v-alert>
    </v-col>

    <v-col cols="12" md="6">
      <v-card color="white">
        <v-card-title> Verificação de E-mail </v-card-title>
        <v-card-text>
          <div v-if="user">
            <p>
              Seu e-mail: <strong>{{ user.email }}</strong>
            </p>
            <v-alert v-if="success" type="success" class="mb-2">
              E-mail de verificação enviado! Atualize a pagina apos verificar seu e-mail.
            </v-alert>
            <v-alert v-if="error" type="error" class="mb-2">
              {{ error }}
            </v-alert>

            <v-btn
              v-if="success === false"
              :loading="loading"
              color="primary"
              @click="handleVerifyEmail"
            >
              Enviar verificação
            </v-btn>
            <v-btn v-else class="mt-2" @click="reloadPage"> Atualizar pagina </v-btn>
          </div>
          <div v-else>
            <v-alert type="warning" variant="tonal">
              Você precisa estar autenticado para verificar o e-mail.
            </v-alert>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-row v-if="authStore.isEmailVerified">
    <v-col cols="12" md="12">
      <v-alert type="success" class="mb-4">
        Email verificado com sucesso! Você agora tem acesso a todas as funcionalidades.
      </v-alert>
    </v-col>
  </v-row>
</template>
