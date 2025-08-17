<script setup lang="ts">
import { ref } from 'vue';
import { useWorkPermissionStore } from '@/stores/work-permission';
import type { PTResponse, PTData } from '@/interfaces/models/WorkPermission';

const workPermissionStore = useWorkPermissionStore();

const ptJsonData: Partial<PTResponse> = workPermissionStore.workPermission;

// Create a reactive reference to the PT data
const ptData = ref<PTData>(ptJsonData?.data || ({} as PTData));
</script>

<template>
  <v-card class="mx-auto" max-width="900" elevation="4" color="white" v-if="ptData?.ptId">
    <v-card-title class="text-h4 text-center primary white--text py-4">
      Permissão de Trabalho (PT)
    </v-card-title>
    <v-card-text class="pa-6">
      <v-form>
        <!-- Loop through each section from the JSON data -->
        <v-row>
          <template v-for="section in ptData.sections" :key="section.sectionId">
            <v-col
              :cols="section.layout === 'half' ? 12 : 12"
              :md="section.layout === 'half' ? 6 : 12"
            >
              <h2 class="section-title">{{ section.sectionTitle }}</h2>

              <!-- Render Form Group -->
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
                    />
                    <v-textarea
                      v-else
                      :label="field.label"
                      :placeholder="field.placeholder"
                      outlined
                      rows="2"
                    />
                  </v-col>
                </v-row>
              </template>

              <!-- Render Risk List -->
              <template v-if="section.type === 'risk_list'">
                <v-list density="compact" bg-color="white">
                  <v-list-item v-for="(risk, rIndex) in section.content.risks" :key="rIndex">
                    <template v-slot:prepend>
                      <v-icon color="warning" icon="mdi-alert-circle-outline" />
                    </template>
                    <v-list-item-title>{{ risk }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </template>

              <!-- Render Checklist Group -->
              <template v-if="section.type === 'checklist_group'">
                <div v-for="group in section.content.groups" :key="group.groupTitle" class="mb-4">
                  <p class="font-weight-bold subtitle-1">{{ group.groupTitle }}</p>
                  <v-checkbox
                    v-for="item in group.items"
                    :key="item"
                    :label="item"
                    dense
                    hide-details
                    class="mb-1"
                  />
                </div>
              </template>

              <!-- Render Signature Area -->
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
    <v-card-actions class="pa-6">
      <v-spacer />
      <v-btn color="primary" x-large>Emitir e Imprimir PT</v-btn>
    </v-card-actions>
  </v-card>

  <v-alert v-else type="error" class="mt-4">
    Não foi possível carregar a Permissão de Trabalho. Por favor, tente novamente mais tarde.
  </v-alert>
</template>

<style>
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
