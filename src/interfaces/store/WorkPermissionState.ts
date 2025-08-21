import type { WorkPermissionData, WorkPermissionResponse } from '../models/WorkPermission';
import type { LoadingState } from './VariablesState';

export interface WorkPermissionState {
  workPermission: WorkPermissionData | undefined;
  workPermissions: WorkPermissionData[];
  loading: Partial<LoadingState>;
  error: string | null;
}

export interface WorkPermissionGeneratesState {
  generationWorkPermission: Partial<WorkPermissionResponse>;
  loading: Partial<LoadingState>;
  error: string | null;
}
