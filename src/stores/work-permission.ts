import { defineStore } from 'pinia';
import { getWorkPermission as getWorkPermissionService } from '@/services/activity.service';
import type { LoadingKey } from '@/interfaces/store/VariablesState';
import type { PTResponse } from '@/interfaces/models/WorkPermission';
import type { WorkPermissionState } from '@/interfaces/store/WorkPermissionState';

const getInitialState = (): WorkPermissionState => ({
  workPermission: {},
  loading: {},
  error: null,
});

export const useWorkPermissionStore = defineStore('workPermission', {
  state: (): WorkPermissionState => getInitialState(),

  getters: {},

  actions: {
    setLoading({ name, isLoading }: { name: LoadingKey; isLoading: boolean }): void {
      this.loading = { ...this.loading, [name]: isLoading };
    },
    generateWorkPermission(activity: string): Promise<PTResponse> {
      this.setLoading({ name: 'generate', isLoading: true });
      this.error = null;

      return getWorkPermissionService(activity)
        .then((data) => {
          this.workPermission = data.data as PTResponse;
          return this.workPermission;
        })
        .catch((err) => (this.error = err.message || 'Erro ao criar permissão de trabalho'))
        .finally(() => this.setLoading({ name: 'generate', isLoading: false }));
    },
    $reset(): void {
      Object.assign(this, getInitialState());
    },
  },
});
