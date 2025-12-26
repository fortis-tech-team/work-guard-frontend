<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  lastModified: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <v-card
    elevation="0"
    class="d-flex align-center justify-space-between work-permission-card"
    v-bind="$attrs"
  >
    <div class="work-permission-text-content w-100">
      <div class="d-flex">
        <span :class="['work-permission-title', title.length > 50 ? 'title-long' : 'title-short']">
          {{ title }}
        </span>
      </div>

      <div class="d-flex pt-4">
        <span class="work-permission-label mr-4">Versão {{ version }}</span>
        <span class="work-permission-label">Última alteração há {{ lastModified }}</span>
      </div>
    </div>

    <v-btn icon variant="text">
      <v-icon class="icon-chevron">mdi-chevron-right</v-icon>
    </v-btn>
  </v-card>
</template>

<style scoped>
.work-permission-card {
  background-color: #f9f9ff;
  border: 1px solid #dfdfdf;
  border-radius: 12px;
  padding: 1rem;
  height: 78px;
  cursor: pointer;
  transition: all 0.2s;
}

.work-permission-title {
  font-family: 'Urbanist', sans-serif;
  font-weight: 500;
  line-height: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: calc(100% - 40px);
}

.work-permission-title.title-long {
  font-size: 14px;
}

.work-permission-title.title-short {
  font-size: 16px;
}

.work-permission-label {
  font-size: 12px;
  color: #5d6164;
}
</style>
