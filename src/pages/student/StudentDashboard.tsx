import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  CalendarCheck,
  CreditCard,
  FileText,
  FileCheck,
  Calendar,
  ChevronRight,
  ExternalLink,
  Library,
  HelpCircle,
  FolderOpen,
  MessageSquareQuote
} from 'lucide-react';
import { INSTITUTIONAL_ANNOUNCEMENTS, UPCOMING_EVENTS } from '../../mocks/academicData';
import { useAuthStore } from '../../store/useAuthStore';

export const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 cols: Announcements & Quick Access Action Cards */}
        <div className="lg:col-span-8 space-y-6">
          {/* ANUNCIOS IMPORTANTES */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-utla-navy/10 flex items-center justify-center text-utla-navy">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h2 className="font-black text-sm text-utla-navy uppercase tracking-wider">
                  ANUNCIOS IMPORTANTES
                </h2>
              </div>
              <button
                type="button"
                className="text-xs font-bold text-utla-navy hover:text-utla-gold transition-colors flex items-center gap-1"
              >
                <span>Ver todos</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {INSTITUTIONAL_ANNOUNCEMENTS.slice(0, 3).map((ann) => (
                <div
                  key={ann.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h3 className="font-bold text-xs text-slate-900">{ann.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{ann.description}</p>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs">
                    {ann.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* QUICK ACTION CARDS (Mockup 3 bottom-left) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* VER CATÁLOGO DE CLASES */}
              <div className="rounded-2xl border-2 border-slate-200 p-5 flex flex-col justify-between items-center text-center hover:border-utla-navy transition-all shadow-sm group">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-utla-navy group-hover:scale-105 transition-transform mb-3">
                  <BookOpen className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xs text-utla-navy uppercase tracking-wide">
                    VER CATÁLOGO DE CLASES
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">
                    Explora los cursos y programas teológicos disponibles.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/student/classes')}
                  className="mt-4 w-full py-2 bg-utla-navy text-white text-xs font-bold rounded-lg hover:bg-utla-navy-light transition-colors"
                >
                  Ver Catálogo
                </button>
              </div>

              {/* INSCRIBIRSE EN CLASES */}
              <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/20 p-5 flex flex-col justify-between items-center text-center hover:border-utla-gold transition-all shadow-sm group">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800 group-hover:scale-105 transition-transform mb-3">
                  <CalendarCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xs text-amber-900 uppercase tracking-wide">
                    INSCRIBIRSE EN CLASES
                  </h3>
                  <p className="text-[11px] text-slate-600 mt-1.5 leading-snug">
                    Regístrate para los cursos del próximo semestre.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/student/classes')}
                  className="mt-4 w-full py-2 bg-utla-gold text-utla-navy font-black text-xs rounded-lg hover:bg-amber-400 transition-colors shadow-sm"
                >
                  Inscribirse
                </button>
              </div>

              {/* PAGAR CLASES */}
              <div className="rounded-2xl border-2 border-slate-200 p-5 flex flex-col justify-between items-center text-center hover:border-utla-navy transition-all shadow-sm group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-900 group-hover:scale-105 transition-transform mb-3">
                  <CreditCard className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xs text-utla-navy uppercase tracking-wide">
                    PAGAR CLASES
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">
                    Realiza tu pago de matrícula y materias de forma segura.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Módulo de Pagos UTLA: Tu saldo pendiente es de $150.00 USD.')}
                  className="mt-4 w-full py-2 bg-utla-navy text-white text-xs font-bold rounded-lg hover:bg-utla-navy-light transition-colors"
                >
                  Pagar Ahora
                </button>
              </div>
            </div>

            {/* Row 2: ENTRAR A CLASE & TRANSCRIPCIÓN NO OFICIAL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* ENTRAR A CLASE */}
              <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/20 p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 flex-shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xs text-amber-900 uppercase">
                      ENTRAR A CLASE
                    </h3>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Accede a tus clases en línea, materiales y actividades del curso.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/student/profile')}
                  className="px-4 py-2 bg-utla-gold text-utla-navy font-bold text-xs rounded-lg hover:bg-amber-400 whitespace-nowrap"
                >
                  Entrar a Clase
                </button>
              </div>

              {/* TRANSCRIPCIÓN NO OFICIAL */}
              <div className="rounded-2xl border-2 border-slate-200 p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-utla-navy flex-shrink-0">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xs text-utla-navy uppercase">
                      TRANSCRIPCIÓN NO OFICIAL
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Ver y descargar tu transcripción académica no oficial.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/student/profile')}
                  className="px-4 py-2 bg-utla-navy text-white font-bold text-xs rounded-lg hover:bg-utla-navy-light whitespace-nowrap"
                >
                  Ver Transcripción
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 cols: Profile Card, Upcoming Events, Quick Links */}
        <div className="lg:col-span-4 space-y-6">
          {/* MI PERFIL CARD */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle">
            <h2 className="font-black text-xs text-slate-500 uppercase tracking-wider mb-4">
              MI PERFIL
            </h2>
            <div className="flex items-center gap-4">
              <img
                src={user?.avatarUrl}
                alt={user?.name}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-utla-gold/30 shadow-sm"
              />
              <div className="space-y-0.5">
                <h3 className="font-extrabold text-sm text-slate-900">{user?.name}</h3>
                <p className="text-xs text-slate-500 font-mono">ID: {user?.studentId}</p>
                <p className="text-xs text-utla-gold font-semibold leading-snug">
                  Programa: {user?.program}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate('/student/profile')}
              className="mt-4 w-full py-2 border border-slate-200 rounded-xl text-xs font-bold text-utla-navy hover:bg-slate-50 flex items-center justify-center gap-1 transition-colors"
            >
              <span>Ver mi perfil</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* PRÓXIMOS EVENTOS */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle">
            <h2 className="font-black text-xs text-slate-500 uppercase tracking-wider mb-4">
              PRÓXIMOS EVENTOS
            </h2>
            <div className="space-y-3">
              {UPCOMING_EVENTS.map((evt) => (
                <div key={evt.id} className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center flex-shrink-0 text-center">
                    <span className="text-[10px] font-black uppercase text-utla-navy leading-none">
                      {evt.month}
                    </span>
                    <span className="text-base font-black text-slate-900 leading-none mt-0.5">
                      {evt.day}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-slate-900">{evt.title}</h3>
                    <p className="text-[11px] text-slate-500">{evt.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-4 w-full text-center text-xs font-bold text-utla-navy hover:underline block"
            >
              Ver calendario completo &gt;
            </button>
          </div>

          {/* ENLACES RÁPIDOS */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle">
            <h2 className="font-black text-xs text-slate-500 uppercase tracking-wider mb-4">
              ENLACES RÁPIDOS
            </h2>
            <div className="divide-y divide-slate-100 text-xs font-semibold">
              <a
                href="#biblioteca"
                onClick={(e) => { e.preventDefault(); alert('Accediendo a Biblioteca Teológica Digital UTLA...'); }}
                className="flex items-center justify-between py-3 hover:text-utla-gold transition-colors"
              >
                <div className="flex items-center gap-2.5 text-slate-700">
                  <Library className="w-4 h-4 text-utla-navy" />
                  <span>Biblioteca en línea</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>

              <a
                href="#recursos"
                onClick={(e) => { e.preventDefault(); alert('Accediendo a Centro de Recursos Académicos...'); }}
                className="flex items-center justify-between py-3 hover:text-utla-gold transition-colors"
              >
                <div className="flex items-center gap-2.5 text-slate-700">
                  <FolderOpen className="w-4 h-4 text-utla-navy" />
                  <span>Centro de Recursos</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>

              <a
                href="#soporte"
                onClick={(e) => { e.preventDefault(); alert('Soporte Técnico UTLA: soporte@myutla.org'); }}
                className="flex items-center justify-between py-3 hover:text-utla-gold transition-colors"
              >
                <div className="flex items-center gap-2.5 text-slate-700">
                  <HelpCircle className="w-4 h-4 text-utla-navy" />
                  <span>Soporte Técnico</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>

              <a
                href="#faq"
                onClick={(e) => { e.preventDefault(); alert('Preguntas Frecuentes y Guía del Estudiante UTLA'); }}
                className="flex items-center justify-between py-3 hover:text-utla-gold transition-colors"
              >
                <div className="flex items-center gap-2.5 text-slate-700">
                  <MessageSquareQuote className="w-4 h-4 text-utla-navy" />
                  <span>Preguntas Frecuentes</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
