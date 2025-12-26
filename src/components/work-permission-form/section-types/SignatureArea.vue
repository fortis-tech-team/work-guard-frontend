<script setup lang="ts">
import type { SectionContent } from '@/interfaces/models/WorkPermission';

defineProps<{ content: SectionContent }>();
</script>

<template>
  <v-col>
    <p class="body-1">{{ content.declaration }}</p>
    <div v-for="field in content.fields" :key="field.id" class="mt-6">
      <p class="font-weight-medium mb-0">{{ field.label }}</p>
      <div class="signature-line"></div>
    </div>
  </v-col>
</template>

<style scoped>
.signature-line {
  border-bottom: 2px solid #333;
  height: 40px;
  margin-top: 4px;
}
</style>
