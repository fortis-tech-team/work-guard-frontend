import { defineStore } from 'pinia';
import {
  createWorkPermissionService,
  getWorkPermissionByIdService,
  getWorkPermissionsService,
  updateWorkPermissionService,
  deleteWorkPermissionService,
} from '@/services/work-permission.service';

import type { LoadingKey } from '@/interfaces/store/VariablesState';
import type { WorkPermissionData } from '@/interfaces/models/WorkPermission';
import type { WorkPermissionState } from '@/interfaces/store/WorkPermissionState';

const getInitialState = (): WorkPermissionState => ({
  workPermission: undefined,
  workPermissions: [],
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
    createWorkPermission(workPermission: WorkPermissionData) {
      this.setLoading({ name: 'create', isLoading: true });
      this.error = null;

      return createWorkPermissionService(workPermission)
        .catch((err) => (this.error = err.message || 'Erro ao criar permissão'))
        .finally(() => this.setLoading({ name: 'create', isLoading: false }));
    },

    getWorkPermissionById(id: string): Promise<WorkPermissionData> {
      this.setLoading({ name: 'getById', isLoading: true });
      this.error = null;

      return getWorkPermissionByIdService(id)
        .then((data) => {
          this.workPermission = data as WorkPermissionData;
          return this.workPermission;
        })
        .catch((err) => (this.error = err.message || 'Erro ao buscar permissão'))
        .finally(() => this.setLoading({ name: 'getById', isLoading: false }));
    },

    getWorkPermissions(): Promise<WorkPermissionData[]> {
      this.setLoading({ name: 'get', isLoading: true });
      this.error = null;

      return getWorkPermissionsService()
        .then((data) => {
          this.workPermissions = data as WorkPermissionData[];
        })
        .catch((err) => (this.error = err.message || 'Erro ao buscar permissões'))
        .finally(() => this.setLoading({ name: 'get', isLoading: false }));
    },

    updateWorkPermission(id: string, updates: Partial<WorkPermissionData>) {
      this.setLoading({ name: 'update', isLoading: true });
      this.error = null;

      return updateWorkPermissionService(id, updates)
        .then(() => {
          if (this.workPermission && this.workPermission.id === id) {
            Object.assign(this.workPermission, updates);
          }
        })
        .catch((err) => (this.error = err.message || 'Erro ao atualizar permissão'))
        .finally(() => this.setLoading({ name: 'update', isLoading: false }));
    },

    deleteWorkPermission(id: string) {
      this.setLoading({ name: 'delete', isLoading: true });
      this.error = null;

      return deleteWorkPermissionService(id)
        .then(() => {
          if (this.workPermissions) {
            this.workPermissions = this.workPermissions.filter((wp) => wp?.id !== id);
          }
          if (this.workPermission && this.workPermission.id === id) {
            this.workPermission = undefined;
          }
        })
        .catch((err) => (this.error = err.message || 'Erro ao deletar permissão'))
        .finally(() => this.setLoading({ name: 'delete', isLoading: false }));
    },
    $reset(): void {
      Object.assign(this, getInitialState());
    },
  },
});
