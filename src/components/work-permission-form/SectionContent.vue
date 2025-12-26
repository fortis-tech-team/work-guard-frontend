<script setup lang="ts">
import { FormGroup, RiskList, ChecklistGroup, SignatureArea } from './section-types';
import type { SectionContent } from '@/interfaces/models/WorkPermission';

defineProps<{
  type: 'form_group' | 'risk_list' | 'checklist_group' | 'signature_area';
  content: SectionContent;
}>();
</script>

<template>
  <v-row class="work-permissions-content">
    <component
      :is="
        {
          form_group: FormGroup,
          risk_list: RiskList,
          checklist_group: ChecklistGroup,
          signature_area: SignatureArea,
        }[type]
      "
      :content="content"
    />
  </v-row>
</template>

<style scoped>
.work-permissions-content :deep(.v-field) {
  border-radius: 0.5rem !important;
}
</style>
