<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { usePrinter } from '@/composables/usePrinter';
import { useWorkPermissionStore } from '@/stores/work-permission';

import type { WorkPermissionData } from '@/interfaces/models/WorkPermission';
import { WorkPermissionTemplate } from '@/components/work-permission';
import { useRoute } from 'vue-router';

const route = useRoute();
const workPermissionStore = useWorkPermissionStore();

onMounted(() => {
  workPermissionStore.getWorkPermissionById(route.params.id as string).then((data) => {
    workPermission.value = data as WorkPermissionData;
  });
});

onUnmounted(() => {
  workPermissionStore.$reset();
});

// Create a reactive reference to the PT data
const workPermission = ref<WorkPermissionData>();

// Function to print the work permission
const { isPrinting, print } = usePrinter();

// Save function to handle saving the work permission
const snackbar = ref({
  show: false,
  message: '',
  color: 'success',
});
</script>

<template>
  <v-row>
    <v-col v-if="workPermissionStore.loading.getById">
      <v-progress-linear indeterminate color="primary" class="mb-4" />
    </v-col>
    <v-col v-else-if="!workPermission">
      <v-alert type="error" class="mt-4">
        Não foi possível carregar a Permissão de Trabalho. Por favor, tente novamente mais tarde.
      </v-alert>
    </v-col>
    <v-col v-else>
      <WorkPermissionTemplate id="create-work-permission" :workPermission="workPermission" />
    </v-col>
  </v-row>

  <v-row class="my-6" justify="center">
    <v-col class="ga-3 d-flex justify-end" v-if="workPermission">
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
