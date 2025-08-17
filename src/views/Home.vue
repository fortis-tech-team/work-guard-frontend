<script setup lang="ts">
import router from '@/router';
import { useWorkPermissionStore } from '@/stores/work-permission';
import { ref } from 'vue';

const workPermissionStore = useWorkPermissionStore();

const searchModel = ref('');
const errorStatus = ref<string | null>(null);

function onSearch() {
  workPermissionStore
    .getWorkPermission(searchModel.value)
    .then((result) => {
      const data = result;
      if (data.status === 'success') {
        router.push({ name: 'create-work-permission' });
      } else {
        errorStatus.value = data.error?.message || 'Erro ao gerar a permissão de trabalho.';
      }
    })
    .catch((error) => {
      errorStatus.value = error.message || 'Erro ao buscar a permissão de trabalho.';
    });
}
</script>

<template>
  <h1>Home</h1>

  <v-form @submit.prevent="onSearch">
    <v-row class="mt-6">
      <v-col>
        <h2>Qual a sua tarefa de hoje?</h2>
        <v-text-field
          :error="workPermissionStore.error || errorStatus"
          :messages="workPermissionStore.error || errorStatus || ''"
          v-model="searchModel"
          variant="outlined"
          :loading="workPermissionStore.loading.get"
          :disabled="workPermissionStore.loading.get"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn size="large" variant="tonal" block type="submit"> Pesquisar </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
