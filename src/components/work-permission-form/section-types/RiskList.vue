<script setup lang="ts">
import type { SectionContent } from '@/interfaces/models/WorkPermission';

defineProps<{ content: SectionContent }>();
</script>

<template>
  <v-col cols="12" class="risk-list" v-for="(risk, index) in content.risks" :key="index">
    <v-icon color="#9ea0a1" size="x-small" icon="mdi-alert-circle-outline" />
    <p class="risk-item">{{ risk }}</p>
  </v-col>
</template>

<style scoped>
.risk-list {
  display: flex;
  width: 100%;
  align-items: center;

  opacity: 1;
  gap: 4px;
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
  height: 32px;
}
.risk-item {
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #35393b;
}
</style>
