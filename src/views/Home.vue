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

function selectedSuggestion(item: string) {
  if (item && PTSuggestions.includes(item)) {
    return (searchModel.value = item);
  }
}

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
  <v-form @submit.prevent="onSearch">
    <v-row class="mt-6">
      <v-col cols="12">
        <h1 class="home-title">Olá! Qual é a sua tarefa de hoje?</h1>
      </v-col>
    </v-row>

    <v-row class="mt-12">
      <v-col>
        <div class="search-input-wrapper">
          <v-text-field
            v-model="searchModel"
            class="search-input border-sm"
            :rounded="28"
            :loading="workPermissionStore.loading.generate"
            :disabled="workPermissionStore.loading.generate"
            :error="!!workPermissionStore.error || !!errorStatus"
            :messages="workPermissionStore.error || errorStatus || ''"
            label="Informe o tipo de atividade para elaboração da Permissão de Trabalho"
            variant="solo-filled"
            flat
            hide-details
            single-line
          />
          <v-btn type="submit" icon color="primary" size="x-small" class="search-input-button">
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </div>

        <!-- TODO: Create a v-autocomplete for searching work permissions -->
        <v-col v-if="false">
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
      </v-col>
    </v-row>
  </v-form>

  <v-row class="mt-8 suggentions">
    <v-col cols="12">
      <h5>Sugestões</h5>
    </v-col>
    <v-col
      v-for="(item, index) in getRandomPTSuggestion(5)"
      :key="index"
      sm="6"
      md="4"
      class="suggentions-card"
      @click="selectedSuggestion(item)"
    >
      <div class="border-sm rounded-lg pa-4 cursor-pointer h-100">
        <span> {{ item }} </span>
      </div>
    </v-col>
  </v-row>
</template>

<style scoped>
.home-title {
  font-weight: 400;
  font-size: 36px;
  text-align: center;
}
.search-input-wrapper {
  position: relative;
}
.search-input-button {
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
}
.search-input,
.search-input :deep(.v-field) {
  border-radius: 28px !important;
}
.suggentions h5 {
  font-size: 12px;
  font-weight: 600;
  color: #696e73;
  letter-spacing: 0.5px;
  line-height: 16px;
}
.suggentions span {
  font-size: 12px;
  font-weight: 500;
  color: #93989c;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
