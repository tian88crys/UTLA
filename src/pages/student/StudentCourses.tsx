import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Calendar, Clock, User, ArrowRight, Download } from 'lucide-react';
import { STUDENT_ACTIVE_COURSE } from '../../mocks/academicData';

export const StudentCourses: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-utla-navy font-serif">Mis Clases &amp; Cursos</h1>
          <p className="text-xs text-slate-500 mt-0.5">Semestre Académico Primavera 2026</p>
        </div>
        <button
          type="button"
          onClick={() => alert('Descargando comprobante de matrícula PDF...')}
          className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
        >
          <Download className="w-4 h-4" />
          <span>Comprobante de Inscripción</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Course Card */}
        <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-black font-mono">
                {STUDENT_ACTIVE_COURSE.code}
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold">
                En Curso
              </span>
            </div>

            <h3 className="font-extrabold text-base text-utla-navy mb-2">
              {STUDENT_ACTIVE_COURSE.name}
            </h3>

            <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
              <p className="flex items-center gap-2">
                <User className="w-4 h-4 text-utla-gold" />
                <span>Profesor: <strong>{STUDENT_ACTIVE_COURSE.professor}</strong></span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-utla-gold" />
                <span>Horario: <strong>{STUDENT_ACTIVE_COURSE.schedule}</strong></span>
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-utla-gold" />
                <span>Periodo: <strong>{STUDENT_ACTIVE_COURSE.term}</strong></span>
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
              <span>Progreso</span>
              <span className="text-emerald-600">{STUDENT_ACTIVE_COURSE.progress}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${STUDENT_ACTIVE_COURSE.progress}%` }} />
            </div>

            <button
              type="button"
              onClick={() => navigate('/student/profile')}
              className="w-full py-2.5 bg-utla-navy text-white text-xs font-bold rounded-xl hover:bg-utla-navy-light flex items-center justify-center gap-2 transition-colors"
            >
              <span>Entrar al Aula Virtual</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
