export interface User {
  id: string;
  email?: string;
}

export interface ValidateResponse {
  valid: boolean;
  user: User | null;
}
