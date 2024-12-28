<script lang="ts" setup>
import { ref } from 'vue'
import { signUpUser } from '@/services/auth'

const user = ref({
  email: '',
  password: '',
})

function signUp() {
  signUpUser(user.value)
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
