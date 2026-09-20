import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, LogOut, UserCheck, Shield, BookOpen, GraduationCap } from 'lucide-react';
import { UtlaLogo } from './UtlaLogo';
import { useAuthStore } from '../../store/useAuthStore';
import { UserRole } from '../../types/user';

interface InstitutionalHeaderProps {
  bannerTitle?: string;
  subBanner?: string;
  showRoleSwitcher?: boolean;
}

export const InstitutionalHeader: React.FC<InstitutionalHeaderProps> = ({
  bannerTitle,
  subBanner,
  showRoleSwitcher = true,
}) => {
  const navigate = useNavigate();
  const { user, role, switchRole, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  // Role display title and banner
  const roleDisplayMap = {
    STUDENT: {
      roleTitle: 'Estudiante',
      portalBanner: 'PORTAL: ESTUDIANTIL',
      badgeColor: 'bg-utla-gold text-utla-navy-dark',
      icon: GraduationCap,
      badgeCount: 3,
    },
    TEACHER: {
      roleTitle: 'Profesor',
      portalBanner: 'PORTAL: MAESTRO',
      badgeColor: 'bg-amber-500 text-white',
      icon: BookOpen,
      badgeCount: 4,
    },
    ADMIN: {
      roleTitle: 'Administrador',
      portalBanner: 'PORTAL: ADMINISTRATIVO',
      badgeColor: 'bg-emerald-500 text-white',
      icon: Shield,
      badgeCount: 8,
    },
  };

  const currentRoleInfo = roleDisplayMap[role];
  const displayBanner = bannerTitle || currentRoleInfo.portalBanner;

  const handleRoleChange = (newRole: UserRole) => {
    switchRole(newRole);
    setMenuOpen(false);
    if (newRole === 'STUDENT') navigate('/student');
    else if (newRole === 'TEACHER') navigate('/teacher');
    else if (newRole === 'ADMIN') navigate('/admin');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-utla-navy text-white border-b-2 border-utla-gold/50 shadow-md relative z-40 select-none">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div
          onClick={() => {
            if (role === 'STUDENT') navigate('/student');
            else if (role === 'TEACHER') navigate('/teacher');
            else navigate('/admin');
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <UtlaLogo size="md" showText={true} textColor="white" subtextColor="gold" />
        </div>

        {/* Center: Bright Golden Yellow Portal Banner (Focal institutional identity) */}
        <div className="hidden lg:flex flex-col items-center justify-center">
          <div className="bg-gradient-to-r from-utla-gold/20 via-utla-gold/10 to-utla-gold/20 px-6 py-1.5 rounded-lg border border-utla-gold/40 shadow-inner">
            <span className="text-xl xl:text-2xl font-black tracking-widest text-[#FFE169] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] font-sans">
              {displayBanner}
            </span>
          </div>
          {subBanner && (
            <span className="text-[11px] font-medium text-slate-300 mt-0.5 tracking-wide">
              {subBanner}
            </span>
          )}
        </div>

        {/* Right: User details, Notifications, Role Switcher */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Quick Role Switcher Pills (Lead Architect feature to easily test all 3 personas) */}
          {showRoleSwitcher && (
            <div className="hidden md:flex items-center bg-utla-navy-dark/90 p-1 rounded-lg border border-utla-navy-light text-xs font-semibold">
              <button
                type="button"
                onClick={() => handleRoleChange('STUDENT')}
                className={`px-2.5 py-1 rounded transition-all ${
                  role === 'STUDENT'
                    ? 'bg-utla-gold text-utla-navy-deep font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Cambiar a vista de Estudiante"
              >
                Estudiante
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange('TEACHER')}
                className={`px-2.5 py-1 rounded transition-all ${
                  role === 'TEACHER'
                    ? 'bg-utla-gold text-utla-navy-deep font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Cambiar a vista de Profesor"
              >
                Profesor
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange('ADMIN')}
                className={`px-2.5 py-1 rounded transition-all ${
                  role === 'ADMIN'
                    ? 'bg-utla-gold text-utla-navy-deep font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Cambiar a vista de Administrador"
              >
                Admin
              </button>
            </div>
          )}

          {/* Notifications Bell */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 rounded-full hover:bg-utla-navy-light text-slate-200 hover:text-white transition-colors focus:outline-none"
              aria-label="Ver notificaciones"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center ring-2 ring-utla-navy animate-pulse">
                {currentRoleInfo.badgeCount}
              </span>
            </button>

            {/* Notification Dropdown */}
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white text-slate-800 rounded-xl shadow-elevated border border-slate-200 overflow-hidden z-50">
                <div className="bg-utla-navy text-white px-4 py-3 flex items-center justify-between">
                  <span className="font-semibold text-sm">Notificaciones ({currentRoleInfo.badgeCount})</span>
                  <span className="text-[11px] text-utla-gold font-medium cursor-pointer hover:underline">
                    Marcar leídas
                  </span>
                </div>
                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  <div className="p-3 text-xs hover:bg-slate-50 transition-colors">
                    <p className="font-semibold text-slate-900">Período de inscripción Verano 2025</p>
                    <p className="text-slate-600 mt-0.5">Las inscripciones cierran el 30 de mayo.</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">Hace 2 horas</span>
                  </div>
                  <div className="p-3 text-xs hover:bg-slate-50 transition-colors">
                    <p className="font-semibold text-slate-900">Recordatorio de Clases</p>
                    <p className="text-slate-600 mt-0.5">Nueva asignación cargada en el portal.</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">Ayer</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Info & Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-3 p-1 rounded-lg hover:bg-utla-navy-light/60 transition-colors focus:outline-none text-left"
            >
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs text-slate-300 font-medium">
                  Hola, {currentRoleInfo.roleTitle}
                </span>
                <span className="text-sm font-bold text-white leading-tight">
                  {user?.name || 'Usuario UTLA'}
                </span>
              </div>
              <div className="relative">
                <img
                  src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-utla-gold shadow-sm"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-utla-navy" />
              </div>
              <ChevronDown className="w-4 h-4 text-slate-300" />
            </button>

            {/* User Dropdown */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-slate-800 rounded-xl shadow-elevated border border-slate-200 overflow-hidden z-50">
                <div className="p-4 bg-slate-50 border-b border-slate-200">
                  <p className="text-xs font-semibold text-utla-gold uppercase tracking-wider">
                    {currentRoleInfo.roleTitle} UTLA
                  </p>
                  <p className="font-bold text-slate-900 mt-0.5">{user?.name}</p>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                  {user?.studentId && (
                    <span className="inline-block mt-2 px-2 py-0.5 bg-utla-navy/10 text-utla-navy font-mono text-[11px] rounded font-semibold">
                      ID: {user.studentId}
                    </span>
                  )}
                </div>

                <div className="p-2">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase text-slate-400">
                    Cambiar Perfil de Acceso
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRoleChange('STUDENT')}
                    className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-slate-100 flex items-center gap-2 font-medium"
                  >
                    <GraduationCap className="w-4 h-4 text-utla-navy" /> Portal Estudiante
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleChange('TEACHER')}
                    className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-slate-100 flex items-center gap-2 font-medium"
                  >
                    <BookOpen className="w-4 h-4 text-utla-navy" /> Portal Profesor
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleChange('ADMIN')}
                    className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-slate-100 flex items-center gap-2 font-medium"
                  >
                    <Shield className="w-4 h-4 text-utla-navy" /> Portal Administrador
                  </button>
                </div>

                <div className="p-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-xs text-red-600 rounded-lg hover:bg-red-50 flex items-center gap-2 font-semibold"
                  >
                    <LogOut className="w-4 h-4" /> Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
