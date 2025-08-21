import { defineStore } from 'pinia';
import { getWorkPermission as getWorkPermissionService } from '@/services/activity.service';

import type { LoadingKey } from '@/interfaces/store/VariablesState';
import type { WorkPermissionResponse } from '@/interfaces/models/WorkPermission';
import type { WorkPermissionGeneratesState } from '@/interfaces/store/WorkPermissionState';
import { useWorkPermissionStore } from './work-permission';

const getInitialState = (): WorkPermissionGeneratesState => ({
  generationWorkPermission: {},
  loading: {},
  error: null,
});

export const useWorkPermissionGenerateStore = defineStore('workPermissionGenerate', {
  state: (): WorkPermissionGeneratesState => getInitialState(),

  getters: {},

  actions: {
    setLoading({ name, isLoading }: { name: LoadingKey; isLoading: boolean }): void {
      this.loading = { ...this.loading, [name]: isLoading };
    },
    generateWorkPermission(activity: string): Promise<WorkPermissionResponse> {
      this.setLoading({ name: 'generate', isLoading: true });
      this.error = null;

      return getWorkPermissionService(activity)
        .then((data) => {
          this.generationWorkPermission = data.data as WorkPermissionResponse;
          if (this.generationWorkPermission.status === 'success') {
            const workPermissionStore = useWorkPermissionStore();
            workPermissionStore.workPermission = this.generationWorkPermission.data;
          }
          return this.generationWorkPermission;
        })
        .catch((err) => (this.error = err.message || 'Erro ao criar permissão de trabalho'))
        .finally(() => this.setLoading({ name: 'generate', isLoading: false }));
    },
    $reset(): void {
      Object.assign(this, getInitialState());
    },
  },
});
