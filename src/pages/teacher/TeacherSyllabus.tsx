import React, { useState } from 'react';
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  Plus,
  BookOpen,
  Calendar,
  Sparkles,
  Search,
  X
} from 'lucide-react';
import { TEACHER_CLASSES } from '../../mocks/academicData';

interface SyllabusItem {
  id: string;
  courseCode: string;
  courseName: string;
  version: string;
  term: string;
  uploadDate: string;
  fileSize: string;
  status: 'APPROVED' | 'IN_REVIEW' | 'DRAFT';
  reviewedBy: string;
  summary: string;
}

export const TeacherSyllabus: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'APPROVED' | 'IN_REVIEW'>('ALL');
  const [search, setSearch] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('CEB103');
  const [versionInput, setVersionInput] = useState('2026.2');
  const [fileName, setFileName] = useState('');
  const [summaryInput, setSummaryInput] = useState('');
  const [successToast, setSuccessToast] = useState('');

  const [syllabi, setSyllabi] = useState<SyllabusItem[]>([
    {
      id: 'syl-1',
      courseCode: 'CEB103',
      courseName: 'Introducción al Nuevo Testamento',
      version: 'v2026.1',
      term: 'Primavera 2026',
      uploadDate: '15 de Enero, 2026',
      fileSize: '1.4 MB',
      status: 'APPROVED',
      reviewedBy: 'Decanato Académico UTLA',
      summary:
        'Contenido analítico de los 27 libros del canon neotestamentario, trasfondo del judaísmo del Segundo Templo y cronología de la expansión apostólica.',
    },
    {
      id: 'syl-2',
      courseCode: 'THEO-201',
      courseName: 'Hermenéutica Bíblica',
      version: 'v2026.1',
      term: 'Primavera 2026',
      uploadDate: '16 de Enero, 2026',
      fileSize: '1.8 MB',
      status: 'APPROVED',
      reviewedBy: 'Decanato Académico UTLA',
      summary:
        'Método gramático-histórico, análisis de géneros literarios (narrativa, profecía, epístola, apocalíptica) y aplicación homilética pastoral.',
    },
    {
      id: 'syl-3',
      courseCode: 'THEO-301',
      courseName: 'Teología Sistemática I',
      version: 'v2026.1',
      term: 'Primavera 2026',
      uploadDate: '18 de Enero, 2026',
      fileSize: '2.1 MB',
      status: 'APPROVED',
      reviewedBy: 'Comité Teológico & Rectoría',
      summary:
        'Tratado sobre Bibliología, Teología Propia, Trinidad, Decretos Divinos, Creación y Cristología Bíblica Clásica.',
    },
    {
      id: 'syl-4',
      courseCode: 'MIN-210',
      courseName: 'Ministerio Pastoral',
      version: 'v2026.1',
      term: 'Primavera 2026',
      uploadDate: '20 de Enero, 2026',
      fileSize: '1.3 MB',
      status: 'APPROVED',
      reviewedBy: 'Decanato de Ministerio y Misiones',
      summary:
        'Cuidado pastoral de la grey, administración eclesiástica, ordenanzas, disciplina bíblica y preservación del carácter del líder.',
    },
    {
      id: 'syl-5',
      courseCode: 'MIN-320',
      courseName: 'Consejería Bíblica',
      version: 'v2026.1',
      term: 'Primavera 2026',
      uploadDate: '02 de Febrero, 2026',
      fileSize: '1.5 MB',
      status: 'IN_REVIEW',
      reviewedBy: 'En evaluación por Vicerrectoría',
      summary:
        'Suficiencia de las Escrituras para la consejería pastoral, confrontación amorosa, resolución bíblica de crisis familiares y restauración del creyente.',
    },
  ]);

  const filtered = syllabi.filter((item) => {
    if (filter !== 'ALL' && item.status !== filter) return false;
    if (
      search &&
      !item.courseName.toLowerCase().includes(search.toLowerCase()) &&
      !item.courseCode.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleUploadSyllabus = (e: React.FormEvent) => {
    e.preventDefault();
    const courseObj = TEACHER_CLASSES.find((c) => c.code === selectedCourse);

    const newItem: SyllabusItem = {
      id: `syl-${Date.now()}`,
      courseCode: selectedCourse,
      courseName: courseObj ? courseObj.name : selectedCourse,
      version: `v${versionInput}`,
      term: 'Primavera / Verano 2026',
      uploadDate: 'Hoy',
      fileSize: '1.6 MB',
      status: 'IN_REVIEW',
      reviewedBy: 'Pendiente de Aprobación por Decanato',
      summary:
        summaryInput ||
        'Actualización del programa analítico y lecturas exegéticas recomendadas para el curso.',
    };

    setSyllabi([newItem, ...syllabi]);
    setShowUploadModal(false);
    setSuccessToast(`¡Sílabo de ${newItem.courseCode} cargado y enviado a Decanato con éxito!`);
    setFileName('');
    setSummaryInput('');
    setTimeout(() => setSuccessToast(''), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase text-utla-gold tracking-widest block">
            PORTAL: MAESTRO • GESTIÓN CURRICULAR
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-utla-navy font-serif">
            Sílabus Cargados &amp; Programas de Cátedra
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Administra, actualiza y descarga los sílabus institucionales de tus asignaturas aprobadas
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2.5 bg-utla-navy hover:bg-utla-navy-light text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all flex-shrink-0"
        >
          <UploadCloud className="w-4 h-4 text-utla-gold" />
          <span>Cargar Nuevo Sílabo</span>
        </button>
      </div>

      {successToast && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Toolbar: Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl text-xs font-bold">
          {[
            { key: 'ALL', label: `Todos (${syllabi.length})` },
            {
              key: 'APPROVED',
              label: `Aprobados (${syllabi.filter((s) => s.status === 'APPROVED').length})`,
            },
            {
              key: 'IN_REVIEW',
              label: `En Revisión (${syllabi.filter((s) => s.status === 'IN_REVIEW').length})`,
            },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilter(tab.key as any)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === tab.key
                  ? 'bg-white text-utla-navy shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por código o materia..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-utla-navy shadow-2xs"
          />
        </div>
      </div>

      {/* Syllabus Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => {
          const isApproved = item.status === 'APPROVED';
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-300 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-black bg-blue-50 text-utla-navy border border-blue-200">
                      {item.courseCode}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 font-mono">
                      {item.version}
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase flex items-center gap-1 border ${
                      isApproved
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}
                  >
                    {isApproved ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Aprobado por Decanato
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3 text-amber-600" />
                        En Revisión
                      </>
                    )}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-utla-navy font-serif leading-snug">
                  {item.courseName}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.summary}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1">
                  <span>Periodo: <strong className="text-slate-700">{item.term}</strong></span>
                  <span>•</span>
                  <span>Cargado: <strong className="text-slate-700">{item.uploadDate}</strong></span>
                  <span>•</span>
                  <span>Tamaño: <strong className="text-slate-700">{item.fileSize}</strong></span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[10px] text-slate-400 italic">
                  Avalado por {item.reviewedBy}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      alert(`Previsualizando sílabo oficial: ${item.courseCode} - ${item.courseName}`)
                    }
                    className="px-3 py-1.5 border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-xl flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5 text-utla-navy" />
                    <span>Ver</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      alert(`Descargando documento PDF del sílabo: ${item.courseCode}`)
                    }
                    className="px-3.5 py-1.5 bg-utla-navy hover:bg-utla-navy-light text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5 text-utla-gold" />
                    <span>Descargar PDF</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Cargar Nuevo Sílabo */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-utla-navy font-serif uppercase">
                Cargar Sílabo de Asignatura
              </h3>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSyllabus} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Materia Asignada:</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full p-2.5 border rounded-xl bg-white font-semibold text-utla-navy"
                >
                  {TEACHER_CLASSES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} - {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Versión del Sílabo:</label>
                  <input
                    type="text"
                    required
                    value={versionInput}
                    onChange={(e) => setVersionInput(e.target.value)}
                    placeholder="2026.2"
                    className="w-full p-2.5 border rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Semestre:</label>
                  <input
                    type="text"
                    disabled
                    value="Primavera / Verano 2026"
                    className="w-full p-2.5 border rounded-xl bg-slate-50 text-slate-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Archivo del Sílabo (PDF / DOCX):</label>
                <div
                  onClick={() => setFileName(`Silabo_Oficial_${selectedCourse}_v2026.pdf`)}
                  className="border-2 border-dashed border-slate-300 hover:border-utla-gold rounded-xl p-5 text-center cursor-pointer transition-colors bg-slate-50 hover:bg-amber-50/20"
                >
                  <UploadCloud className="w-7 h-7 text-utla-navy mx-auto mb-1.5" />
                  <p className="font-bold text-slate-800">
                    {fileName || 'Haz clic para seleccionar el documento del sílabo'}
                  </p>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Formato PDF o DOCX (Máx. 15 MB)
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Resumen de Cambios / Objetivos de la Cátedra:
                </label>
                <textarea
                  rows={3}
                  value={summaryInput}
                  onChange={(e) => setSummaryInput(e.target.value)}
                  placeholder="Describe brevemente los ajustes curriculares o bibliográficos de esta versión..."
                  className="w-full p-2.5 border rounded-xl focus:outline-none focus:ring-1 focus:ring-utla-navy"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border rounded-xl font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-utla-navy text-white font-extrabold rounded-xl hover:bg-utla-navy-light"
                >
                  Guardar y Enviar a Decanato
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
