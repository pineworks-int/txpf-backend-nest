export interface User {
  id: string;
  email?: string;
  role?: 'admin' | 'guest';
}

export interface ValidateResponse {
  valid: boolean;
  user: User | null;
}
