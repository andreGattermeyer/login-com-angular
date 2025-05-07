export interface Usuario {
  username: string;
  email: string;
  password: string;
  role: 'ROLE_ADMIN' | 'ROLE_USER';
  online?: boolean;
}
