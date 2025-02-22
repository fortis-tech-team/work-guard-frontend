import type { User } from 'firebase/auth';
import type { LoadingState } from './VariablesState';

export interface AuthState {
  user: User | null;
  loading: Partial<LoadingState>;
  error: string | null;
  isFirstVisit: boolean;
}
