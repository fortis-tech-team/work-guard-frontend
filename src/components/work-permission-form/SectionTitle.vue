<template>
  <v-row>
    <v-col class="d-flex align-center justify-space-between">
      <h3>
        <slot></slot>
      </h3>
      <v-btn size="small" prepend-icon="mdi-plus" variant="outlined" rounded="xl">
        Adicionar item
      </v-btn>
    </v-col>
  </v-row>
</template>

<style scoped>
h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #35393b;
}
</style>
