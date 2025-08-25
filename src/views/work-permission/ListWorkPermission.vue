<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import { useWorkPermissionStore } from '@/stores/work-permission';
import { formatFirestoreTimestamp } from '@/helper/dateFormatter';

const workPermissionStore = useWorkPermissionStore();

onMounted(() => {
  workPermissionStore.getWorkPermissions();
});

onUnmounted(() => {
  workPermissionStore.$reset();
});

const workPermissions = computed(() =>
  workPermissionStore.workPermissions ? workPermissionStore.workPermissions : [],
);
const error = computed(() => workPermissionStore.error);
</script>

<template>
  <v-row>
    <v-col>
      <h1 class="font-unbounded mb-6">Permissão de trabalho</h1>
      <v-alert v-if="error" type="error" variant="tonal" class="mb-4" border="start" prominent>
        {{ error }}
      </v-alert>
      <v-progress-linear
        v-if="workPermissionStore.loading.get"
        indeterminate
        color="primary"
        class="mb-4"
      />
      <v-table
        v-if="workPermissions && workPermissions.length"
        class="elevation-2 bg-transparent"
        density="comfortable"
        color="white"
      >
        <thead>
          <tr>
            <th class="text-left">Title</th>
            <th class="text-left">Version</th>
            <th class="text-left">Created At</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="wp in workPermissions" :key="wp.id">
            <td>{{ wp.activityTitle }}</td>
            <td>{{ wp.version }}</td>
            <td>{{ formatFirestoreTimestamp(wp.createdAt) || '-' }}</td>
            <td :id="`actions-${wp.id}`">
              <v-btn
                color="primary"
                size="small"
                variant="tonal"
                prepend-icon="mdi-eye"
                :to="{ name: 'view-work-permission', params: { id: wp.id } }"
              >
                View
              </v-btn>
              <v-btn
                color="error"
                size="small"
                variant="tonal"
                class="ml-2"
                @click="workPermissionStore.deleteWorkPermission(wp.id || '')"
                prepend-icon="mdi-delete"
                :loading="workPermissionStore.loading.delete"
                :disabled="workPermissionStore.loading.delete"
              >
                Delete
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
      <v-alert
        v-else-if="!workPermissionStore.loading.get"
        type="info"
        variant="tonal"
        border="start"
        class="mt-6"
      >
        No work permissions found.
      </v-alert>
    </v-col>
  </v-row>
</template>
