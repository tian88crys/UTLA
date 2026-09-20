import React, { useState } from 'react';
import {
  Mail,
  Search,
  Send,
  Paperclip,
  CheckCheck,
  Plus,
  Phone,
  Video,
  Info,
  Megaphone,
  User,
  Shield,
  BookOpen,
  CheckCircle2,
  X
} from 'lucide-react';
import { TEACHER_CLASSES } from '../../mocks/academicData';

interface TeacherChatMessage {
  id: string;
  sender: 'ME' | 'THEM';
  text: string;
  timestamp: string;
}

interface TeacherConversation {
  id: string;
  contactName: string;
  contactRole: string;
  avatarUrl: string;
  online: boolean;
  unreadCount: number;
  lastMessage: string;
  lastTimestamp: string;
  messages: TeacherChatMessage[];
}

export const TeacherMessages: React.FC = () => {
  const [search, setSearch] = useState('');
  const [inputText, setInputText] = useState('');
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastCourse, setBroadcastCourse] = useState('CEB103');
  const [broadcastSubject, setBroadcastSubject] = useState('');
  const [broadcastBody, setBroadcastBody] = useState('');
  const [successToast, setSuccessToast] = useState('');

  const [conversations, setConversations] = useState<TeacherConversation[]>([
    {
      id: 'tc-conv-1',
      contactName: 'Juan Carlos López',
      contactRole: 'Estudiante • CEB103',
      avatarUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      online: true,
      unreadCount: 1,
      lastMessage: 'Pastor Luis, le adjunto el bosquejo de la exégesis de Gálatas...',
      lastTimestamp: '10:45 AM',
      messages: [
        {
          id: 'tm-1',
          sender: 'THEM',
          text: 'Paz de Cristo, Dr. Juan Pérez. Le escribo para consultar si en el ensayo de Gálatas podemos contrastar con Romanos 4.',
          timestamp: 'Ayer, 18:20',
        },
        {
          id: 'tm-2',
          sender: 'ME',
          text: 'Paz, hermano Juan Carlos. Desde luego, la comparación entre Romanos 4 y Gálatas 3 enriquecerá mucho tu argumento soteriológico. Asegúrate de citar fuentes primarias.',
          timestamp: 'Ayer, 19:10',
        },
        {
          id: 'tm-3',
          sender: 'THEM',
          text: 'Pastor Luis, le adjunto el bosquejo de la exégesis de Gálatas para su revisión preliminar.',
          timestamp: 'Hoy, 10:45 AM',
        },
      ],
    },
    {
      id: 'tc-conv-2',
      contactName: 'Mariana González',
      contactRole: 'Estudiante • THEO-201',
      avatarUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
      online: false,
      unreadCount: 0,
      lastMessage: 'Muchas gracias por la aclaración sobre la regla de Colwell.',
      lastTimestamp: 'Ayer',
      messages: [
        {
          id: 'tm-4',
          sender: 'THEM',
          text: 'Estimado profesor, tenía dudas sobre la bibliografía recomendada para la hermenéutica de parábolas.',
          timestamp: 'Ayer, 14:00',
        },
        {
          id: 'tm-5',
          sender: 'ME',
          text: 'Hermana Mariana, te recomiendo revisar la obra de Klyne Snodgrass, "Historias con Intención", está disponible en nuestra biblioteca digital.',
          timestamp: 'Ayer, 14:40',
        },
        {
          id: 'tm-6',
          sender: 'THEM',
          text: 'Muchas gracias por la aclaración sobre la regla de Colwell.',
          timestamp: 'Ayer, 15:10',
        },
      ],
    },
    {
      id: 'tc-conv-3',
      contactName: 'Decanato Académico & Rectoría',
      contactRole: 'Dr. Antonio Morales • Vicerrectoría',
      avatarUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
      online: true,
      unreadCount: 0,
      lastMessage: 'Recordatorio formal: Cierre de actas parciales el 18 de mayo.',
      lastTimestamp: '2 días',
      messages: [
        {
          id: 'tm-7',
          sender: 'THEM',
          text: 'Estimado Dr. Juan Pérez: Le recordamos que la fecha límite para formalizar las actas parciales de sus cátedras es el 18 de mayo. Gracias por su fidelidad ministerial.',
          timestamp: 'Hace 2 días, 09:30',
        },
      ],
    },
    {
      id: 'tc-conv-4',
      contactName: 'Claustro Docente UTLA',
      contactRole: 'Coordinación de Profesores',
      avatarUrl:
        'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=250',
      online: true,
      unreadCount: 0,
      lastMessage: 'Reunión general de profesores el 14 de mayo vía Zoom.',
      lastTimestamp: '3 días',
      messages: [
        {
          id: 'tm-8',
          sender: 'THEM',
          text: 'Estimados consiervos y catedráticos: Les convocamos a la asamblea semestral el próximo miércoles 14 de mayo a las 10:00 a.m. Enlace Zoom en el calendario.',
          timestamp: 'Hace 3 días, 11:15',
        },
      ],
    },
  ]);

  const [activeConvId, setActiveConvId] = useState<string>('tc-conv-1');
  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const filteredConversations = conversations.filter(
    (c) =>
      c.contactName.toLowerCase().includes(search.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: TeacherChatMessage = {
      id: `tm-${Date.now()}`,
      sender: 'ME',
      text: inputText.trim(),
      timestamp: 'Ahora',
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConv.id
          ? {
              ...c,
              lastMessage: inputText.trim(),
              lastTimestamp: 'Ahora',
              unreadCount: 0,
              messages: [...c.messages, newMsg],
            }
          : c
      )
    );

    setInputText('');
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastSubject.trim() || !broadcastBody.trim()) return;

    setSuccessToast(
      `¡Comunicado "${broadcastSubject}" enviado exitosamente a todos los alumnos de ${broadcastCourse}!`
    );
    setShowBroadcastModal(false);
    setBroadcastSubject('');
    setBroadcastBody('');
    setTimeout(() => setSuccessToast(''), 4500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase text-utla-gold tracking-widest block">
            PORTAL: MAESTRO • COMUNICACIÓN DE CÁTEDRA
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-utla-navy font-serif">
            Mensajes &amp; Avisos a Estudiantes
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Atención pastoral, consultas académicas y comunicados masivos por asignatura
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowBroadcastModal(true)}
          className="px-4 py-2.5 bg-utla-navy hover:bg-utla-navy-light text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all flex-shrink-0"
        >
          <Megaphone className="w-4 h-4 text-utla-gold" />
          <span>Enviar Comunicado a Clase</span>
        </button>
      </div>

      {successToast && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Main Messaging Interface */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        {/* Left List of Conversations */}
        <div className="lg:col-span-4 border-r border-slate-200 flex flex-col bg-slate-50/50">
          <div className="p-4 border-b border-slate-200 bg-white">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar alumno o departamento..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-utla-navy bg-slate-50"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredConversations.map((conv) => {
              const isSelected = conv.id === activeConv.id;
              return (
                <div
                  key={conv.id}
                  onClick={() => {
                    setActiveConvId(conv.id);
                    setConversations((prev) =>
                      prev.map((c) => (c.id === conv.id ? { ...c, unreadCount: 0 } : c))
                    );
                  }}
                  className={`p-3.5 cursor-pointer transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-white border-l-4 border-utla-gold shadow-xs'
                      : 'hover:bg-slate-100/70'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={conv.avatarUrl}
                      alt={conv.contactName}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-200"
                    />
                    {conv.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4
                        className={`text-xs truncate ${
                          isSelected ? 'font-black text-utla-navy' : 'font-bold text-slate-900'
                        }`}
                      >
                        {conv.contactName}
                      </h4>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">
                        {conv.lastTimestamp}
                      </span>
                    </div>

                    <p className="text-[10.5px] text-slate-400 font-medium truncate">
                      {conv.contactRole}
                    </p>

                    <p className="text-xs text-slate-600 truncate mt-1 leading-snug">
                      {conv.lastMessage}
                    </p>
                  </div>

                  {conv.unreadCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-bold text-[10px] flex items-center justify-center flex-shrink-0 shadow-2xs">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Chat Pane */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-white">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white z-10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={activeConv.avatarUrl}
                  alt={activeConv.contactName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-utla-gold/60"
                />
                {activeConv.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-1 ring-white" />
                )}
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-utla-navy font-serif">
                  {activeConv.contactName}
                </h3>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span>{activeConv.contactRole}</span>
                  <span>•</span>
                  <span className={activeConv.online ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                    {activeConv.online ? 'En línea' : 'Desconectado'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-slate-600">
              <button
                type="button"
                onClick={() =>
                  alert(`Iniciando llamada de tutoría con: ${activeConv.contactName}`)
                }
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-utla-navy transition-colors"
                title="Llamada de tutoría"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  alert(`Generando enlace de tutoría Zoom con: ${activeConv.contactName}`)
                }
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-utla-navy transition-colors"
                title="Videoconferencia Zoom"
              >
                <Video className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => alert(`Ficha de datos del alumno: ${activeConv.contactName}`)}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-utla-navy transition-colors"
                title="Ficha del alumno"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/40">
            <div className="text-center my-2">
              <span className="px-3 py-1 bg-slate-200/60 rounded-full text-[10px] text-slate-600 font-bold uppercase tracking-wider">
                Canal Académico y Pastoral Institucional UTLA
              </span>
            </div>

            {activeConv.messages.map((msg) => {
              const isMe = msg.sender === 'ME';
              return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-md rounded-2xl p-3.5 shadow-2xs text-xs space-y-1 ${
                      isMe
                        ? 'bg-utla-navy text-white rounded-br-none'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                    <div
                      className={`flex items-center justify-end gap-1 text-[10px] ${
                        isMe ? 'text-slate-300' : 'text-slate-400'
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {isMe && <CheckCheck className="w-3 h-3 text-utla-gold" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <form
            onSubmit={handleSendMessage}
            className="p-3.5 border-t border-slate-200 bg-white flex items-center gap-2"
          >
            <button
              type="button"
              onClick={() => alert('Adjuntar material de cátedra o guía de estudio')}
              className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              title="Adjuntar archivo"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Enviar respuesta a ${activeConv.contactName}...`}
              className="flex-1 py-2 px-3.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-utla-navy bg-slate-50"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-utla-navy hover:bg-utla-navy-light disabled:opacity-40 text-white rounded-xl shadow-sm transition-all"
              title="Enviar mensaje"
            >
              <Send className="w-4 h-4 text-utla-gold" />
            </button>
          </form>
        </div>
      </div>

      {/* Modal: Enviar Comunicado a Clase */}
      {showBroadcastModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-utla-gold tracking-wider">
                  CIRCULAR ACADÉMICA
                </span>
                <h3 className="font-extrabold text-base text-utla-navy font-serif uppercase">
                  Comunicado Masivo a la Cátedra
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowBroadcastModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendBroadcast} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Clase Destinataria:</label>
                <select
                  value={broadcastCourse}
                  onChange={(e) => setBroadcastCourse(e.target.value)}
                  className="w-full p-2.5 border rounded-xl bg-white font-bold text-utla-navy"
                >
                  {TEACHER_CLASSES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} - {c.name} ({c.studentsCount} estudiantes)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Asunto del Comunicado:</label>
                <input
                  type="text"
                  required
                  value={broadcastSubject}
                  onChange={(e) => setBroadcastSubject(e.target.value)}
                  placeholder="Ej. Instrucciones para la Entrega del Examen Parcial"
                  className="w-full p-2.5 border rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Cuerpo del Mensaje:</label>
                <textarea
                  rows={4}
                  required
                  value={broadcastBody}
                  onChange={(e) => setBroadcastBody(e.target.value)}
                  placeholder="Estimados alumnos, se les recuerda que la fecha límite..."
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-utla-navy"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowBroadcastModal(false)}
                  className="px-4 py-2 border rounded-xl font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-utla-navy text-white font-extrabold rounded-xl hover:bg-utla-navy-light flex items-center gap-1.5"
                >
                  <span>Enviar a Todos los Alumnos</span>
                  <Send className="w-3.5 h-3.5 text-utla-gold" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
