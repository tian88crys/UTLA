import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Landmark, Presentation, GraduationCap, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { UserRole } from '../../types/user';
import { UtlaLogo } from '../../components/common/UtlaLogo';

export const PortalSelector: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSelectRole = (role: UserRole) => {
    login(role);
    if (role === 'STUDENT') navigate('/student');
    else if (role === 'TEACHER') navigate('/teacher');
    else if (role === 'ADMIN') navigate('/admin');
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 text-center">
      {/* Brand Header */}
      <div className="flex flex-col items-center justify-center mb-8">
        <UtlaLogo size="xl" showText={true} textColor="white" subtextColor="gold" className="justify-center" />
        <div className="mt-6 inline-block bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-utla-navy-deep px-6 py-2 rounded-xl font-black text-2xl md:text-3xl tracking-wider shadow-xl">
          PORTAL: myutla.org
        </div>
        <p className="text-slate-300 text-sm mt-3 max-w-lg">
          Selecciona el portal correspondiente a tu perfil académico o administrativo para ingresar al sistema.
        </p>
      </div>

      {/* 3 Portal Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {/* Administrador */}
        <div
          onClick={() => handleSelectRole('ADMIN')}
          className="cursor-pointer group bg-white/95 hover:bg-white rounded-2xl p-6 sm:p-8 border-2 border-slate-200 hover:border-utla-gold transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between"
        >
          <div>
            <div className="w-16 h-16 rounded-2xl bg-utla-navy/10 flex items-center justify-center text-utla-navy mb-5 group-hover:scale-110 transition-transform">
              <Landmark className="w-9 h-9" />
            </div>
            <span className="text-xs font-bold text-utla-gold uppercase tracking-wider">
              Gestión Institucional
            </span>
            <h3 className="font-black text-xl text-utla-navy uppercase mt-1">
              ADMINISTRACIÓN
            </h3>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              Gestiona instituciones, usuarios, nóminas, cursos, inscripciones, reportes financieros y auditoría del sistema.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between font-bold text-xs text-utla-navy group-hover:text-utla-gold transition-colors">
            <span>Acceder al Portal</span>
            <div className="w-8 h-8 rounded-full bg-utla-navy text-white flex items-center justify-center group-hover:bg-utla-gold group-hover:text-utla-navy-deep transition-all">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Profesores */}
        <div
          onClick={() => handleSelectRole('TEACHER')}
          className="cursor-pointer group bg-white/95 hover:bg-white rounded-2xl p-6 sm:p-8 border-2 border-slate-200 hover:border-utla-gold transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between"
        >
          <div>
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-700 mb-5 group-hover:scale-110 transition-transform">
              <Presentation className="w-9 h-9" />
            </div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Cátedra & Docencia
            </span>
            <h3 className="font-black text-xl text-amber-800 uppercase mt-1">
              PROFESORES
            </h3>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              Gestiona tus clases asignadas, toma de asistencia diaria, matriz de calificaciones, carga de sílabos y foros de discusión.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between font-bold text-xs text-amber-800 group-hover:text-amber-600 transition-colors">
            <span>Acceder al Portal</span>
            <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center group-hover:bg-amber-600 transition-all">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Estudiantes */}
        <div
          onClick={() => handleSelectRole('STUDENT')}
          className="cursor-pointer group bg-white/95 hover:bg-white rounded-2xl p-6 sm:p-8 border-2 border-slate-200 hover:border-utla-gold transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between"
        >
          <div>
            <div className="w-16 h-16 rounded-2xl bg-blue-900/10 flex items-center justify-center text-blue-900 mb-5 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-9 h-9" />
            </div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Vida Académica
            </span>
            <h3 className="font-black text-xl text-utla-navy uppercase mt-1">
              ESTUDIANTES
            </h3>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              Accede a tus cursos matriculados, materiales didácticos, tareas semanales, calificaciones y transcripciones académicas.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between font-bold text-xs text-utla-navy group-hover:text-blue-700 transition-colors">
            <span>Acceder al Portal</span>
            <div className="w-8 h-8 rounded-full bg-utla-navy text-white flex items-center justify-center group-hover:bg-utla-navy-light transition-all">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white underline"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>O ingresa mediante el Formulario Tradicional de Credenciales</span>
        </button>
      </div>
    </div>
  );
};
