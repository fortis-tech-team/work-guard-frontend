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
  <v-row justify="center" v-if="user && !authStore.isEmailVerified">
    <v-col cols="12" md="7" lg="5">
      <v-sheet elevation="4" class="pa-8 rounded-xl" color="grey-lighten-5">
        <div class="d-flex align-center justify-center mb-4">
          <v-icon color="primary" size="40">mdi-email-alert</v-icon>
          <span class="ml-3 text-h5 font-weight-bold">Verifique seu E-mail</span>
        </div>
        <v-divider class="mb-4" />

        <v-alert type="info" variant="tonal" class="mb-4" border="start" prominent>
          Para acessar todas as funcionalidades, verifique seu e-mail. Clique no botão abaixo para
          receber o e-mail de verificação.
        </v-alert>

        <div>
          <v-list-item class="mb-2">
            <template #prepend>
              <v-avatar color="primary" size="32">
                <v-icon>mdi-account</v-icon>
              </v-avatar>
            </template>
            <v-list-item-title>
              <span class="font-weight-medium">E-mail:</span>
              <span class="ml-1">{{ user.email }}</span>
            </v-list-item-title>
          </v-list-item>
          <v-alert v-if="success" type="success" class="mb-2" border="start" variant="tonal">
            E-mail de verificação enviado! Após verificar, clique em "Atualizar página".
          </v-alert>
          <v-alert v-if="error" type="error" class="mb-2" border="start" variant="tonal">
            {{ error }}
          </v-alert>

          <div class="d-flex flex-column align-center">
            <v-btn
              v-if="!success"
              :loading="loading"
              color="primary"
              size="large"
              class="mb-2"
              @click="handleVerifyEmail"
              prepend-icon="mdi-email-send"
            >
              Enviar verificação
            </v-btn>
            <v-btn
              v-else
              color="success"
              size="large"
              class="mb-2"
              @click="reloadPage"
              prepend-icon="mdi-refresh"
            >
              Atualizar página
            </v-btn>
          </div>
        </div>
      </v-sheet>
    </v-col>
  </v-row>
  <v-row v-if="authStore.isEmailVerified">
    <v-col class="text-center mt-4">
      <v-alert type="success" variant="tonal" class="mb-4" border="start" prominent>
        E-mail verificado com sucesso! Você agora tem acesso total à aplicação.
      </v-alert>
    </v-col>
  </v-row>
</template>
