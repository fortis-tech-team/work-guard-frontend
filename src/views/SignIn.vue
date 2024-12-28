<script lang="ts" setup>
import { ref } from 'vue'
import { signInUser } from '@/services/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = ref({
  email: '',
  password: '',
})

async function signIn() {
  signInUser(user.value).then(() => router.push({ name: 'home' }))
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
