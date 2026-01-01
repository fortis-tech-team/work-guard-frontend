<script setup lang="ts">
import type { WorkPermissionData } from '@/interfaces/models/WorkPermission';
import { SectionWrapper, SectionTitle, SectionContent } from '@/components/work-permission-form';

defineProps<{
  workPermission: WorkPermissionData | undefined;
}>();
</script>

<template>
  <template v-if="workPermission">
    <SectionWrapper
      v-for="section in workPermission.sections"
      :key="section.sectionId"
      class="mx-auto mb-4"
      v-bind="$attrs"
    >
      <SectionTitle>{{ section.sectionTitle }}</SectionTitle>
      <SectionContent :type="section.type" :content="section.content" />
    </SectionWrapper>
  </template>

  <v-alert v-else type="error" class="mt-4">
    Não foi possível carregar a Permissão de Trabalho. Por favor, tente novamente mais tarde.
  </v-alert>
</template>

<style scoped>
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
