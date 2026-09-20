import React, { useState } from 'react';
import {
  ClipboardList,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  UploadCloud,
  ChevronRight,
  Download,
  Award,
  BookOpen,
  Filter,
  Check,
  X
} from 'lucide-react';
import { STUDENT_ACTIVE_COURSE } from '../../mocks/academicData';

interface Assignment {
  id: string;
  title: string;
  courseCode: string;
  dueDate: string;
  points: number;
  score?: number;
  status: 'PENDING' | 'SUBMITTED' | 'GRADED';
  description: string;
  submittedFile?: string;
  submissionDate?: string;
  feedback?: string;
}

export const StudentAssignments: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'SUBMITTED' | 'GRADED'>('ALL');
  const [activeModalAssignment, setActiveModalAssignment] = useState<Assignment | null>(null);
  const [commentText, setCommentText] = useState('');
  const [fileName, setFileName] = useState('');
  const [successToast, setSuccessToast] = useState('');

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 'asg-2',
      title: 'Tarea 2: Ensayo Exegético sobre Gálatas y la Justificación por la Fe',
      courseCode: 'CB103',
      dueDate: '25 de mayo, 2026 - 23:59 hrs',
      points: 20,
      status: 'PENDING',
      description:
        'Desarrollar un análisis exegético riguroso de 4 a 6 páginas sobre Gálatas 2:15-21. Debe incluir análisis del trasfondo socio-religioso en Antioquía, vocabulario teológico clave (dikaiosýnē, pistis Christou) y aplicaciones pastorales contemporáneas. Formato Turabian/APA.',
    },
    {
      id: 'asg-1',
      title: 'Tarea 1: Análisis Comparativo de los Evangelios Sinópticos',
      courseCode: 'CB103',
      dueDate: '10 de mayo, 2026',
      points: 20,
      score: 19.5,
      status: 'GRADED',
      description:
        'Comparar la cristología de Marcos y Lucas con énfasis en el motivo del siervo sufriente y el Hijo del Hombre.',
      submittedFile: 'Analisis_Sinopticos_JuanLopez.pdf',
      submissionDate: '09 de mayo, 2026 - 19:40 hrs',
      feedback:
        'Excelente análisis de las fuentes y articulación teológica. Destacable dominio de la terminología bíblica y estructuración según las normas UTLA. ¡Felicitaciones!',
    },
    {
      id: 'asg-3',
      title: 'Tarea 3: Mapa Conceptual de los Viajes Misioneros Paulinos',
      courseCode: 'CB103',
      dueDate: '20 de mayo, 2026',
      points: 15,
      status: 'SUBMITTED',
      description:
        'Elaborar un esquema detallado con las rutas, ciudades principales, desafíos enfrentados y epístolas escritas durante el 1er, 2do y 3er viaje misionero.',
      submittedFile: 'Mapa_Conceptual_Pablo_JuanLopez.pdf',
      submissionDate: '18 de mayo, 2026 - 14:15 hrs',
    },
    {
      id: 'asg-4',
      title: 'Tarea 4: Cuestionario Teológico sobre Epístolas de la Prisión',
      courseCode: 'CB103',
      dueDate: '02 de mayo, 2026',
      points: 15,
      score: 15.0,
      status: 'GRADED',
      description:
        'Resolución de 20 preguntas teológicas y exegéticas sobre Efesios, Filipenses, Colosenses y Filemón.',
      submittedFile: 'Cuestionario_Epistolas_JuanLopez.pdf',
      submissionDate: '01 de mayo, 2026 - 21:00 hrs',
      feedback: 'Respuestas precisas con respaldo exegético impecable.',
    },
  ]);

  const filteredAssignments = assignments.filter((a) => {
    if (filter === 'ALL') return true;
    return a.status === filter;
  });

  const handleSimulateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalAssignment) return;

    const fileToSet = fileName || 'Ensayo_Exegetico_Galatas_JuanLopez.pdf';
    setAssignments((prev) =>
      prev.map((item) =>
        item.id === activeModalAssignment.id
          ? {
              ...item,
              status: 'SUBMITTED',
              submittedFile: fileToSet,
              submissionDate: 'Hoy, 22:45 hrs',
            }
          : item
      )
    );

    setSuccessToast(`¡Tarea "${activeModalAssignment.title}" entregada con éxito!`);
    setActiveModalAssignment(null);
    setFileName('');
    setCommentText('');

    setTimeout(() => {
      setSuccessToast('');
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header and Course Selection Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-utla-navy border border-blue-200 uppercase tracking-wider">
              {STUDENT_ACTIVE_COURSE.code}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Profesor: <strong>{STUDENT_ACTIVE_COURSE.professor}</strong>
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-utla-navy font-serif">
            Tareas &amp; Asignaciones Académicas
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            {STUDENT_ACTIVE_COURSE.name} • Semestre Primavera 2026
          </p>
        </div>

        {/* Stats Summary Pills */}
        <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
          <div className="text-center px-3 border-r border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Total</span>
            <span className="text-base font-black text-utla-navy">{assignments.length}</span>
          </div>
          <div className="text-center px-3 border-r border-slate-200">
            <span className="text-[10px] text-amber-600 font-bold block uppercase">Pendientes</span>
            <span className="text-base font-black text-amber-600">
              {assignments.filter((a) => a.status === 'PENDING').length}
            </span>
          </div>
          <div className="text-center px-3">
            <span className="text-[10px] text-emerald-600 font-bold block uppercase">Calificadas</span>
            <span className="text-base font-black text-emerald-700">
              {assignments.filter((a) => a.status === 'GRADED').length}
            </span>
          </div>
        </div>
      </div>

      {successToast && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {[
          { key: 'ALL', label: `Todas (${assignments.length})` },
          {
            key: 'PENDING',
            label: `Pendientes (${assignments.filter((a) => a.status === 'PENDING').length})`,
          },
          {
            key: 'SUBMITTED',
            label: `Entregadas (${assignments.filter((a) => a.status === 'SUBMITTED').length})`,
          },
          {
            key: 'GRADED',
            label: `Calificadas (${assignments.filter((a) => a.status === 'GRADED').length})`,
          },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === tab.key
                ? 'bg-utla-navy text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Assignment Cards List */}
      <div className="space-y-4">
        {filteredAssignments.map((assignment) => {
          const isPending = assignment.status === 'PENDING';
          const isSubmitted = assignment.status === 'SUBMITTED';
          const isGraded = assignment.status === 'GRADED';

          return (
            <div
              key={assignment.id}
              className={`bg-white rounded-2xl p-6 border transition-all shadow-subtle hover:shadow-card ${
                isPending
                  ? 'border-amber-300 ring-1 ring-amber-200'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {isPending && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-100 text-amber-800 flex items-center gap-1 border border-amber-300">
                        <Clock className="w-3 h-3" />
                        Pendiente de Entrega
                      </span>
                    )}
                    {isSubmitted && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-100 text-blue-800 flex items-center gap-1 border border-blue-200">
                        <Check className="w-3 h-3" />
                        Entregada • En Revisión
                      </span>
                    )}
                    {isGraded && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 flex items-center gap-1 border border-emerald-300">
                        <Award className="w-3 h-3" />
                        Calificada ({assignment.score} / {assignment.points} pts)
                      </span>
                    )}

                    <span className="text-[11px] font-mono text-slate-500">
                      Puntos posibles: <strong>{assignment.points} pts</strong>
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-utla-navy font-serif">
                    {assignment.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {assignment.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-utla-gold" />
                      Vencimiento: <strong className="text-slate-700">{assignment.dueDate}</strong>
                    </span>

                    {assignment.submittedFile && (
                      <span className="flex items-center gap-1 text-slate-600">
                        <FileText className="w-3.5 h-3.5 text-blue-600" />
                        Archivo:{' '}
                        <strong className="text-blue-800">{assignment.submittedFile}</strong>
                      </span>
                    )}
                  </div>

                  {/* Feedback Box if Graded */}
                  {assignment.feedback && (
                    <div className="mt-3 p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1">
                      <div className="flex items-center justify-between text-emerald-900 font-bold">
                        <span>Retroalimentación del Pr. Luis A. Rentería:</span>
                        <span className="text-xs bg-emerald-200/70 text-emerald-900 px-2 py-0.5 rounded-full font-mono">
                          Nota: {assignment.score} / {assignment.points} (
                          {((assignment.score! / assignment.points) * 100).toFixed(0)}%)
                        </span>
                      </div>
                      <p className="text-slate-700 italic">"{assignment.feedback}"</p>
                    </div>
                  )}
                </div>

                {/* Actions Button */}
                <div className="flex items-center lg:flex-col gap-2 flex-shrink-0">
                  {isPending && (
                    <button
                      type="button"
                      onClick={() => setActiveModalAssignment(assignment)}
                      className="w-full lg:w-44 py-2.5 px-4 bg-utla-gold hover:bg-amber-400 text-utla-navy font-black text-xs uppercase tracking-wider rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>Subir Entrega</span>
                    </button>
                  )}

                  {isSubmitted && (
                    <button
                      type="button"
                      onClick={() => alert(`Visualizando entrega: ${assignment.submittedFile}`)}
                      className="w-full lg:w-44 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 flex items-center justify-center gap-2 transition-colors"
                    >
                      <FileText className="w-4 h-4 text-blue-700" />
                      <span>Ver mi Archivo</span>
                    </button>
                  )}

                  {isGraded && (
                    <button
                      type="button"
                      onClick={() =>
                        alert(
                          `Rúbrica de Evaluación UTLA:\n- Calidad Exegética: 10/10\n- Redacción & Turabian: 4.8/5\n- Aplicación Pastoral: 4.7/5\nTotal: ${assignment.score}/${assignment.points}`
                        )
                      }
                      className="w-full lg:w-44 py-2.5 px-4 bg-utla-navy hover:bg-utla-navy-light text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
                    >
                      <Award className="w-4 h-4 text-utla-gold" />
                      <span>Ver Rúbrica</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload Assignment Modal Dialog */}
      {activeModalAssignment && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-utla-gold">
                  ENTREGA DE ASIGNACIÓN
                </span>
                <h3 className="font-extrabold text-sm text-utla-navy font-serif">
                  {activeModalAssignment.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalAssignment(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSimulateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  Cargar Archivo del Ensayo (PDF, DOCX):
                </label>
                <div
                  onClick={() =>
                    setFileName('Ensayo_Exegetico_Galatas_JuanCarlosLopez.pdf')
                  }
                  className="border-2 border-dashed border-slate-300 hover:border-utla-gold rounded-xl p-6 text-center cursor-pointer transition-colors bg-slate-50 hover:bg-amber-50/20"
                >
                  <UploadCloud className="w-8 h-8 text-utla-navy mx-auto mb-2" />
                  <p className="font-bold text-slate-800">
                    {fileName || 'Haz clic para seleccionar o arrastra tu archivo aquí'}
                  </p>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Formatos permitidos: .pdf, .docx (Máx. 25 MB)
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  Comentario adicional para el Pr. Luis A. Rentería (Opcional):
                </label>
                <textarea
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Escriba aquí alguna aclaración o nota sobre su trabajo..."
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-utla-navy"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl text-blue-900 text-[11px] flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-blue-700 mt-0.5" />
                <span>
                  Declaro solemnemente que este ensayo es de mi total autoría académica y cumple
                  con el código de honor y ética cristiana de UTLA.
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveModalAssignment(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-utla-navy hover:bg-utla-navy-light text-white font-extrabold uppercase tracking-wider shadow-md"
                >
                  Confirmar y Entregar Tarea
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
