import type { PTResponse } from '../models/WorkPermission';
import type { LoadingState } from './VariablesState';

export interface WorkPermissionState {
  workPermission: Partial<PTResponse>;
  loading: Partial<LoadingState>;
  error: string | null;
}
