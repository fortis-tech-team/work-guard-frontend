import { defineStore } from 'pinia'
import { auth } from '@/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { signInUser, signUpUser, signOutUser } from '@/services/auth'
import type { AuthState, LoadingKey } from '@/interfaces/store/AuthState'

import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    loading: {},
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    setLoading({ name, isLoading }: { name: LoadingKey; isLoading: boolean }): void {
      this.loading = { ...this.loading, [name]: isLoading }
    },
    register(email: string, password: string) {
      this.setLoading({ name: 'create', isLoading: true })
      this.error = null

      return signUpUser({ email, password })
        .then((data) => (this.user = data.user))
        .catch((err) => (this.error = err.message || 'Erro ao criar conta'))
        .finally(() => this.setLoading({ name: 'create', isLoading: false }))
    },

    login(email: string, password: string) {
      this.setLoading({ name: 'login', isLoading: true })
      this.error = null

      return signInUser({ email, password })
        .then((data) => (this.user = data.user))
        .catch((err) => (this.error = err.message || 'Erro ao fazer login'))
        .finally(() => this.setLoading({ name: 'login', isLoading: false }))
    },

    logout() {
      this.setLoading({ name: 'logout', isLoading: true })
      this.error = null

      return signOutUser()
        .then(() => (this.user = null))
        .catch((err) => (this.error = err.message || 'Erro ao fazer logout'))
        .finally(() => this.setLoading({ name: 'logout', isLoading: false }))
    },

    // Monitor changes in authentication state
    monitorAuthState() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user
          router.push({ name: 'home' })
        } else {
          router.push({ name: 'signIn' })
        }
      })
    },
  },
})
