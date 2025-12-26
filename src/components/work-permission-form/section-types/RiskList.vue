<script setup lang="ts">
import type { SectionContent } from '@/interfaces/models/WorkPermission';

defineProps<{ content: SectionContent }>();
</script>

<template>
  <div class="risk-list" v-for="(risk, index) in content.risks" :key="index">
    <v-icon color="#9ea0a1" size="x-small" icon="mdi-alert-circle-outline" />
    <p class="risk-item">{{ risk }}</p>
  </div>
</template>

<style scoped>
.risk-list {
  display: flex;
  width: 100%;
  align-items: center;

  height: 40px;
  opacity: 1;
  gap: 4px;
  border-radius: 8px;
  padding-top: 4px;
  padding-right: 8px;
  padding-bottom: 4px;
  padding-left: 8px;
  margin-left: 0.5rem;
}
.risk-item {
  font-weight: 500;
  font-style: Medium;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #35393b;
  flex: 1;
}
</style>
