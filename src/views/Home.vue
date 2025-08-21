<script setup lang="ts">
import router from '@/router';
import { useWorkPermissionGenerateStore } from '@/stores/work-permission-generates';
import { storeToRefs } from 'pinia';
import { onUnmounted, ref } from 'vue';

const workPermissionStore = useWorkPermissionGenerateStore();
const { generationWorkPermission } = storeToRefs(workPermissionStore);

onUnmounted(() => {
  workPermissionStore.$reset();
});

const searchModel = ref('');
const errorStatus = ref<string | null>(null);

function onSearch() {
  errorStatus.value = null;

  workPermissionStore
    .generateWorkPermission(searchModel.value)
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

const PTSuggestions = [
  'Içamento e posicionamento de motor elétrico na base do misturador M-500.',
  'Transferência de ácido sulfúrico do caminhão-tanque para o tanque de armazenamento TQ-301.',
  'Limpeza interna e inspeção do tanque de armazenamento de água T-101.',
  'Manutenção em válvula no interior de galeria subterrânea de utilidades.',
  'Esmerilhamento de tubulação de aço carbono na linha de produção 2.',
  'Medição de grandezas elétricas no barramento principal do painel geral de baixa tensão.',
  'Uso de soprador térmico para reparo em lona na área externa.',
  'Instalação de antena de comunicação na torre de telecomunicações.',
  'Bloqueio e etiquetagem (LOTO) do motor da bomba P-345 para manutenção mecânica.',
  'Abertura de vala com 1,5m de profundidade para passagem de eletroduto.',
];
function getRandomPTSuggestion(limit: number): string[] {
  const apiSuggestions = generationWorkPermission.value.error?.suggestions || [];
  const copyList = apiSuggestions.length ? [...apiSuggestions] : [...PTSuggestions];
  for (let i = copyList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copyList[i], copyList[j]] = [copyList[j], copyList[i]];
  }

  return copyList.slice(0, limit);
}
</script>

<template>
  <h1>Home</h1>

  <v-form @submit.prevent="onSearch">
    <v-row class="mt-6">
      <v-col>
        <h4>Qual a sua tarefa de hoje?</h4>
        <v-text-field
          :error="!!workPermissionStore.error || !!errorStatus"
          :messages="workPermissionStore.error || errorStatus || ''"
          v-model="searchModel"
          variant="outlined"
          :loading="workPermissionStore.loading.generate"
          :disabled="workPermissionStore.loading.generate"
          class="mt-2"
        />
      </v-col>
      <v-col v-if="false">
        <h4>Qual a sua tarefa de hoje?</h4>
        <v-autocomplete
          :error="!!workPermissionStore.error || !!errorStatus"
          :messages="workPermissionStore.error || errorStatus || ''"
          :loading="workPermissionStore.loading.generate"
          :disabled="workPermissionStore.loading.generate"
          v-model="searchModel"
          :items="getRandomPTSuggestion(5)"
          class="mt-2"
          menu-icon=""
          placeholder="Pesquisar permissão de trabalho..."
          prepend-inner-icon="mdi-magnify"
          theme="light"
          variant="outlined"
          auto-select-first
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn
          :loading="workPermissionStore.loading.generate"
          size="large"
          variant="tonal"
          block
          type="submit"
        >
          Pesquisar
        </v-btn>
      </v-col>
    </v-row>
  </v-form>

  <v-col class="mt-6">
    <h4>Sugestoes:</h4>
    <v-list bg-color="white">
      <v-list-item v-for="(item, index) in getRandomPTSuggestion(5)" :key="index">
        <v-list-item-title>{{ item }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-col>
</template>
