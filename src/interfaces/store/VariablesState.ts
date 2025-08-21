export type LoadingKey =
  | 'create'
  | 'update'
  | 'get'
  | 'delete'
  | 'getById'
  | 'generate'
  | 'login'
  | 'logout';
export type LoadingState = Record<LoadingKey, boolean>;
