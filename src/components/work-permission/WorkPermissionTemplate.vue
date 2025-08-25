<script setup lang="ts">
import type { WorkPermissionData } from '@/interfaces/models/WorkPermission';

defineProps<{
  workPermission: WorkPermissionData | undefined;
}>();
</script>

<template>
  <v-card v-if="workPermission" class="mx-auto" max-width="900" elevation="4" color="transparent">
    <v-card-title class="text-h4 text-center primary white--text py-4">
      Permissão de Trabalho (PT)
    </v-card-title>
    <v-card-text class="pa-6">
      <v-form>
        <v-row>
          <template v-for="section in workPermission.sections" :key="section.sectionId">
            <v-col
              :cols="section.layout === 'half' ? 12 : 12"
              :md="section.layout === 'half' ? 6 : 12"
            >
              <h2 class="section-title">{{ section.sectionTitle }}</h2>

              <!-- Form Group -->
              <template v-if="section.type === 'form_group'">
                <v-row v-for="field in section.content.fields" :key="field.id" dense>
                  <v-col cols="12">
                    <v-text-field
                      v-if="field.inputType !== 'textarea'"
                      :label="field.label"
                      :placeholder="field.placeholder"
                      :type="field.inputType"
                      outlined
                      dense
                      readonly
                    />
                    <v-textarea
                      v-else
                      :label="field.label"
                      :placeholder="field.placeholder"
                      outlined
                      rows="2"
                      readonly
                    />
                  </v-col>
                </v-row>
              </template>

              <!-- Risk List -->
              <template v-if="section.type === 'risk_list'">
                <div
                  class="d-flex ga-3 pa-1 pl-4"
                  v-for="(risk, index) in section.content.risks"
                  :key="index"
                >
                  <v-icon color="warning" icon="mdi-alert-circle-outline" />
                  <p class="text-body-1">{{ risk }}</p>
                </div>
              </template>

              <!-- Checklist Group -->
              <template v-if="section.type === 'checklist_group'">
                <div v-for="group in section.content.groups" :key="group.groupTitle" class="mb-4">
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

              <!-- Signature Area -->
              <template v-if="section.type === 'signature_area'">
                <p class="body-1">{{ section.content.declaration }}</p>
                <div v-for="field in section.content.fields" :key="field.id" class="mt-6">
                  <p class="font-weight-medium mb-0">{{ field.label }}</p>
                  <div class="signature-line"></div>
                </div>
              </template>
            </v-col>
          </template>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>

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
