import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Calendar,
  Users,
  FileText,
  CheckSquare,
  MessagesSquare,
  HelpCircle,
  Clock,
  Mail,
  ChevronRight,
  ClipboardList,
  PenTool,
  Award,
  Plus
} from 'lucide-react';
import {
  INSTITUTIONAL_ANNOUNCEMENTS,
  TEACHER_UPCOMING_ACTIVITIES,
  TEACHER_CLASSES
} from '../../mocks/academicData';
import { useAuthStore } from '../../store/useAuthStore';

export const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const teacherAnnouncements = INSTITUTIONAL_ANNOUNCEMENTS.filter(
    (a) => a.targetRole === 'TEACHER' || a.targetRole === 'ALL'
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Announcements, My Classes Grid, Quick Access */}
        <div className="lg:col-span-8 space-y-6">
          {/* ANUNCIOS IMPORTANTES */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-700">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h2 className="font-black text-sm text-slate-900 uppercase tracking-wider">
                  ANUNCIOS IMPORTANTES
                </h2>
              </div>
              <button
                type="button"
                className="text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors flex items-center gap-1"
              >
                <span>Ver todos</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {teacherAnnouncements.slice(0, 3).map((ann) => (
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

          {/* MIS CLASES ACTUALES (Mockup 5) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h2 className="font-black text-sm text-utla-navy uppercase tracking-wider">
                MIS CLASES ACTUALES
              </h2>
              <span className="text-xs text-slate-500 font-semibold">
                Semestre Primavera 2026
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TEACHER_CLASSES.map((cls, idx) => {
                const isGold = idx % 2 !== 0;
                return (
                  <div
                    key={cls.id}
                    className="p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-utla-navy transition-all shadow-sm flex flex-col justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 ${
                          isGold ? 'bg-amber-100 text-amber-800' : 'bg-utla-navy/10 text-utla-navy'
                        }`}
                      >
                        {cls.code.startsWith('THEO') ? '✝' : '📖'}
                      </div>
                      <div className="space-y-0.5">
                        <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
                          {cls.name}
                        </h3>
                        <p className="text-xs font-mono font-bold text-utla-gold">{cls.code}</p>
                        <p className="text-xs text-slate-500">
                          Estudiantes: <strong>{cls.studentsCount}</strong>
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate('/teacher/grades')}
                      className={`mt-4 w-full py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                        isGold
                          ? 'bg-utla-gold text-utla-navy-deep hover:bg-amber-400'
                          : 'bg-utla-navy text-white hover:bg-utla-navy-light'
                      }`}
                    >
                      <span>Ver Clase</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SÍLABUS CARGADOS & ACCESO RÁPIDO */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* SÍLABUS CARGADOS */}
            <div className="md:col-span-5 bg-white rounded-2xl p-5 border-2 border-slate-200 shadow-subtle flex flex-col justify-between">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-utla-navy text-white flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xs text-utla-navy uppercase">
                    SÍLABUS CARGADOS
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Consulta y administra los sílabus que has subido a la plataforma académica.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate('/teacher/grades')}
                className="mt-4 w-full py-2 bg-utla-navy text-white text-xs font-bold rounded-xl hover:bg-utla-navy-light transition-colors"
              >
                Ver Mis Sílabus
              </button>
            </div>

            {/* ACCESO RÁPIDO */}
            <div className="md:col-span-7 bg-white rounded-2xl p-5 border-2 border-slate-200 shadow-subtle">
              <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider mb-3">
                ACCESO RÁPIDO
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center">
                {[
                  { name: 'Tomar Asistencia', icon: CheckSquare, path: '/teacher/grades' },
                  { name: 'Tareas', icon: ClipboardList, path: '/teacher/grades' },
                  { name: 'Foros', icon: MessagesSquare, path: '/teacher/grades' },
                  { name: 'Exámenes', icon: FileText, path: '/teacher/grades' },
                  { name: 'Proyectos', icon: PenTool, path: '/teacher/grades' },
                  { name: 'Calificaciones', icon: Award, path: '/teacher/grades' },
                ].map((act, i) => {
                  const Icon = act.icon;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => navigate(act.path)}
                      className="p-2.5 rounded-xl border border-slate-200 hover:border-utla-gold hover:bg-amber-50/40 transition-all flex flex-col items-center justify-center gap-1.5 group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-utla-gold group-hover:text-utla-navy-deep transition-all">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-700 leading-tight">
                        {act.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Upcoming Activities & Recent Messages */}
        <div className="lg:col-span-4 space-y-6">
          {/* PRÓXIMAS ACTIVIDADES */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle">
            <h2 className="font-black text-xs text-slate-500 uppercase tracking-wider mb-4">
              PRÓXIMAS ACTIVIDADES
            </h2>
            <div className="space-y-3">
              {TEACHER_UPCOMING_ACTIVITIES.map((act) => (
                <div key={act.id} className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center flex-shrink-0 text-center">
                    <span className="text-[10px] font-black uppercase text-utla-navy leading-none">
                      {act.month}
                    </span>
                    <span className="text-base font-black text-slate-900 leading-none mt-0.5">
                      {act.day}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-slate-900">{act.title}</h3>
                    <p className="text-[11px] text-slate-500 leading-tight">{act.time}</p>
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

          {/* MENSAJES RECIENTES */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle">
            <h2 className="font-black text-xs text-slate-500 uppercase tracking-wider mb-4">
              MENSAJES RECIENTES
            </h2>
            <div className="space-y-3">
              {[
                { name: 'María López', initial: 'M', text: 'Consulta sobre el ensayo final de Hermenéutica.', time: 'Hace 1 hora', bg: 'bg-blue-100 text-blue-800' },
                { name: 'Carlos Ramírez', initial: 'C', text: 'Pregunta sobre la entrega de la tarea 2.', time: 'Hace 3 horas', bg: 'bg-emerald-100 text-emerald-800' },
                { name: 'Ana Torres', initial: 'A', text: 'Gracias por la retroalimentación del examen.', time: 'Hace 5 horas', bg: 'bg-amber-100 text-amber-800' },
              ].map((msg, i) => (
                <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className={`w-9 h-9 rounded-full ${msg.bg} flex items-center justify-center font-bold text-xs flex-shrink-0`}>
                    {msg.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-slate-900 truncate">{msg.name}</h4>
                      <span className="text-[10px] text-slate-400">{msg.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 truncate mt-0.5">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-4 w-full text-center text-xs font-bold text-utla-navy hover:underline block"
            >
              Ver todos los mensajes &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
