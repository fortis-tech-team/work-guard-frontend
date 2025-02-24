<script setup lang="ts">
import { getRecommendationNRs } from '@/services/activity.service';
import { ref } from 'vue';

const searchModel = ref('');
function onSearch() {
  getRecommendationNRs(searchModel.value).then((result) => {
    const data = result.data as string;
    console.log('data', data);
  });
}
</script>

<template>
  <h1>Home</h1>

  <v-form @submit.prevent="onSearch">
    <v-row class="mt-6">
      <v-col>
        <v-text-field v-model="searchModel" label="Search AI" variant="outlined" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn size="large" variant="tonal" block type="submit"> Pesquisar </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
