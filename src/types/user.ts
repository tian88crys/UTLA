export type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  studentId?: string;
  program?: string;
  semester?: string;
  status: 'Activo' | 'Inactivo' | 'Graduado';
  lastAccess?: string;
  phone?: string;
}

export interface AuthState {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (role: UserRole, email?: string) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}
