import { defineStore } from 'pinia'
import { auth } from '@/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { signInUser, signUpUser, signOutUser } from '@/services/auth'
import type { AuthState } from '@/interfaces/store/AuthState'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    register(email: string, password: string) {
      this.loading = true
      this.error = null

      return signUpUser({ email, password })
        .then((data) => (this.user = data.user))
        .catch((err) => (this.error = err.message || 'Erro ao criar conta'))
        .finally(() => (this.loading = false))
    },

    login(email: string, password: string) {
      this.loading = true
      this.error = null

      return signInUser({ email, password })
        .then((data) => (this.user = data.user))
        .catch((err) => (this.error = err.message || 'Erro ao fazer login'))
        .finally(() => (this.loading = false))
    },

    logout() {
      this.loading = true
      this.error = null

      return signOutUser()
        .then(() => (this.user = null))
        .catch((err) => (this.error = err.message || 'Erro ao fazer logout'))
        .finally(() => (this.loading = false))
    },

    // Monitor changes in authentication state
    monitorAuthState() {
      onAuthStateChanged(auth, (user) => {
        this.user = user
      })
    },
  },
})
