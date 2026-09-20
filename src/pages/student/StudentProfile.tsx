import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Camera,
  BookOpen,
  Calendar,
  CheckCircle,
  FileText,
  ClipboardList,
  MessagesSquare,
  Award,
  CreditCard,
  Printer,
  ArrowRight,
  Mail,
  User,
  ExternalLink
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { STUDENT_ACTIVE_COURSE } from '../../mocks/academicData';

export const StudentProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      {/* Top Welcome Title & Scripture */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle">
        <h1 className="text-xl sm:text-2xl font-black text-utla-navy font-serif">
          Bienvenido, {user?.name}
        </h1>
        <p className="text-xs text-slate-500 italic mt-1 font-serif">
          "Pero tú, sigue tú lo que has aprendido y te persuadiste, sabiendo de quién has aprendido;
          y que desde la niñez has sabido las Sagradas Escrituras..."{' '}
          <span className="font-semibold text-utla-gold not-italic">2 Timoteo 3:14-15</span>
        </p>
      </div>

      {/* Student Profile Card matching Mockup 4 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Avatar and upload photo */}
          <div className="md:col-span-3 flex flex-col items-center text-center">
            <div className="relative">
              <img
                src={user?.avatarUrl}
                alt={user?.name}
                className="w-28 h-28 rounded-2xl object-cover ring-4 ring-utla-gold/30 shadow-md"
              />
              <button
                type="button"
                onClick={() => alert('Simulación: Seleccione una foto de su dispositivo.')}
                className="absolute -bottom-2 -right-2 p-2 bg-utla-navy text-white rounded-xl hover:bg-utla-navy-light shadow-md transition-all"
                title="Cambiar foto de perfil"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => alert('Subir foto')}
              className="mt-4 text-xs font-bold text-utla-navy flex items-center gap-1 hover:underline"
            >
              <span>Subir Foto</span>
            </button>
          </div>

          {/* Student Info Details */}
          <div className="md:col-span-6 space-y-3">
            <div>
              <h2 className="text-lg font-black text-slate-900">{user?.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                  Estudiante
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  Código Estudiante: <strong>77321113</strong>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-100">
              <div>
                <span className="text-slate-400 block text-[11px] uppercase font-semibold">
                  Programa:
                </span>
                <span className="font-bold text-slate-800">Licenciatura en Teología</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px] uppercase font-semibold">
                  Nivel:
                </span>
                <span className="font-bold text-slate-800">1er Semestre</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px] uppercase font-semibold">
                  Estado:
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Activo
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px] uppercase font-semibold">
                  Fecha de Inicio:
                </span>
                <span className="font-bold text-slate-800">02/20/2026</span>
              </div>
            </div>
          </div>

          {/* Right mini announcements banner */}
          <div className="md:col-span-3 bg-blue-900/90 text-white rounded-2xl p-5 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-utla-gold text-xs font-bold uppercase">
              <span>Anuncios Importantes</span>
            </div>
            <h3 className="font-black text-sm text-white">Retiro Espiritual 2026</h3>
            <p className="text-xs text-slate-200 leading-snug">
              Aparta la fecha del 15 al 17 de mayo. Campamento de renovación ministerial y oración.
            </p>
            <button
              type="button"
              className="text-[11px] font-bold text-utla-gold hover:underline flex items-center gap-1 pt-1"
            >
              <span>Ver más anuncios</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Key Academic Metrics & Statuses (matching Mockup 4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Curso Inscrito */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase">Curso Inscrito</span>
              <h3 className="text-2xl font-black text-utla-navy mt-1">1</h3>
              <p className="text-[11px] text-slate-600 mt-1">Curso Actual Activo</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-utla-navy flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/student/classes')}
            className="mt-3 text-xs font-bold text-utla-navy hover:underline flex items-center gap-1"
          >
            <span>Ver detalle</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Maestro */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase">Maestro</span>
              <h3 className="text-sm font-black text-slate-900 mt-1">Pr. Luis A. Rentería</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">luis.renteria@utla.edu</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
          </div>
          <button
            type="button"
            onClick={() => alert('Enviar correo a: luis.renteria@utla.edu')}
            className="mt-3 text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
          >
            <span>Enviar mensaje</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Sílabo */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase">Sílabo</span>
              <h3 className="text-xs font-black text-slate-900 mt-1">CB103 - Introducción al N.T.</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Versión 2026 descargable</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <button
            type="button"
            onClick={() => alert('Descargando Sílabo oficial CB103 PDF...')}
            className="mt-3 text-xs font-bold text-purple-700 hover:underline flex items-center gap-1"
          >
            <span>Ver sílabo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tareas */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase">Tareas</span>
              <h3 className="text-2xl font-black text-amber-600 mt-1">1</h3>
              <p className="text-[11px] text-slate-600 mt-1">Tarea pendiente por entregar</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ClipboardList className="w-5 h-5" />
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/student/assignments')}
            className="mt-3 text-xs font-bold text-amber-700 hover:underline flex items-center gap-1"
          >
            <span>Ver tareas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Foros */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase">Foros</span>
              <h3 className="text-2xl font-black text-rose-600 mt-1">2</h3>
              <p className="text-[11px] text-slate-600 mt-1">Nuevas publicaciones</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <MessagesSquare className="w-5 h-5" />
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/student/forums')}
            className="mt-3 text-xs font-bold text-rose-700 hover:underline flex items-center gap-1"
          >
            <span>Ir a foros</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Calificaciones */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase">Calificaciones</span>
              <h3 className="text-2xl font-black text-blue-900 mt-1">78.34</h3>
              <p className="text-[11px] text-slate-600 mt-1">Promedio General</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/student/grades')}
            className="mt-3 text-xs font-bold text-blue-900 hover:underline flex items-center gap-1"
          >
            <span>Ver calificaciones</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Pagar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase">Pagar</span>
              <h3 className="text-xl font-black text-emerald-700 mt-1">$150.00 USD</h3>
              <p className="text-[11px] text-slate-600 mt-1">Saldo Pendiente</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <button
            type="button"
            onClick={() => alert('Pasarela de pago UTLA: Saldo pendiente $150.00 USD.')}
            className="mt-3 text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
          >
            <span>Ir a pagos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Transcripciones No-Oficial */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase">Transcripción</span>
              <h3 className="text-xs font-black text-slate-900 mt-1">No-Oficial</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Descargue e imprima su reporte</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Printer className="w-5 h-5" />
            </div>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="mt-3 text-xs font-bold text-slate-700 hover:underline flex items-center gap-1"
          >
            <span>Imprimir ahora</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Curso Actual (Mockup 4 bottom) */}
      <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-subtle">
        <h2 className="font-extrabold text-sm text-utla-navy uppercase tracking-wider mb-4">
          Curso Actual
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-utla-navy text-utla-gold flex items-center justify-center flex-shrink-0 shadow-sm">
              <BookOpen className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="font-black text-base text-utla-navy">
                {STUDENT_ACTIVE_COURSE.code} - {STUDENT_ACTIVE_COURSE.name}
              </h3>
              <p className="text-xs text-slate-600">
                Profesor: <strong className="text-slate-800">{STUDENT_ACTIVE_COURSE.professor}</strong>
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <span>Periodo: <strong className="text-slate-700">{STUDENT_ACTIVE_COURSE.term}</strong></span>
                <span>•</span>
                <span>Día y Hora: <strong className="text-slate-700">{STUDENT_ACTIVE_COURSE.schedule}</strong></span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Progreso del Curso</span>
              <span className="text-emerald-700 font-black">{STUDENT_ACTIVE_COURSE.progress}%</span>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${STUDENT_ACTIVE_COURSE.progress}%` }}
              />
            </div>
            <button
              type="button"
              onClick={() => alert(`Accediendo al aula virtual de: ${STUDENT_ACTIVE_COURSE.name}`)}
              className="mt-2 w-full py-2 bg-utla-navy text-white text-xs font-bold rounded-lg hover:bg-utla-navy-light flex items-center justify-center gap-2 transition-colors"
            >
              <span>Ir al curso</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
