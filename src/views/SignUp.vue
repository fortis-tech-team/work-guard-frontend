<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

onBeforeMount(() => {
  if (authStore.isAuthenticated) router.push({ name: 'home' })
})

const user = ref({
  email: '',
  password: '',
  first_name: '',
})

async function signUp() {
  const isCreated = await authStore.register(user.value)
  if (isCreated) router.push({ name: 'home' })
}
</script>

scr

<template>
  <div class="about">
    <label for="">Email</label>
    <input type="text" v-model="user.email" />
    <br />
    <label for="">Name</label>
    <input type="text" v-model="user.first_name" />
    <br />
    <label for="">Senha</label>
    <input type="text" v-model="user.password" />

    <br />
    <button @click="signUp">Cadastrar</button>
  </div>
</template>

<style></style>
