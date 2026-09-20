import React, { useState } from 'react';
import {
  MessagesSquare,
  Search,
  Plus,
  Heart,
  Pin,
  Clock,
  BookOpen,
  Award,
  Send,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-react';
import { TEACHER_CLASSES } from '../../mocks/academicData';

interface TeacherForumPost {
  id: string;
  studentName: string;
  studentCode: string;
  avatarUrl: string;
  timestamp: string;
  content: string;
  graded: boolean;
  score?: number;
}

interface TeacherForumTopic {
  id: string;
  courseCode: string;
  title: string;
  description: string;
  scriptureReference?: string;
  points: number;
  dueDate: string;
  pinned: boolean;
  posts: TeacherForumPost[];
}

export const TeacherForums: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const [activeTopicId, setActiveTopicId] = useState<string>('tft-1');
  const [showNewForumModal, setShowNewForumModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCourse, setNewCourse] = useState('CEB103');
  const [newPrompt, setNewPrompt] = useState('');
  const [newPoints, setNewPoints] = useState(5);
  const [newDueDate, setNewDueDate] = useState('28 de mayo, 2026');
  const [teacherReplyText, setTeacherReplyText] = useState('');
  const [successToast, setSuccessToast] = useState('');

  const [topics, setTopics] = useState<TeacherForumTopic[]>([
    {
      id: 'tft-1',
      courseCode: 'CEB103',
      title: 'Debate Teológico Semana 3: La Justificación por la Fe en Romanos y Gálatas',
      description:
        'Apreciados estudiantes: Examinen Gálatas 2:16 y Romanos 3:28. ¿De qué manera la doctrina de la justificación imputada protege la sola gratia frente a las lecturas sociológicas de la Nueva Perspectiva en Pablo?',
      scriptureReference: 'Gálatas 2:15-21 | Romanos 3:21-31',
      points: 5,
      dueDate: '25 de mayo, 2026',
      pinned: true,
      posts: [
        {
          id: 'tp-1',
          studentName: 'David Alejandro Torres',
          studentCode: '77321189',
          avatarUrl:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
          timestamp: 'Ayer, 16:30 hrs',
          content:
            'Pastor Luis, considero que en Gálatas Pablo busca desmantelar la dependencia de los marcadores de identidad (obras de la ley) para establecer que el veredicto escatológico de justicia ha sido adelantado en la cruz de Cristo mediante la fe.',
          graded: true,
          score: 5.0,
        },
        {
          id: 'tp-2',
          studentName: 'Mariana González',
          studentCode: '77321085',
          avatarUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
          timestamp: 'Hoy, 10:15 hrs',
          content:
            'La doctrina de la imputación forense es vital porque fundamenta la paz con Dios (Romanos 5:1). Si la justicia fuese infundida o dependiente de la fidelidad comunitaria, la certeza de la salvación se derrumbaría.',
          graded: true,
          score: 4.8,
        },
        {
          id: 'tp-3',
          studentName: 'Juan Carlos López',
          studentCode: '77321113',
          avatarUrl:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
          timestamp: 'Hoy, 11:30 hrs',
          content:
            'Pastor, añadiendo al debate, Lutero llamaba a este pasaje el "dulce intercambio" (mirifica commutatio): Cristo toma nuestro pecado y nos viste con Su justicia perfecta. Esto transforma radicalmente la predicación pastoral contemporánea.',
          graded: false,
        },
      ],
    },
    {
      id: 'tft-2',
      courseCode: 'THEO-201',
      title: 'Foro de Análisis: El Principio Cristocéntrico en la Hermenéutica del Antiguo Testamento',
      description:
        '¿Cómo evitar caer en la alegorización arbitraria al predicar a Cristo desde el Antiguo Testamento sin perder la tipología bíblica legítima (Lucas 24:27)?',
      scriptureReference: 'Lucas 24:27, 44-45 | Hebreos 1:1-2',
      points: 5,
      dueDate: '30 de mayo, 2026',
      pinned: false,
      posts: [
        {
          id: 'tp-4',
          studentName: 'Patricia Herrera',
          studentCode: '77321144',
          avatarUrl:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
          timestamp: 'Hace 2 días',
          content:
            'Para preservar la intención del autor original, debemos estudiar primero el significado histórico para Israel, y luego trazar la trayectoria de la teología bíblica hasta su cumplimiento en la persona y obra de Cristo.',
          graded: true,
          score: 4.9,
        },
      ],
    },
  ]);

  const activeTopic = topics.find((t) => t.id === activeTopicId) || topics[0];

  const filteredTopics = topics.filter((t) => {
    if (selectedCourse !== 'ALL' && t.courseCode !== selectedCourse) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleCreateForum = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPrompt.trim()) return;

    const newTopic: TeacherForumTopic = {
      id: `tft-${Date.now()}`,
      courseCode: newCourse,
      title: newTitle.trim(),
      description: newPrompt.trim(),
      points: newPoints,
      dueDate: newDueDate,
      pinned: false,
      posts: [],
    };

    setTopics([newTopic, ...topics]);
    setActiveTopicId(newTopic.id);
    setShowNewForumModal(false);
    setNewTitle('');
    setNewPrompt('');
    setSuccessToast(`¡Foro "${newTopic.title}" abierto con éxito para ${newTopic.courseCode}!`);
    setTimeout(() => setSuccessToast(''), 4000);
  };

  const handleTeacherReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherReplyText.trim()) return;

    setSuccessToast('¡Retroalimentación magistral de cátedra publicada en el debate!');
    setTeacherReplyText('');
    setTimeout(() => setSuccessToast(''), 3500);
  };

  const handleGradePost = (postId: string, score: number) => {
    setTopics((prev) =>
      prev.map((t) =>
        t.id === activeTopic.id
          ? {
              ...t,
              posts: t.posts.map((p) =>
                p.id === postId ? { ...p, graded: true, score } : p
              ),
            }
          : t
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase text-utla-gold tracking-widest block">
            PORTAL: MAESTRO • MODERACIÓN TEOLÓGICA
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-utla-navy font-serif">
            Foros &amp; Debates de Cátedra
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Modera intervenciones estudiantiles, califica réplicas y propón nuevos debates teológicos
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowNewForumModal(true)}
          className="px-4 py-2.5 bg-utla-navy hover:bg-utla-navy-light text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all flex-shrink-0"
        >
          <Plus className="w-4 h-4 text-utla-gold" />
          <span>Abrir Nuevo Foro de Cátedra</span>
        </button>
      </div>

      {successToast && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Main Two-Column View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Topics List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setSelectedCourse('ALL')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedCourse === 'ALL'
                  ? 'bg-white text-utla-navy shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todas las Materias
            </button>
            {TEACHER_CLASSES.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => setSelectedCourse(c.code)}
                className={`px-3 py-1.5 rounded-lg transition-all font-mono ${
                  selectedCourse === c.code
                    ? 'bg-white text-utla-navy shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {c.code}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar tema o debate..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-utla-navy shadow-2xs"
            />
          </div>

          <div className="space-y-3">
            {filteredTopics.map((topic) => {
              const isSelected = topic.id === activeTopic.id;
              const pendingCount = topic.posts.filter((p) => !p.graded).length;

              return (
                <div
                  key={topic.id}
                  onClick={() => setActiveTopicId(topic.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all text-left ${
                    isSelected
                      ? 'bg-white border-utla-gold ring-2 ring-utla-gold/50 shadow-md'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-subtle'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      {topic.pinned && (
                        <span className="p-1 rounded bg-amber-100 text-amber-800 text-[10px] font-black flex items-center gap-0.5">
                          <Pin className="w-3 h-3" /> Fijado
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-blue-100 text-blue-900">
                        {topic.courseCode}
                      </span>
                    </div>

                    <span className="text-[11px] font-bold text-slate-500">
                      {topic.posts.length} respuestas
                    </span>
                  </div>

                  <h3 className="font-extrabold text-xs text-utla-navy leading-snug font-serif">
                    {topic.title}
                  </h3>

                  <div className="flex items-center justify-between text-[11px] pt-3 mt-3 border-t border-slate-100">
                    <span className="text-slate-400">Vence: {topic.dueDate}</span>
                    {pendingCount > 0 ? (
                      <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-bold text-[10px] border border-rose-200">
                        {pendingCount} por calificar
                      </span>
                    ) : (
                      <span className="text-emerald-600 font-bold text-[10px] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Todas calificadas
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Moderation & Grading View (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-subtle p-6 space-y-6">
          <div className="border-b border-slate-200 pb-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black bg-amber-100 text-amber-900 border border-amber-200">
                {activeTopic.courseCode} • {activeTopic.points} PUNTOS
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Vencimiento: {activeTopic.dueDate}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-black text-utla-navy font-serif leading-tight">
              {activeTopic.title}
            </h2>

            {activeTopic.scriptureReference && (
              <div className="inline-block bg-blue-50 border border-blue-200 px-3 py-1 rounded-lg text-xs font-bold text-blue-900 font-serif">
                📖 Texto de Exégesis: {activeTopic.scriptureReference}
              </div>
            )}

            <div className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200 mt-2">
              {activeTopic.description}
            </div>
          </div>

          {/* Student Posts for Teacher Moderation */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider flex items-center justify-between">
              <span>Intervenciones de Estudiantes ({activeTopic.posts.length})</span>
              <span className="text-[11px] text-slate-400 font-normal">
                Puedes asignar puntaje individual a cada réplica
              </span>
            </h3>

            <div className="space-y-3.5">
              {activeTopic.posts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={post.avatarUrl}
                        alt={post.studentName}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-300"
                      />
                      <div>
                        <span className="font-extrabold text-xs text-slate-900 block leading-tight">
                          {post.studentName}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          ID: {post.studentCode}
                        </span>
                      </div>
                    </div>

                    {/* Grading Controls */}
                    <div className="flex items-center gap-2">
                      {post.graded ? (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-black text-xs font-mono">
                          Nota: {post.score} / {activeTopic.points} pts
                        </span>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-amber-700 font-bold">Sin calificar:</span>
                          <button
                            type="button"
                            onClick={() => handleGradePost(post.id, 5.0)}
                            className="px-2 py-1 bg-utla-gold text-utla-navy font-black text-[11px] rounded hover:bg-amber-400"
                          >
                            5.0
                          </button>
                          <button
                            type="button"
                            onClick={() => handleGradePost(post.id, 4.5)}
                            className="px-2 py-1 bg-slate-100 text-slate-800 font-bold text-[11px] rounded hover:bg-slate-200"
                          >
                            4.5
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed pl-10">
                    {post.content}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pl-10 pt-1">
                    <span>{post.timestamp}</span>
                    <button
                      type="button"
                      onClick={() => alert(`Agradecimiento del profesor enviado a ${post.studentName}`)}
                      className="text-utla-navy hover:underline font-bold"
                    >
                      Dar visto bueno del Docente
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher Official Response Box */}
          <form onSubmit={handleTeacherReply} className="pt-4 border-t border-slate-200 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">
                Aporte Magistral / Síntesis del Profesor:
              </span>
              <span className="px-2 py-0.5 rounded text-[9.5px] font-black uppercase bg-utla-navy text-white">
                Dr. Juan Pérez (Titular)
              </span>
            </div>

            <textarea
              rows={3}
              required
              value={teacherReplyText}
              onChange={(e) => setTeacherReplyText(e.target.value)}
              placeholder="Escribe la retroalimentación exegética general para orientar el debate de la cátedra..."
              className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-utla-navy bg-slate-50/50"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 bg-utla-navy hover:bg-utla-navy-light text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
              >
                <span>Publicar Síntesis Docente</span>
                <Send className="w-3.5 h-3.5 text-utla-gold" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal: Abrir Nuevo Foro */}
      {showNewForumModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-utla-navy font-serif uppercase">
                Apertura de Foro Académico
              </h3>
              <button
                type="button"
                onClick={() => setShowNewForumModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateForum} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Cátedra:</label>
                <select
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
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
                <label className="block font-bold text-slate-700 mb-1">Título del Foro:</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ej. Debate: La Doctrina del Pacto en Hebreos"
                  className="w-full p-2.5 border rounded-xl font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Puntos Asignados:</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    required
                    value={newPoints}
                    onChange={(e) => setNewPoints(parseInt(e.target.value) || 5)}
                    className="w-full p-2.5 border rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Fecha de Cierre:</label>
                  <input
                    type="text"
                    required
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    placeholder="30 de mayo, 2026"
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Pregunta Exegética o Tesis de Discusión:
                </label>
                <textarea
                  rows={4}
                  required
                  value={newPrompt}
                  onChange={(e) => setNewPrompt(e.target.value)}
                  placeholder="Escribe la instrucción teológica que los estudiantes deben responder..."
                  className="w-full p-2.5 border rounded-xl focus:outline-none focus:ring-1 focus:ring-utla-navy"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewForumModal(false)}
                  className="px-4 py-2 border rounded-xl font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-utla-navy text-white font-extrabold rounded-xl hover:bg-utla-navy-light"
                >
                  Abrir Foro para la Cátedra
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
