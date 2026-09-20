import React, { useState } from 'react';
import {
  Folder,
  Search,
  UploadCloud,
  FileText,
  Download,
  Presentation,
  CheckCircle2,
  Award,
  BookOpen,
  Eye,
  Plus,
  X
} from 'lucide-react';
import { TEACHER_CLASSES } from '../../mocks/academicData';

interface TeacherResource {
  id: string;
  title: string;
  courseCode: string;
  category: 'SLIDES' | 'RUBRICS' | 'EXAMS' | 'READINGS';
  format: 'PPTX' | 'PDF' | 'DOCX';
  size: string;
  description: string;
  downloads: number;
}

export const TeacherResources: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'SLIDES' | 'RUBRICS' | 'EXAMS' | 'READINGS'>('ALL');
  const [search, setSearch] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [resTitle, setResTitle] = useState('');
  const [resCourse, setResCourse] = useState('CEB103');
  const [resCategory, setResCategory] = useState<'SLIDES' | 'RUBRICS' | 'EXAMS' | 'READINGS'>('SLIDES');
  const [resDesc, setResDesc] = useState('');
  const [successToast, setSuccessToast] = useState('');

  const [resources, setResources] = useState<TeacherResource[]>([
    {
      id: 'tr-1',
      title: 'Diapositivas Oficiales Cátedra 3: El Contexto Religioso del Segundo Templo',
      courseCode: 'CEB103',
      category: 'SLIDES',
      format: 'PPTX',
      size: '14.2 MB',
      description:
        'Presentación gráfica completa con mapas del Imperio Romano, cronología de los Macabeos y dinastía herodiana.',
      downloads: 48,
    },
    {
      id: 'tr-2',
      title: 'Rúbrica Institucional para Evaluación de Ensayos Exegéticos UTLA',
      courseCode: 'THEO-201',
      category: 'RUBRICS',
      format: 'PDF',
      size: '1.2 MB',
      description:
        'Matriz de ponderación basada en normas Turabian: rigor exegético (40%), sintaxis bíblica (20%), aplicación (20%) y redacción (20%).',
      downloads: 65,
    },
    {
      id: 'tr-3',
      title: 'Banco de Preguntas & Modelo de Examen Parcial de Teología Propia',
      courseCode: 'THEO-301',
      category: 'EXAMS',
      format: 'DOCX',
      size: '850 KB',
      description:
        'Cuestionario guía con 40 preguntas analíticas sobre atributos comunicables e incomunicables de Dios y doctrina trinitaria.',
      downloads: 32,
    },
    {
      id: 'tr-4',
      title: 'Guía de Lecturas Obligatorias: El Cuidado Pastoral en Tiempos de Crisis',
      courseCode: 'MIN-210',
      category: 'READINGS',
      format: 'PDF',
      size: '3.4 MB',
      description:
        'Compendio de artículos de ética pastoral, confidencialidad, consejería en duelo y acompañamiento a líderes eclesiales.',
      downloads: 29,
    },
    {
      id: 'tr-5',
      title: 'Plantilla de Estudio de Caso Clínico-Pastoral para Consejería Bíblica',
      courseCode: 'MIN-320',
      category: 'RUBRICS',
      format: 'DOCX',
      size: '520 KB',
      description:
        'Formato estandarizado para la redacción de diagnósticos y planes bíblicos de restauración espiritual.',
      downloads: 24,
    },
  ]);

  const filtered = resources.filter((res) => {
    if (selectedCategory !== 'ALL' && res.category !== selectedCategory) return false;
    if (
      search &&
      !res.title.toLowerCase().includes(search.toLowerCase()) &&
      !res.courseCode.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleUploadResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resTitle.trim()) return;

    const newRes: TeacherResource = {
      id: `tr-${Date.now()}`,
      title: resTitle.trim(),
      courseCode: resCourse,
      category: resCategory,
      format: resCategory === 'SLIDES' ? 'PPTX' : resCategory === 'EXAMS' ? 'DOCX' : 'PDF',
      size: '2.5 MB',
      description: resDesc || 'Material didáctico cargado para los estudiantes de la cátedra.',
      downloads: 0,
    };

    setResources([newRes, ...resources]);
    setShowUploadModal(false);
    setResTitle('');
    setResDesc('');
    setSuccessToast(`¡Recurso "${newRes.title}" publicado y disponible para los alumnos de ${newRes.courseCode}!`);
    setTimeout(() => setSuccessToast(''), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase text-utla-gold tracking-widest block">
            PORTAL: MAESTRO • MATERIALES DIDÁCTICOS
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-utla-navy font-serif">
            Recursos Didácticos de Cátedra
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Publica y administra presentaciones, rúbricas, guías y modelos de exámenes para tus estudiantes
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2.5 bg-utla-navy hover:bg-utla-navy-light text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all flex-shrink-0"
        >
          <UploadCloud className="w-4 h-4 text-utla-gold" />
          <span>Subir Material Didáctico</span>
        </button>
      </div>

      {successToast && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl text-xs font-bold">
          {[
            { key: 'ALL', label: 'Todos' },
            { key: 'SLIDES', label: 'Diapositivas' },
            { key: 'RUBRICS', label: 'Rúbricas' },
            { key: 'EXAMS', label: 'Exámenes Modelo' },
            { key: 'READINGS', label: 'Lecturas' },
          ].map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key as any)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedCategory === cat.key
                  ? 'bg-white text-utla-navy shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar material didáctico..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-utla-navy shadow-2xs"
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => {
          const isSlides = item.category === 'SLIDES';
          const isRubric = item.category === 'RUBRICS';
          const isExam = item.category === 'EXAMS';

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-300 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isSlides
                          ? 'bg-amber-50 text-amber-700'
                          : isRubric
                          ? 'bg-blue-50 text-blue-700'
                          : isExam
                          ? 'bg-purple-50 text-purple-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {isSlides && <Presentation className="w-5 h-5" />}
                      {isRubric && <Award className="w-5 h-5" />}
                      {isExam && <FileText className="w-5 h-5" />}
                      {!isSlides && !isRubric && !isExam && <BookOpen className="w-5 h-5" />}
                    </div>

                    <div>
                      <span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">
                        {item.format} • {item.size}
                      </span>
                      <span className="text-xs font-mono font-bold text-utla-gold">
                        Cátedra: {item.courseCode}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[9.5px] font-black uppercase ${
                      isSlides
                        ? 'bg-amber-100 text-amber-900'
                        : isRubric
                        ? 'bg-blue-100 text-blue-900'
                        : isExam
                        ? 'bg-purple-100 text-purple-900'
                        : 'bg-emerald-100 text-emerald-900'
                    }`}
                  >
                    {item.category}
                  </span>
                </div>

                <h3 className="font-extrabold text-sm text-utla-navy font-serif leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                <span className="text-[10.5px] text-slate-400">
                  {item.downloads} descargas por alumnos
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => alert(`Previsualizando recurso: ${item.title}`)}
                    className="px-3 py-1.5 border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold rounded-xl flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5 text-utla-navy" />
                    <span>Ver</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => alert(`Descargando archivo: ${item.title}`)}
                    className="px-3.5 py-1.5 bg-utla-navy hover:bg-utla-navy-light text-white font-bold rounded-xl flex items-center gap-1.5 shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5 text-utla-gold" />
                    <span>Descargar</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Subir Material Didáctico */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-utla-navy font-serif uppercase">
                Publicar Material Didáctico
              </h3>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadResource} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Título del Recurso:</label>
                <input
                  type="text"
                  required
                  value={resTitle}
                  onChange={(e) => setResTitle(e.target.value)}
                  placeholder="Ej. Diapositivas Cátedra 4: Cristología Bíblica"
                  className="w-full p-2.5 border rounded-xl font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Cátedra Asignada:</label>
                  <select
                    value={resCourse}
                    onChange={(e) => setResCourse(e.target.value)}
                    className="w-full p-2.5 border rounded-xl bg-white font-bold text-utla-navy"
                  >
                    {TEACHER_CLASSES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} - {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tipo de Material:</label>
                  <select
                    value={resCategory}
                    onChange={(e) => setResCategory(e.target.value as any)}
                    className="w-full p-2.5 border rounded-xl bg-white font-medium"
                  >
                    <option value="SLIDES">Diapositivas (PPTX)</option>
                    <option value="RUBRICS">Rúbrica de Evaluación</option>
                    <option value="EXAMS">Examen / Cuestionario Modelo</option>
                    <option value="READINGS">Lectura Obligatoria</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Descripción Breve:</label>
                <textarea
                  rows={3}
                  value={resDesc}
                  onChange={(e) => setResDesc(e.target.value)}
                  placeholder="Detalles de los contenidos o instrucciones para los alumnos..."
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
                  Publicar para Alumnos
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
