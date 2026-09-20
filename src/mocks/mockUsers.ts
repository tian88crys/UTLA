import { User } from '../types/user';

export const MOCK_STUDENT: User = {
  id: 'usr-student-001',
  name: 'Juan Carlos López',
  email: 'j.lopez@estudiantes.myutla.org',
  role: 'STUDENT',
  studentId: 'UTLA-2025-12345',
  program: 'Licenciatura en Teología',
  semester: '1er Semestre',
  status: 'Activo',
  lastAccess: 'Hoy, 10:15 AM',
  phone: '+1 (555) 349-8120',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
};

export const MOCK_TEACHER: User = {
  id: 'usr-teacher-001',
  name: 'Dr. Juan Pérez',
  email: 'juan.perez@docentes.myutla.org',
  role: 'TEACHER',
  studentId: 'DOC-99210',
  program: 'Facultad de Estudios Bíblicos y Teología Sistemática',
  status: 'Activo',
  lastAccess: 'Hoy, 09:40 AM',
  phone: '+1 (555) 782-4190',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
};

export const MOCK_ADMIN: User = {
  id: 'usr-admin-001',
  name: 'Super Usuario',
  email: 'rectoria@myutla.org',
  role: 'ADMIN',
  studentId: 'ADM-001',
  program: 'Rectoría & Vicerrectoría Académica UTLA',
  status: 'Activo',
  lastAccess: 'En línea',
  phone: '+1 (555) 100-2000',
  avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
};
