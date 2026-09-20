import { create } from 'zustand';
import { UserRole, User, AuthState } from '../types/user';
import { MOCK_STUDENT, MOCK_TEACHER, MOCK_ADMIN } from '../mocks/mockUsers';

interface StoredAuthState {
  role: UserRole;
  user: User;
  isAuthenticated: boolean;
}

const getStoredAuth = (): StoredAuthState => {
  try {
    const saved = localStorage.getItem('utla_auth_session');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // fallback
  }
  return {
    role: 'STUDENT',
    user: MOCK_STUDENT,
    isAuthenticated: true,
  };
};

export const useAuthStore = create<AuthState>((set) => {
  const initial = getStoredAuth();

  return {
    user: initial.user,
    role: initial.role,
    isAuthenticated: initial.isAuthenticated,

    login: (role: UserRole, email?: string) => {
      let user: User = MOCK_STUDENT;
      if (role === 'TEACHER') user = MOCK_TEACHER;
      if (role === 'ADMIN') user = MOCK_ADMIN;

      if (email) {
        user = { ...user, email };
      }

      const newState = {
        role,
        user,
        isAuthenticated: true,
      };

      try {
        localStorage.setItem('utla_auth_session', JSON.stringify(newState));
      } catch (e) {
        console.error(e);
      }

      set(newState);
    },

    logout: () => {
      try {
        localStorage.removeItem('utla_auth_session');
      } catch (e) {
        console.error(e);
      }

      set({
        user: null,
        role: 'STUDENT',
        isAuthenticated: false,
      });
    },

    switchRole: (role: UserRole) => {
      let user: User = MOCK_STUDENT;
      if (role === 'TEACHER') user = MOCK_TEACHER;
      if (role === 'ADMIN') user = MOCK_ADMIN;

      const newState = {
        role,
        user,
        isAuthenticated: true,
      };

      try {
        localStorage.setItem('utla_auth_session', JSON.stringify(newState));
      } catch (e) {
        console.error(e);
      }

      set(newState);
    },
  };
});
