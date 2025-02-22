import { defineStore } from 'pinia'
import { auth } from '@/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { signInUser, signUpUser, signOutUser } from '@/services/auth.service'
import { useUserStore } from './user'

import type { AuthState } from '@/interfaces/store/AuthState'
import type { UserData } from '@/interfaces/models/User'

import type { AuthData, RegisterParams } from '@/interfaces/models/Auth'
import type { LoadingKey } from '@/interfaces/store/VariablesState'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    loading: {},
    error: null,
    isFirstVisit: true,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    setLoading({ name, isLoading }: { name: LoadingKey; isLoading: boolean }): void {
      this.loading = { ...this.loading, [name]: isLoading }
    },
    register({ email, password, first_name }: RegisterParams) {
      this.setLoading({ name: 'create', isLoading: true })
      this.error = null

      return signUpUser({ email, password })
        .then((data) => {
          if (!data) return

          this.user = data.user

          const userData: UserData = {
            uid: this.user.uid,
            role: 'Admin',
            first_name,
            last_name: '',
            position: '',
          }

          const userStore = useUserStore()
          userStore.createUser(userData)

          return true
        })
        .catch((err) => (this.error = err.message || 'Erro ao criar conta'))
        .finally(() => this.setLoading({ name: 'create', isLoading: false }))
    },

    login({ email, password }: AuthData) {
      this.setLoading({ name: 'login', isLoading: true })
      this.error = null

      return signInUser({ email, password })
        .then((data) => (this.user = data.user))
        .catch((err) => (this.error = err.message || 'Erro ao fazer login'))
        .finally(() => this.setLoading({ name: 'login', isLoading: false }))
    },

    logout(): Promise<void> {
      this.setLoading({ name: 'logout', isLoading: true })
      this.error = null

      return signOutUser()
        .then(() => (this.user = null))
        .catch((err) => (this.error = err.message || 'Erro ao fazer logout'))
        .finally(() => this.setLoading({ name: 'logout', isLoading: false }))
    },

    // Monitor changes in authentication state
    monitorAuthState() {
      return new Promise((resolve, reject) => {
        this.setLoading({ name: 'get', isLoading: true })
        onAuthStateChanged(
          auth,
          (user) => {
            this.setLoading({ name: 'get', isLoading: false })
            if (user) {
              this.user = user
              resolve(user)
            } else {
              this.user = null
              resolve(null)
            }
          },
          (error) => {
            reject(error)
          },
        )
      })
    },
  },
})
