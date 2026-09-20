import React, { useState } from 'react';
import {
  Folder,
  Search,
  Download,
  ExternalLink,
  Play,
  Volume2,
  FileText,
  BookOpen,
  Library,
  Video,
  FileCheck,
  Headphones,
  CheckCircle2,
  Eye,
  X
} from 'lucide-react';

interface AcademicResource {
  id: string;
  title: string;
  category: 'SYLLABUS' | 'LIBRARY' | 'MULTIMEDIA' | 'FORMS';
  format: 'PDF' | 'DOCX' | 'MP4' | 'MP3' | 'WEB';
  sizeOrDuration: string;
  description: string;
  authorOrDept: string;
  downloadUrl?: string;
  previewUrl?: string;
}

export const StudentResources: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'SYLLABUS' | 'LIBRARY' | 'MULTIMEDIA' | 'FORMS'>('ALL');
  const [search, setSearch] = useState('');
  const [activeMediaModal, setActiveMediaModal] = useState<AcademicResource | null>(null);

  const resources: AcademicResource[] = [
    {
      id: 'res-1',
      title: 'Sílabo Oficial 2026: CB103 - Introducción al Nuevo Testamento',
      category: 'SYLLABUS',
      format: 'PDF',
      sizeOrDuration: '1.4 MB',
      description:
        'Contenido programático completo, objetivos de aprendizaje, cronograma semanal de lecturas, rúbricas de evaluación y bibliografía fundamental de la cátedra.',
      authorOrDept: 'Facultad de Teología • Pr. Luis A. Rentería',
    },
    {
      id: 'res-2',
      title: 'Manual de Estilo y Redacción Teológica UTLA (Normas Turabian / APA)',
      category: 'SYLLABUS',
      format: 'PDF',
      sizeOrDuration: '3.8 MB',
      description:
        'Guía institucional para la presentación de monografías, ensayos exegéticos, notas al pie, transliteración de términos griegos/hebreos y bibliografía académica.',
      authorOrDept: 'Comité Académico & Rectoría UTLA',
    },
    {
      id: 'res-3',
      title: 'Léxico Griego-Español y Concordancia Temática del Nuevo Testamento',
      category: 'LIBRARY',
      format: 'WEB',
      sizeOrDuration: 'Base de Datos Online',
      description:
        'Herramienta léxica interactiva para el análisis morfológico, etimología y ocurrencias de vocablos del texto griego koiné.',
      authorOrDept: 'Biblioteca Teológica Digital UTLA',
    },
    {
      id: 'res-4',
      title: 'Comentario Exegético al Texto Griego del N.T. (Tomo Epístolas Paulinas)',
      category: 'LIBRARY',
      format: 'PDF',
      sizeOrDuration: '8.2 MB',
      description:
        'Tratado analítico verso por verso de Romanos, 1 y 2 Corintios y Gálatas con énfasis en la sintaxis y exégesis teológica.',
      authorOrDept: 'Colección Clásicos Teológicos UTLA',
    },
    {
      id: 'res-5',
      title: 'Diccionario Teológico del Nuevo Testamento (Compendio Lothar Coenen)',
      category: 'LIBRARY',
      format: 'WEB',
      sizeOrDuration: 'Portal Digital',
      description:
        'Estudio de los grandes conceptos teológicos del pacto bíblico, redención, reconciliación y escatología.',
      authorOrDept: 'Biblioteca & Recursos Digitales',
    },
    {
      id: 'res-6',
      title: 'Clase Magistral #3: El Contexto Político, Social y Religioso del Siglo I',
      category: 'MULTIMEDIA',
      format: 'MP4',
      sizeOrDuration: '54 min (HD)',
      description:
        'Grabación audiovisual de la sesión presencial con mapas interactivos de la cuenca del Mediterráneo, el templo de Jerusalén y las sectas judías (fariseos, saduceos, esenios).',
      authorOrDept: 'Cátedra CB103 • Pr. Luis A. Rentería',
    },
    {
      id: 'res-7',
      title: "Audio Devocional: 'El Pastor como Siervo de Dios según 2 Timoteo 2:2'",
      category: 'MULTIMEDIA',
      format: 'MP3',
      sizeOrDuration: '22 min (Audio)',
      description:
        'Exposición devocional y pastoral sobre los pilares ministeriales de fidelidad, discipulado y sufrimiento por la causa del Evangelio.',
      authorOrDept: 'Capellanía & Rectoría UTLA',
    },
    {
      id: 'res-8',
      title: 'Formulario Oficial: Solicitud de Tutoría Académica o Prórroga de Plazo',
      category: 'FORMS',
      format: 'DOCX',
      sizeOrDuration: '340 KB',
      description:
        'Documento formal para presentar ante la secretaría académica en caso de requerir acompañamiento docente personalizado o justificación de inasistencias.',
      authorOrDept: 'Secretaría de Asuntos Estudiantiles',
    },
  ];

  const filteredResources = resources.filter((res) => {
    if (selectedCategory !== 'ALL' && res.category !== selectedCategory) return false;
    if (
      search &&
      !res.title.toLowerCase().includes(search.toLowerCase()) &&
      !res.description.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase text-utla-gold tracking-widest block">
            PORTAL: ESTUDIANTIL • REPOSITORIO DIGITAL
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-utla-navy font-serif">
            Recursos Académicos &amp; Biblioteca
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Materiales de estudio, guías exegéticas, sílabos y herramientas para tu formación ministerial
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert('Accediendo al Catálogo Completo de la Biblioteca Digital UTLA...')}
          className="px-4 py-2.5 bg-utla-navy hover:bg-utla-navy-light text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all flex-shrink-0"
        >
          <Library className="w-4 h-4 text-utla-gold" />
          <span>Acceder a Biblioteca Digital</span>
        </button>
      </div>

      {/* Categories & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl text-xs font-bold w-full sm:w-auto">
          {[
            { key: 'ALL', label: 'Todos' },
            { key: 'SYLLABUS', label: 'Sílabus & Guías' },
            { key: 'LIBRARY', label: 'Biblioteca & Léxicos' },
            { key: 'MULTIMEDIA', label: 'Multimedia' },
            { key: 'FORMS', label: 'Formatos' },
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

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar material o documento..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-utla-navy shadow-2xs"
          />
        </div>
      </div>

      {/* Grid of Resources Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map((item) => {
          const isPdf = item.format === 'PDF';
          const isDocx = item.format === 'DOCX';
          const isMp4 = item.format === 'MP4';
          const isMp3 = item.format === 'MP3';
          const isWeb = item.format === 'WEB';

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
                        isPdf
                          ? 'bg-rose-50 text-rose-600'
                          : isDocx
                          ? 'bg-blue-50 text-blue-600'
                          : isMp4
                          ? 'bg-amber-50 text-amber-700'
                          : isMp3
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-purple-50 text-purple-700'
                      }`}
                    >
                      {isPdf && <FileText className="w-5 h-5" />}
                      {isDocx && <FileCheck className="w-5 h-5" />}
                      {isMp4 && <Video className="w-5 h-5" />}
                      {isMp3 && <Headphones className="w-5 h-5" />}
                      {isWeb && <Library className="w-5 h-5" />}
                    </div>

                    <div>
                      <span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">
                        {item.format} • {item.sizeOrDuration}
                      </span>
                      <span className="text-[10.5px] font-bold text-utla-gold">
                        {item.authorOrDept}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[9.5px] font-black uppercase ${
                      item.category === 'SYLLABUS'
                        ? 'bg-blue-100 text-blue-900'
                        : item.category === 'LIBRARY'
                        ? 'bg-amber-100 text-amber-900'
                        : item.category === 'MULTIMEDIA'
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'bg-slate-200 text-slate-800'
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

              {/* Actions Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[10.5px] text-slate-400 italic">
                  Disponible para descarga y consulta
                </span>

                <div className="flex items-center gap-2">
                  {isMp4 && (
                    <button
                      type="button"
                      onClick={() => setActiveMediaModal(item)}
                      className="px-3.5 py-1.5 bg-utla-navy hover:bg-utla-navy-light text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs"
                    >
                      <Play className="w-3.5 h-3.5 text-utla-gold" />
                      <span>Ver Clase</span>
                    </button>
                  )}

                  {isMp3 && (
                    <button
                      type="button"
                      onClick={() => setActiveMediaModal(item)}
                      className="px-3.5 py-1.5 bg-utla-navy hover:bg-utla-navy-light text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-utla-gold" />
                      <span>Escuchar</span>
                    </button>
                  )}

                  {isWeb && (
                    <button
                      type="button"
                      onClick={() => alert(`Abriendo recurso en línea: ${item.title}`)}
                      className="px-3.5 py-1.5 bg-utla-gold hover:bg-amber-400 text-utla-navy font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-2xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Abrir</span>
                    </button>
                  )}

                  {(isPdf || isDocx) && (
                    <>
                      <button
                        type="button"
                        onClick={() => alert(`Previsualizando documento en línea: ${item.title}`)}
                        className="px-3 py-1.5 border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-xl flex items-center gap-1"
                        title="Ver en pantalla"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Ver Online</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => alert(`Descargando archivo: ${item.title}`)}
                        className="px-3.5 py-1.5 bg-utla-navy hover:bg-utla-navy-light text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs"
                        title="Descargar a su equipo"
                      >
                        <Download className="w-3.5 h-3.5 text-utla-gold" />
                        <span>Descargar</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Multimedia Preview Modal */}
      {activeMediaModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-utla-gold tracking-wider">
                  REPRODUCTOR MULTIMEDIA UTLA
                </span>
                <h3 className="font-extrabold text-sm text-utla-navy font-serif">
                  {activeMediaModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveMediaModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-900 rounded-xl p-8 text-center text-white space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto text-utla-gold ring-4 ring-white/5">
                {activeMediaModal.format === 'MP4' ? (
                  <Play className="w-8 h-8 fill-current ml-1" />
                ) : (
                  <Volume2 className="w-8 h-8" />
                )}
              </div>

              <div>
                <p className="font-bold text-sm text-white">{activeMediaModal.title}</p>
                <span className="text-xs text-slate-400">
                  Duración: {activeMediaModal.sizeOrDuration} • {activeMediaModal.authorOrDept}
                </span>
              </div>

              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-utla-gold h-full w-1/3 rounded-full" />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>08:42</span>
                <span>{activeMediaModal.sizeOrDuration}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs">
              <span className="text-slate-500 italic">
                Grabación oficial autorizada por la cátedra
              </span>
              <button
                type="button"
                onClick={() => setActiveMediaModal(null)}
                className="px-5 py-2 bg-utla-navy text-white font-bold rounded-xl hover:bg-utla-navy-light"
              >
                Cerrar Reproductor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
