import type { User } from 'firebase/auth'

export type LoadingKey = 'login' | 'create' | 'logout'
type LoadingState = Record<LoadingKey, boolean>

export interface AuthState {
  user: User | null
  loading: Partial<LoadingState>
  error: string | null
}
