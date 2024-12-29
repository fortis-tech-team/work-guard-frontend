<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const authStore = useAuthStore()

const user = ref({
  email: '',
  password: '',
})

function signUp() {
  authStore.register(user.value)
}
</script>

scr

<template>
  <div class="about">
    <label for="">Login</label>
    <input type="text" v-model="user.email" />
    <br />
    <label for="">Senha</label>
    <input type="text" v-model="user.password" />

    <br />
    <button @click="signUp">Cadastrar</button>
  </div>
</template>

<style></style>
