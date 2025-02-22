import type { UserData } from '../models/User'
import type { LoadingState } from './VariablesState'

export interface UserState {
  user: UserData | null
  loading: Partial<LoadingState>
  error: string | null
}
