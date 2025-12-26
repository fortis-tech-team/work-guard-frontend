<script setup lang="ts">
import type { SectionContent } from '@/interfaces/models/WorkPermission';

defineProps<{ content: SectionContent }>();
</script>

<template>
  <v-col class="checklist-group" v-for="group in content.groups" :key="group.groupTitle">
    <v-checkbox
      v-for="item in group.items"
      :key="item"
      :label="item"
      density="compact"
      hide-details
      readonly
    />
  </v-col>
</template>

<style scoped>
:deep(label) {
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #35393b;
  flex: 1;
}
.checklist-group {
  margin-left: 0.5rem;
  padding-top: 0;
}
</style>
