<script lang="ts" setup>
import { ref } from 'vue'
import { signInUser } from '@/services/auth'

const user = ref({
  email: '',
  password: '',
})

async function signIn() {
  signInUser(user.value)
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
    <button @click="signIn">Login</button>
  </div>
</template>

<style></style>
