<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import { useWorkPermissionStore } from '@/stores/work-permission';
import { formatFirestoreTimestamp } from '@/helper/dateFormatter';
import WorkPermissionCard from '@/components/work-permission/WorkPermissionCard.vue';

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
    <v-col cols="12" />

    <v-col v-if="workPermissionStore.loading.get">
      <v-progress-linear indeterminate color="primary" class="mb-4" />
    </v-col>

    <template v-else-if="workPermissions.length > 0">
      <v-col cols="12" class="pb-4">
        <span class="work-permission-count">
          Você possui {{ workPermissions.length }} permissões de trabalhos
        </span>
        <v-divider class="count-divider" />
      </v-col>

      <v-col
        cols="12"
        v-for="wp in workPermissions"
        :key="wp.id"
        class="work-permission-card-wrapper"
      >
        <WorkPermissionCard
          :title="wp.activityTitle || 'Sem título'"
          :version="wp.version || 'N/A'"
          :lastModified="formatFirestoreTimestamp(wp.createdAt) || 'N/A'"
          :to="{ name: 'view-work-permission', params: { id: wp.id } }"
        />
      </v-col>
    </template>

    <v-col v-else>
      <v-alert v-if="error" type="error" variant="tonal" class="mb-4" border="start" prominent>
        {{ error }}
      </v-alert>

      <v-alert v-else type="info" variant="tonal" border="start" class="mt-6">
        No work permissions found.
      </v-alert>
    </v-col>
  </v-row>
</template>

<style scoped>
.work-permission-count {
  font-size: 12px;
  font-weight: 500;
  padding-bottom: 0.5rem;
}
.count-divider {
  border-color: #c4c6cf;
  margin-top: 0.5rem;
}
.work-permission-card-wrapper {
  padding-top: 0rem;
  padding-bottom: 0.5rem;
}
</style>
