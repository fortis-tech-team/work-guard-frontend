import { defineStore } from 'pinia';
import { createUserService, getUserByIdService } from '@/services/user.service';
import type { UserData } from '@/interfaces/models/User';
import type { UserState } from '@/interfaces/store/UserState';
import type { LoadingKey } from '@/interfaces/store/VariablesState';

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: null,
    loading: {},
    error: null,
  }),

  getters: {},

  actions: {
    setLoading({ name, isLoading }: { name: LoadingKey; isLoading: boolean }): void {
      this.loading = { ...this.loading, [name]: isLoading };
    },
    createUser(user: UserData) {
      this.setLoading({ name: 'create', isLoading: true });
      this.error = null;

      return createUserService(user)
        .then((isCreated) => {
          if (isCreated) {
            this.user = user;
          }
        })
        .catch((err) => (this.error = err.message || 'Erro ao criar conta'))
        .finally(() => this.setLoading({ name: 'create', isLoading: false }));
    },
    getUserById(userUid: string): Promise<UserData> {
      this.setLoading({ name: 'getById', isLoading: true });
      this.error = null;

      return getUserByIdService(userUid)
        .then((data) => {
          this.user = data as UserData;
          return this.user;
        })
        .catch((err) => (this.error = err.message || 'Erro ao criar conta'))
        .finally(() => this.setLoading({ name: 'getById', isLoading: false }));
    },
  },
});
