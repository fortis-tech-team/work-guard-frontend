<script setup lang="ts">
import type { SectionContent } from '@/interfaces/models/WorkPermission';

defineProps<{ content: SectionContent }>();
</script>

<template>
  <v-col class="form-group-field py-2" cols="12" v-for="field in content.fields" :key="field.id">
    <label :for="field.id">{{ field.label }}</label>
    <v-text-field
      v-if="field.inputType !== 'textarea'"
      class="mt-2"
      :placeholder="field.placeholder"
      :type="field.inputType"
      :id="field.id"
      variant="outlined"
      density="compact"
      hide-details
    />
    <v-textarea
      v-else
      :id="field.id"
      :placeholder="field.placeholder"
      outlined
      rows="2"
      variant="outlined"
      hide-details
    />
  </v-col>
</template>

<style scoped>
label {
  font-size: 12px;
}
</style>
