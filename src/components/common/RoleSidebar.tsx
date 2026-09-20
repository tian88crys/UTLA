import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  User,
  BookOpen,
  CheckSquare,
  MessagesSquare,
  Star,
  Mail,
  Folder,
  HelpCircle,
  LogOut,
  Users,
  FileText,
  Megaphone,
  BarChart3,
  Settings,
  GraduationCap,
  Briefcase,
  DollarSign,
  FileCheck,
  FolderArchive,
  ShieldCheck,
  Library,
  ChevronRight,
  ClipboardList
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { UserRole } from '../../types/user';

interface SidebarItem {
  name: string;
  path: string;
  icon: React.ElementType;
  badge?: string;
}

export const RoleSidebar: React.FC = () => {
  const { role, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const studentItems: SidebarItem[] = [
    { name: 'Inicio', path: '/student', icon: Home },
    { name: 'Mi Perfil', path: '/student/profile', icon: User },
    { name: 'Mis Clases', path: '/student/classes', icon: BookOpen },
    { name: 'Tareas', path: '/student/assignments', icon: ClipboardList, badge: '1' },
    { name: 'Foros', path: '/student/forums', icon: MessagesSquare, badge: '2' },
    { name: 'Calificaciones', path: '/student/grades', icon: Star },
    { name: 'Mensajes', path: '/student/messages', icon: Mail, badge: '2' },
    { name: 'Recursos', path: '/student/resources', icon: Folder },
    { name: 'Ayuda', path: '/student/help', icon: HelpCircle },
  ];

  const teacherItems: SidebarItem[] = [
    { name: 'Inicio', path: '/teacher', icon: Home },
    { name: 'Mis Clases', path: '/teacher/classes', icon: BookOpen },
    { name: 'Estudiantes', path: '/teacher/students', icon: Users },
    { name: 'Sílabus Cargados', path: '/teacher/syllabus', icon: FileText },
    { name: 'Anuncios', path: '/teacher/announcements', icon: Megaphone },
    { name: 'Calificaciones y Asistencia', path: '/teacher/grades', icon: CheckSquare, badge: 'CEB103' },
    { name: 'Mensajes', path: '/teacher/messages', icon: Mail, badge: '3' },
    { name: 'Recursos', path: '/teacher/resources', icon: Folder },
    { name: 'Foros', path: '/teacher/forums', icon: MessagesSquare },
    { name: 'Reportes', path: '/teacher/reports', icon: BarChart3 },
    { name: 'Configuración', path: '/teacher/settings', icon: Settings },
    { name: 'Ayuda', path: '/teacher/help', icon: HelpCircle },
  ];

  const adminItems: SidebarItem[] = [
    { name: 'Inicio', path: '/admin', icon: Home },
    { name: 'Usuarios y Roles', path: '/admin/users', icon: Users },
    { name: 'Estudiantes', path: '/admin/students', icon: GraduationCap },
    { name: 'Profesores', path: '/admin/teachers', icon: Briefcase },
    { name: 'Clases y Programas', path: '/admin/programs', icon: BookOpen },
    { name: 'Inscripciones', path: '/admin/enrollments', icon: ClipboardList },
    { name: 'Calificaciones', path: '/admin/grades', icon: Star },
    { name: 'Finanzas', path: '/admin/finances', icon: DollarSign },
    { name: 'Reportes', path: '/admin/reports', icon: BarChart3 },
    { name: 'Transcripciones Oficiales', path: '/admin/transcripts', icon: FileCheck },
    { name: 'Archivos de Estudiantes', path: '/admin/archives', icon: FolderArchive },
    { name: 'Comunicación', path: '/admin/communication', icon: Mail },
    { name: 'Recursos y Biblioteca', path: '/admin/library', icon: Library },
    { name: 'Configuración', path: '/admin/settings', icon: Settings },
    { name: 'Seguridad y Auditoría', path: '/admin/security', icon: ShieldCheck },
    { name: 'Ayuda', path: '/admin/help', icon: HelpCircle },
  ];

  let navItems: SidebarItem[] = studentItems;
  if (role === 'TEACHER') navItems = teacherItems;
  if (role === 'ADMIN') navItems = adminItems;

  return (
    <aside className="w-64 bg-utla-navy text-slate-100 flex-shrink-0 flex flex-col justify-between border-r border-utla-navy-light/60 shadow-lg min-h-[calc(100vh-65px)]">
      <div className="py-4 px-3 space-y-1">
        {/* Role tag pill */}
        <div className="px-3 py-2 mb-3 bg-utla-navy-dark/90 rounded-lg border border-utla-navy-light/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-utla-gold animate-pulse" />
            <span className="text-xs font-bold tracking-wider text-utla-gold uppercase">
              {role === 'STUDENT' ? 'Portal Estudiante' : role === 'TEACHER' ? 'Portal Maestro' : 'Portal Administrador'}
            </span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1 max-h-[calc(100vh-210px)] overflow-y-auto pr-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-utla-gold text-utla-navy-deep font-bold shadow-md shadow-utla-gold/20'
                      : 'text-slate-200 hover:bg-utla-navy-light hover:text-white'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-utla-navy-deep stroke-[2.5]' : 'text-slate-300 group-hover:text-utla-gold'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-utla-navy-deep text-utla-gold'
                        : 'bg-amber-500 text-white shadow-sm'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer logout button */}
      <div className="p-3 border-t border-utla-navy-light/60 bg-utla-navy-dark/60">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-300 hover:text-white hover:bg-rose-950/40 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-4 h-4 text-rose-400 group-hover:rotate-12 transition-transform" />
            <span>Cerrar Sesión</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 opacity-50 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </aside>
  );
};
