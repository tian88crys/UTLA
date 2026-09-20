import React, { useState } from 'react';
import {
  MessagesSquare,
  MessageSquare,
  Search,
  Plus,
  Heart,
  Share2,
  Clock,
  User,
  CheckCircle2,
  Pin,
  ChevronRight,
  Send,
  BookOpen,
  X
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

interface ForumReply {
  id: string;
  authorName: string;
  authorRole: 'PROFESSOR' | 'STUDENT' | 'CHAPLAIN';
  avatarUrl: string;
  timestamp: string;
  content: string;
  likes: number;
}

interface ForumThread {
  id: string;
  title: string;
  category: 'TEOLOGIA' | 'ORACION' | 'CONSULTAS';
  authorName: string;
  authorRole: 'PROFESSOR' | 'STUDENT' | 'CHAPLAIN';
  avatarUrl: string;
  timestamp: string;
  pinned?: boolean;
  content: string;
  scriptureVerse?: string;
  replies: ForumReply[];
}

export const StudentForums: React.FC = () => {
  const { user } = useAuthStore();
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'TEOLOGIA' | 'ORACION' | 'CONSULTAS'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeThreadId, setActiveThreadId] = useState<string>('thr-1');
  const [newReplyText, setNewReplyText] = useState('');
  const [showNewTopicModal, setShowNewTopicModal] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicCategory, setNewTopicCategory] = useState<'TEOLOGIA' | 'ORACION' | 'CONSULTAS'>('TEOLOGIA');
  const [newTopicContent, setNewTopicContent] = useState('');

  const [threads, setThreads] = useState<ForumThread[]>([
    {
      id: 'thr-1',
      title: 'Debate Semana 3: La Justificación por la Fe en la Teología Paulina (Romanos vs. Gálatas)',
      category: 'TEOLOGIA',
      authorName: 'Pr. Luis A. Rentería',
      authorRole: 'PROFESSOR',
      avatarUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
      timestamp: 'Publicado hace 2 días',
      pinned: true,
      scriptureVerse: 'Gálatas 2:15-16 | Romanos 3:28',
      content:
        'Apreciados estudiantes y consiervos en Cristo: Al examinar Gálatas 2:16 y Romanos 3:28, el apóstol Pablo establece con firmeza que el hombre es justificado por la fe sin las obras de la ley. ¿De qué manera la doctrina clásica de la imputación de la justicia de Cristo responde a los cuestionamientos de la Nueva Perspectiva sobre Pablo (N.T. Wright / E.P. Sanders)? Espero sus reflexiones teológicas con fundamentación escritural.',
      replies: [
        {
          id: 'rep-1',
          authorName: 'David Alejandro Torres',
          authorRole: 'STUDENT',
          avatarUrl:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
          timestamp: 'Ayer, 16:30 hrs',
          content:
            'Pastor Luis, considero que la insistencia de Pablo en Gálatas radica en desmantelar cualquier confianza soteriológica en los marcadores de identidad judía (circuncisión, sabbat), pero la justificación no es mero estatus eclesiológico, sino una declaración forense real de perdón y justicia en Cristo, tal como señala Romanos 4:5.',
          likes: 4,
        },
        {
          id: 'rep-2',
          authorName: 'Mariana González',
          authorRole: 'STUDENT',
          avatarUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
          timestamp: 'Hoy, 10:15 hrs',
          content:
            'Concuerdo plenamente con David. La doctrina de la imputación (crediting of righteousness) protege la suficiencia de la obra expiatoria en la cruz. Si dependiéramos de la fidelidad comunitaria, la gracia dejaría de ser don gratuito.',
          likes: 6,
        },
        {
          id: 'rep-3',
          authorName: 'Pr. Luis A. Rentería',
          authorRole: 'PROFESSOR',
          avatarUrl:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
          timestamp: 'Hoy, 12:40 hrs',
          content:
            '¡Excelente contribución de ambos! Observen cómo en Gálatas 3:13 Pablo recurre a Deuteronomio 21:23 para fundamentar la sustitución penal. ¿Cómo conecta esto con la vida práctica de una congregación hoy?',
          likes: 8,
        },
      ],
    },
    {
      id: 'thr-2',
      title: 'Clamor Comunitario: Peticiones de Oración por las Familias e Iglesias Locales',
      category: 'ORACION',
      authorName: 'Capellanía Universitaria UTLA',
      authorRole: 'CHAPLAIN',
      avatarUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      timestamp: 'Publicado hace 3 días',
      scriptureVerse: 'Santiago 5:16 | Filipenses 4:6',
      content:
        'Hermanos, abrimos este espacio fraternal para compartir cargas, peticiones de salud, sostenimiento ministerial y testimonios de las bendiciones de Dios en sus congregaciones.',
      replies: [
        {
          id: 'rep-4',
          authorName: 'Carlos E. Ramírez',
          authorRole: 'STUDENT',
          avatarUrl:
            'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=250',
          timestamp: 'Ayer, 09:20 hrs',
          content:
            'Pido oración por la plantación de la nueva misión en el Valle de San Fernando. Dios está tocando corazones jóvenes en la comunidad.',
          likes: 5,
        },
      ],
    },
    {
      id: 'thr-3',
      title: 'Duda Metodológica: Citas en formato Turabian para léxicos y fuentes patrísticas',
      category: 'CONSULTAS',
      authorName: 'Mariana González',
      authorRole: 'STUDENT',
      avatarUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
      timestamp: 'Hace 5 horas',
      content:
        'Hermanos, ¿alguien sabe si para citar el Léxico BDAG en la Tarea 2 se debe referenciar el número de página de la 3ra edición o el lema griego principal en nota al pie?',
      replies: [
        {
          id: 'rep-5',
          authorName: 'Pr. Luis A. Rentería',
          authorRole: 'PROFESSOR',
          avatarUrl:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
          timestamp: 'Hace 3 horas',
          content:
            'Hermana Mariana, según la guía UTLA Turabian 9na ed., se cita: Walter Bauer et al., BDAG, s.v. "δικαιοσύνη," pág. 247.',
          likes: 7,
        },
      ],
    },
  ]);

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const filteredThreads = threads.filter((t) => {
    if (selectedCategory !== 'ALL' && t.category !== selectedCategory) return false;
    if (searchQuery && !t.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReplyText.trim()) return;

    const newReply: ForumReply = {
      id: `rep-${Date.now()}`,
      authorName: user?.name || 'Juan Carlos López',
      authorRole: 'STUDENT',
      avatarUrl:
        user?.avatarUrl ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      timestamp: 'Hace un momento',
      content: newReplyText.trim(),
      likes: 0,
    };

    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeThread.id ? { ...t, replies: [...t.replies, newReply] } : t
      )
    );

    setNewReplyText('');
  };

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle.trim() || !newTopicContent.trim()) return;

    const newThread: ForumThread = {
      id: `thr-${Date.now()}`,
      title: newTopicTitle.trim(),
      category: newTopicCategory,
      authorName: user?.name || 'Juan Carlos López',
      authorRole: 'STUDENT',
      avatarUrl:
        user?.avatarUrl ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      timestamp: 'Justo ahora',
      content: newTopicContent.trim(),
      replies: [],
    };

    setThreads([newThread, ...threads]);
    setActiveThreadId(newThread.id);
    setShowNewTopicModal(false);
    setNewTopicTitle('');
    setNewTopicContent('');
  };

  return (
    <div className="space-y-6">
      {/* Header and Action Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase text-utla-gold tracking-widest block">
            PORTAL: ESTUDIANTIL • COMUNIDAD ACADÉMICA
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-utla-navy font-serif">
            Foros de Discusión Teológica
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Espacio de debate bíblico, consultas doctrinales y comunión fraterna en Cristo
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowNewTopicModal(true)}
          className="px-4 py-2.5 bg-utla-navy hover:bg-utla-navy-light text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all flex-shrink-0"
        >
          <Plus className="w-4 h-4 text-utla-gold" />
          <span>Nuevo Tema de Debate</span>
        </button>
      </div>

      {/* Main Layout: Left Thread List (5 cols) & Right Discussion View (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Categories, Search and Thread Cards */}
        <div className="lg:col-span-5 space-y-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl text-xs font-bold">
            {[
              { key: 'ALL', label: 'Todos' },
              { key: 'TEOLOGIA', label: 'Teología CB103' },
              { key: 'ORACION', label: 'Oración' },
              { key: 'CONSULTAS', label: 'Consultas' },
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

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar temas o palabras clave..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-utla-navy shadow-2xs"
            />
          </div>

          {/* Threads List */}
          <div className="space-y-3">
            {filteredThreads.map((thread) => {
              const isSelected = thread.id === activeThread.id;
              return (
                <div
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 text-left ${
                    isSelected
                      ? 'bg-white border-utla-gold ring-2 ring-utla-gold/50 shadow-md'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-subtle'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      {thread.pinned && (
                        <span className="p-1 rounded bg-amber-100 text-amber-800 text-[10px] font-black flex items-center gap-0.5">
                          <Pin className="w-3 h-3" /> Fijado
                        </span>
                      )}
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                          thread.category === 'TEOLOGIA'
                            ? 'bg-blue-100 text-blue-900'
                            : thread.category === 'ORACION'
                            ? 'bg-emerald-100 text-emerald-900'
                            : 'bg-purple-100 text-purple-900'
                        }`}
                      >
                        {thread.category}
                      </span>
                    </div>

                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-utla-gold" />
                      <strong>{thread.replies.length}</strong>
                    </span>
                  </div>

                  <h3 className="font-extrabold text-xs text-utla-navy leading-snug font-serif">
                    {thread.title}
                  </h3>

                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1.5">
                    {thread.content}
                  </p>

                  <div className="flex items-center justify-between text-[10.5px] text-slate-400 pt-3 mt-3 border-t border-slate-100">
                    <span className="font-semibold text-slate-600 truncate max-w-[180px]">
                      Por: {thread.authorName}
                    </span>
                    <span>{thread.timestamp}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Full Thread Discussion View */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-subtle p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            {/* Thread Header & Original Post */}
            <div className="border-b border-slate-200 pb-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-50 text-amber-900 border border-amber-200">
                  {activeThread.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {activeThread.timestamp}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-black text-utla-navy font-serif leading-tight">
                {activeThread.title}
              </h2>

              {activeThread.scriptureVerse && (
                <div className="inline-block bg-blue-50 border border-blue-200 px-3 py-1 rounded-lg text-xs font-bold text-blue-900 font-serif">
                  📖 Cita de Referencia: {activeThread.scriptureVerse}
                </div>
              )}

              {/* Author badge */}
              <div className="flex items-center gap-3 pt-1">
                <img
                  src={activeThread.avatarUrl}
                  alt={activeThread.authorName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-utla-gold/50"
                />
                <div>
                  <h4 className="font-extrabold text-xs text-slate-900">
                    {activeThread.authorName}
                  </h4>
                  <span className="text-[10px] text-utla-gold font-bold uppercase tracking-wider block">
                    {activeThread.authorRole === 'PROFESSOR'
                      ? 'Docente Titular'
                      : activeThread.authorRole === 'CHAPLAIN'
                      ? 'Capellanía UTLA'
                      : 'Estudiante'}
                  </span>
                </div>
              </div>

              {/* Original Content */}
              <div className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200 mt-2 font-sans">
                {activeThread.content}
              </div>
            </div>

            {/* Replies List */}
            <div className="space-y-4">
              <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <MessagesSquare className="w-4 h-4 text-utla-gold" />
                <span>Intervenciones &amp; Respuestas ({activeThread.replies.length})</span>
              </h3>

              {activeThread.replies.length === 0 ? (
                <p className="text-xs text-slate-400 italic text-center py-6">
                  Aún no hay respuestas en este debate. ¡Sé el primero en compartir tu aporte teológico!
                </p>
              ) : (
                <div className="space-y-3.5">
                  {activeThread.replies.map((reply) => {
                    const isProf = reply.authorRole === 'PROFESSOR';
                    return (
                      <div
                        key={reply.id}
                        className={`p-4 rounded-xl border transition-all ${
                          isProf
                            ? 'bg-amber-50/40 border-amber-200 ring-1 ring-amber-200'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={reply.avatarUrl}
                              alt={reply.authorName}
                              className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-300"
                            />
                            <div>
                              <span className="font-extrabold text-xs text-slate-900 block leading-tight">
                                {reply.authorName}
                              </span>
                              <span
                                className={`text-[9px] font-bold uppercase ${
                                  isProf ? 'text-amber-800' : 'text-slate-400'
                                }`}
                              >
                                {isProf ? 'Profesor' : 'Estudiante'}
                              </span>
                            </div>
                          </div>

                          <span className="text-[10px] text-slate-400">{reply.timestamp}</span>
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed pl-9">
                          {reply.content}
                        </p>

                        <div className="flex items-center justify-end gap-3 mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                          <button
                            type="button"
                            onClick={() => alert('¡Aporte apreciado!')}
                            className="flex items-center gap-1 hover:text-rose-600 transition-colors"
                          >
                            <Heart className="w-3.5 h-3.5 text-rose-500" />
                            <span>{reply.likes}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Interactive Reply Input Form */}
          <form onSubmit={handleSendReply} className="pt-4 border-t border-slate-200 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Tu respuesta teológica:</span>
              <span className="text-[10px] text-slate-400 italic">
                (Participando como: {user?.name})
              </span>
            </div>

            <textarea
              rows={3}
              required
              value={newReplyText}
              onChange={(e) => setNewReplyText(e.target.value)}
              placeholder="Escribe tu reflexión, argumento exegético o comentario con respeto y fundamento bíblico..."
              className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-utla-navy bg-slate-50/50"
            />

            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 italic">
                Presiona "Publicar Respuesta" para enviar al foro
              </span>
              <button
                type="submit"
                className="px-5 py-2 bg-utla-navy hover:bg-utla-navy-light text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
              >
                <span>Publicar Respuesta</span>
                <Send className="w-3.5 h-3.5 text-utla-gold" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal: Crear Nuevo Tema */}
      {showNewTopicModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-utla-navy font-serif uppercase">
                Crear Nuevo Tema de Debate
              </h3>
              <button
                type="button"
                onClick={() => setShowNewTopicModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTopic} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Título del Tema:</label>
                <input
                  type="text"
                  required
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                  placeholder="Ej. Análisis de Romanos 8:28 y la Soberanía de Dios"
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Categoría:</label>
                <select
                  value={newTopicCategory}
                  onChange={(e) => setNewTopicCategory(e.target.value as any)}
                  className="w-full p-2.5 border rounded-xl bg-white"
                >
                  <option value="TEOLOGIA">Teología CB103</option>
                  <option value="ORACION">Comunidad &amp; Oración</option>
                  <option value="CONSULTAS">Preguntas al Docente / Consultas</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Contenido de la Propuesta:
                </label>
                <textarea
                  rows={4}
                  required
                  value={newTopicContent}
                  onChange={(e) => setNewTopicContent(e.target.value)}
                  placeholder="Explica la tesis, versículos clave o pregunta de apertura..."
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewTopicModal(false)}
                  className="px-4 py-2 border rounded-xl font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-utla-navy text-white font-extrabold rounded-xl hover:bg-utla-navy-light"
                >
                  Publicar Tema
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
