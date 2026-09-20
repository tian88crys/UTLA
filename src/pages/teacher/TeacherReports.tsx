import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  AlertTriangle,
  Printer,
  Download,
  CheckCircle2,
  Users,
  Clock,
  Calendar,
  BookOpen,
  Filter,
  Mail,
  ChevronRight
} from 'lucide-react';
import { TEACHER_CLASSES, ALL_TEACHER_CLASSES_DATA } from '../../mocks/academicData';

export const TeacherReports: React.FC = () => {
  const [selectedTerm, setSelectedTerm] = useState('Primavera 2026');

  const performanceByCourse = [
    { code: 'CEB103', name: 'Intro. Nuevo Testamento', students: 12, avg: 78.34, passRate: '83%', attend: '88%' },
    { code: 'THEO-201', name: 'Hermenéutica Bíblica', students: 10, avg: 88.40, passRate: '100%', attend: '94%' },
    { code: 'THEO-301', name: 'Teología Sistemática I', students: 8, avg: 91.30, passRate: '100%', attend: '96%' },
    { code: 'MIN-210', name: 'Ministerio Pastoral', students: 7, avg: 90.10, passRate: '100%', attend: '95%' },
    { code: 'MIN-320', name: 'Consejería Bíblica', students: 6, avg: 89.50, passRate: '100%', attend: '92%' },
  ];

  const atRiskStudents = [
    { code: '77321118', name: 'Soto, Ricardo', course: 'CEB103', score: '40.0%', absences: 3, status: 'Riesgo Crítico de Reprobación', action: 'Citar a Consejería' },
    { code: '77321142', name: 'Vargas, Samuel', course: 'CEB103', score: '46.6%', absences: 4, status: 'Inasistencia Reiterada', action: 'Enviar Advertencia' },
    { code: '77321012', name: 'Mendoza, Daniel', course: 'CEB103', score: '0.0%', absences: 5, status: 'Baja Temporal / No Asiste', action: 'Notificar Decanato' },
  ];

  const handleExportCsv = () => {
    const headers = ['Codigo', 'Materia', 'Alumnos', 'Promedio', 'TasaAprobacion', 'Asistencia'];
    const rows = performanceByCourse.map((c) =>
      [c.code, `"${c.name}"`, c.students, c.avg, c.passRate, c.attend].join(',')
    );
    const blob = new Blob([[headers.join(','), ...rows].join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `UTLA_Informe_Academico_Docente_Primavera_2026.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase text-utla-gold tracking-widest block">
            PORTAL: MAESTRO • ANALÍTICA ACADÉMICA
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-utla-navy font-serif">
            Reportes de Rendimiento &amp; Aprobación
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Catedrático: <strong>Dr. Juan Pérez</strong> • Semestre Académico: <strong>{selectedTerm}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportCsv}
            className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Exportar CSV</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 bg-utla-navy hover:bg-utla-navy-light text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Printer className="w-4 h-4 text-utla-gold" />
            <span>Imprimir Informe</span>
          </button>
        </div>
      </div>

      {/* Global KPIs Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Promedio General</span>
            <h3 className="text-2xl font-black text-utla-navy">87.5%</h3>
            <span className="text-[10px] text-emerald-600 font-bold">+2.4% vs semestre anterior</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Tasa de Aprobación</span>
            <h3 className="text-2xl font-black text-emerald-700">93.8%</h3>
            <span className="text-[10px] text-slate-500">45 de 48 alumnos aprobando</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Asistencia Promedio</span>
            <h3 className="text-2xl font-black text-amber-800">92.4%</h3>
            <span className="text-[10px] text-slate-500">Sesiones presenciales y Zoom</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Total Matriculados</span>
            <h3 className="text-2xl font-black text-slate-900">48 Alumnos</h3>
            <span className="text-[10px] text-slate-500">En 5 cursos activos</span>
          </div>
        </div>
      </div>

      {/* Grade Distribution & Course Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Course Comparison Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-extrabold text-sm text-utla-navy uppercase tracking-wider">
              Rendimiento Comparativo por Asignatura
            </h2>
            <span className="text-xs text-slate-400 font-medium">5 Asignaturas</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] border-y">
                <tr>
                  <th className="p-3">Código</th>
                  <th className="p-3">Cátedra</th>
                  <th className="p-3 text-center">Alumnos</th>
                  <th className="p-3 text-center">Promedio</th>
                  <th className="p-3 text-center">Aprobación</th>
                  <th className="p-3 text-center">Asistencia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {performanceByCourse.map((c) => (
                  <tr key={c.code} className="hover:bg-slate-50/70">
                    <td className="p-3 font-mono font-bold text-utla-navy">{c.code}</td>
                    <td className="p-3 font-bold text-slate-900">{c.name}</td>
                    <td className="p-3 text-center font-semibold text-slate-600">{c.students}</td>
                    <td className="p-3 text-center font-black text-slate-900">
                      <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                        {c.avg.toFixed(2)}%
                      </span>
                    </td>
                    <td className="p-3 text-center font-bold text-emerald-700">{c.passRate}</td>
                    <td className="p-3 text-center font-semibold text-blue-900">{c.attend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grade Distribution Bar (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="font-extrabold text-sm text-utla-navy uppercase tracking-wider">
              Distribución de Calificaciones
            </h2>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-emerald-800">Grado A (90 - 100%)</span>
                <span>62% (30 alumnos)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '62%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-blue-800">Grado B (80 - 89%)</span>
                <span>25% (12 alumnos)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '25%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-amber-800">Grado C (70 - 79%)</span>
                <span>9% (4 alumnos)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '9%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-rose-800">Grado F (&lt; 70%)</span>
                <span>4% (2 alumnos)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: '4%' }} />
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border text-[11px] text-slate-500 space-y-1">
            <span className="font-bold text-slate-700 block">Observación Institucional:</span>
            <p>El estándar académico de aprobación mínima exigido por UTLA es 70.0% (Grado C).</p>
          </div>
        </div>
      </div>

      {/* Early Warning / Estudiantes en Riesgo Académico */}
      <div className="bg-white rounded-2xl p-6 border-2 border-rose-200 shadow-subtle space-y-4">
        <div className="flex items-center justify-between border-b border-rose-100 pb-3">
          <div className="flex items-center gap-2 text-rose-700">
            <AlertTriangle className="w-5 h-5" />
            <h2 className="font-black text-sm uppercase tracking-wider">
              Alerta Temprana: Estudiantes en Riesgo Académico o Deserción
            </h2>
          </div>
          <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
            3 Casos Detectados
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-rose-50/50 text-rose-950 uppercase text-[10px] border-y border-rose-100">
              <tr>
                <th className="p-3">Código</th>
                <th className="p-3">Estudiante</th>
                <th className="p-3">Cátedra</th>
                <th className="p-3 text-center">Nota Actual</th>
                <th className="p-3 text-center">Inasistencias</th>
                <th className="p-3">Diagnóstico / Alerta</th>
                <th className="p-3 text-right">Acción Pastoral</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-50">
              {atRiskStudents.map((st) => (
                <tr key={st.code} className="hover:bg-rose-50/30">
                  <td className="p-3 font-mono font-bold text-slate-700">{st.code}</td>
                  <td className="p-3 font-extrabold text-slate-900">{st.name}</td>
                  <td className="p-3 font-mono font-bold text-blue-900">{st.course}</td>
                  <td className="p-3 text-center font-black text-rose-700">{st.score}</td>
                  <td className="p-3 text-center font-bold text-rose-800">{st.absences} faltas</td>
                  <td className="p-3 text-rose-700 font-semibold">{st.status}</td>
                  <td className="p-3 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`Iniciando seguimiento con: ${st.name}`)}
                      className="px-3 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold rounded-lg text-[11px] transition-colors"
                    >
                      {st.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
