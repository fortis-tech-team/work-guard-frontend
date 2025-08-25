<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { usePrinter } from '@/composables/usePrinter';
import { useWorkPermissionStore } from '@/stores/work-permission';

import type { WorkPermissionData } from '@/interfaces/models/WorkPermission';
import { WorkPermissionTemplate } from '@/components/work-permission';

onUnmounted(() => {
  workPermissionStore.$reset();
});

const workPermissionStore = useWorkPermissionStore();
const ptJsonData: WorkPermissionData = workPermissionStore.workPermission as WorkPermissionData;

// Create a reactive reference to the PT data
const ptData = ref<WorkPermissionData>(ptJsonData);

// Function to print the work permission
const { isPrinting, print } = usePrinter();

// Save function to handle saving the work permission
const snackbar = ref({
  show: false,
  message: '',
  color: 'success',
});
function onSave() {
  if (!ptData.value) return;
  workPermissionStore
    .createWorkPermission(ptData.value)
    .then(() => {
      snackbar.value = {
        show: true,
        message: 'Permissão de trabalho salva com sucesso!',
        color: 'success',
      };
    })
    .catch((err) => {
      snackbar.value = {
        show: true,
        message: 'Erro ao salvar permissão de trabalho: ' + (err?.message || 'Erro desconhecido'),
        color: 'error',
      };
    });
}
</script>

<template>
  <v-row>
    <v-col v-if="workPermissionStore.loading.getById">
      <v-progress-linear indeterminate color="primary" class="mb-4" />
    </v-col>
    <v-col v-else-if="!ptData">
      <v-alert type="error" class="mt-4">
        Não foi possível carregar a Permissão de Trabalho. Por favor, tente novamente mais tarde.
      </v-alert>
    </v-col>
    <v-col v-else>
      <WorkPermissionTemplate id="create-work-permission" :workPermission="ptData" />
    </v-col>
  </v-row>

  <v-row class="my-6" justify="center">
    <v-col class="ga-3 d-flex justify-end">
      <v-btn
        id="save-work-permission"
        color="primary"
        variant="outlined"
        size="large"
        @click="onSave"
        :loading="workPermissionStore.loading.create"
        :disabled="workPermissionStore.loading.create"
      >
        Salvar
      </v-btn>
      <v-btn
        id="print-work-permission"
        color="primary"
        size="large"
        variant="outlined"
        @click="print('create-work-permission')"
        :loading="isPrinting"
      >
        Imprimir
      </v-btn>
    </v-col>
  </v-row>

  <v-snackbar
    v-model="snackbar.show"
    :color="snackbar.color"
    location="top end"
    timeout="3500"
    rounded
  >
    {{ snackbar.message }}
  </v-snackbar>
</template>

<style>
.section-title {
  font-size: 1.4rem;
  border-bottom: 2px solid #292929;
  padding-bottom: 8px;
  margin-top: 24px;
  margin-bottom: 16px;
}
.signature-line {
  border-bottom: 2px solid #333;
  height: 40px;
  margin-top: 4px;
}
</style>
