<script setup lang="ts">
import type { SectionContent } from '@/interfaces/models/WorkPermission';

defineProps<{ content: SectionContent }>();
</script>

<template>
  <div v-for="group in content.groups" :key="group.groupTitle" class="mb-4">
    <p class="font-weight-bold subtitle-1">{{ group.groupTitle }}</p>
    <v-checkbox
      v-for="item in group.items"
      :key="item"
      :label="item"
      density="compact"
      hide-details
      readonly
    />
  </div>
</template>

<style scoped></style>
