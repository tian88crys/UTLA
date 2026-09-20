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
  User,
  Shield,
  BookOpen,
  X
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

interface ChatMessage {
  id: string;
  sender: 'ME' | 'THEM';
  text: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  recipientName: string;
  recipientRole: string;
  avatarUrl: string;
  online: boolean;
  unreadCount: number;
  lastMessage: string;
  lastTimestamp: string;
  messages: ChatMessage[];
}

export const StudentMessages: React.FC = () => {
  const { user } = useAuthStore();
  const [search, setSearch] = useState('');
  const [inputText, setInputText] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);
  const [newRecipient, setNewRecipient] = useState('Pr. Luis A. Rentería');
  const [newMsgContent, setNewMsgContent] = useState('');

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 'conv-1',
      recipientName: 'Pr. Luis A. Rentería',
      recipientRole: 'Catedrático Titular - CB103',
      avatarUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
      online: true,
      unreadCount: 1,
      lastMessage: 'Apreciado Juan Carlos, he revisado el bosquejo de tu ensayo...',
      lastTimestamp: '10:45 AM',
      messages: [
        {
          id: 'm-1',
          sender: 'THEM',
          text: 'Paz de Cristo, hermano Juan Carlos. Quería consultarte si tienes dudas respecto al uso de las fuentes primarias para la Tarea 2.',
          timestamp: 'Ayer, 18:20',
        },
        {
          id: 'm-2',
          sender: 'ME',
          text: '¡Amén Pastor Luis! Buenas tardes. Sí, estuve revisando los comentarios de F.F. Bruce y Gordon Fee sobre Gálatas 2:16. Ya tengo el bosquejo exegético casi listo.',
          timestamp: 'Ayer, 19:05',
        },
        {
          id: 'm-3',
          sender: 'THEM',
          text: 'Apreciado Juan Carlos, he revisado el bosquejo de tu ensayo. La delimitación de la perícopa es muy acertada. Asegúrate de contrastar con Romanos 3 en la sección de síntesis.',
          timestamp: 'Hoy, 10:45 AM',
        },
      ],
    },
    {
      id: 'conv-2',
      recipientName: 'Mariana González',
      recipientRole: 'Estudiante • Compañera de Clase',
      avatarUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
      online: false,
      unreadCount: 0,
      lastMessage: '¿Nos reunimos por Zoom a las 7:00 PM para repasar?',
      lastTimestamp: 'Ayer',
      messages: [
        {
          id: 'm-4',
          sender: 'THEM',
          text: 'Hola Juan Carlos, ¿cómo vas con el cuestionario de las cartas paulinas?',
          timestamp: 'Ayer, 15:30',
        },
        {
          id: 'm-5',
          sender: 'ME',
          text: 'Hola Mariana, ya lo entregué. Está bastante accesible si tienes a mano el manual de introducción.',
          timestamp: 'Ayer, 16:00',
        },
        {
          id: 'm-6',
          sender: 'THEM',
          text: '¿Nos reunimos por Zoom a las 7:00 PM para repasar?',
          timestamp: 'Ayer, 16:45',
        },
      ],
    },
    {
      id: 'conv-3',
      recipientName: 'Coordinación Académica UTLA',
      recipientRole: 'Rectoría & Asuntos Estudiantiles',
      avatarUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
      online: true,
      unreadCount: 0,
      lastMessage: 'Confirmación de cupo para el Retiro Espiritual 2026.',
      lastTimestamp: '3 de mayo',
      messages: [
        {
          id: 'm-7',
          sender: 'THEM',
          text: 'Estimado estudiante Juan Carlos López: Le confirmamos que su solicitud para el Retiro de Renovación Ministerial del 15 al 17 de mayo ha sido aprobada. Le esperamos.',
          timestamp: '3 de mayo, 09:10',
        },
      ],
    },
    {
      id: 'conv-4',
      recipientName: 'Soporte Biblioteca Digital',
      recipientRole: 'Recursos Digitales & Logos',
      avatarUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      online: false,
      unreadCount: 0,
      lastMessage: 'Sus credenciales institucionales han sido sincronizadas.',
      lastTimestamp: '28 de abril',
      messages: [
        {
          id: 'm-8',
          sender: 'THEM',
          text: 'Estimado alumno, sus accesos para la colección teológica digital UTLA han sido actualizados con éxito.',
          timestamp: '28 de abril, 11:00',
        },
      ],
    },
  ]);

  const [activeConvId, setActiveConvId] = useState<string>('conv-1');
  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const filteredConversations = conversations.filter(
    (c) =>
      c.recipientName.toLowerCase().includes(search.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
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

  const handleCreateNewConversation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsgContent.trim()) return;

    const existing = conversations.find((c) => c.recipientName === newRecipient);
    if (existing) {
      const msg: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'ME',
        text: newMsgContent.trim(),
        timestamp: 'Ahora',
      };
      setConversations((prev) =>
        prev.map((c) =>
          c.id === existing.id
            ? {
                ...c,
                lastMessage: newMsgContent.trim(),
                lastTimestamp: 'Ahora',
                messages: [...c.messages, msg],
              }
            : c
        )
      );
      setActiveConvId(existing.id);
    } else {
      const newConv: Conversation = {
        id: `conv-${Date.now()}`,
        recipientName: newRecipient,
        recipientRole: 'Contacto Institucional UTLA',
        avatarUrl:
          'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=250',
        online: true,
        unreadCount: 0,
        lastMessage: newMsgContent.trim(),
        lastTimestamp: 'Ahora',
        messages: [
          {
            id: `msg-${Date.now()}`,
            sender: 'ME',
            text: newMsgContent.trim(),
            timestamp: 'Ahora',
          },
        ],
      };
      setConversations([newConv, ...conversations]);
      setActiveConvId(newConv.id);
    }

    setShowNewModal(false);
    setNewMsgContent('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase text-utla-gold tracking-widest block">
            PORTAL: ESTUDIANTIL • COMUNICACIÓN INSTITUCIONAL
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-utla-navy font-serif">
            Bandeja de Mensajes
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Canal directo con profesores, compañeros de clase y departamentos de UTLA
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2.5 bg-utla-navy hover:bg-utla-navy-light text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all flex-shrink-0"
        >
          <Plus className="w-4 h-4 text-utla-gold" />
          <span>Redactar Mensaje</span>
        </button>
      </div>

      {/* Main Messaging Layout */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        {/* Left Side: Conversations List (4 cols) */}
        <div className="lg:col-span-4 border-r border-slate-200 flex flex-col bg-slate-50/50">
          {/* Search Box */}
          <div className="p-4 border-b border-slate-200 bg-white">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar contacto o conversación..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-utla-navy bg-slate-50"
              />
            </div>
          </div>

          {/* Conversations List */}
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
                      alt={conv.recipientName}
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
                        {conv.recipientName}
                      </h4>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">
                        {conv.lastTimestamp}
                      </span>
                    </div>

                    <p className="text-[10.5px] text-slate-400 font-medium truncate">
                      {conv.recipientRole}
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

        {/* Right Side: Chat Window (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-white">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white z-10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={activeConv.avatarUrl}
                  alt={activeConv.recipientName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-utla-gold/60"
                />
                {activeConv.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-1 ring-white" />
                )}
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-utla-navy font-serif">
                  {activeConv.recipientName}
                </h3>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span>{activeConv.recipientRole}</span>
                  <span>•</span>
                  <span
                    className={
                      activeConv.online ? 'text-emerald-600 font-bold' : 'text-slate-400'
                    }
                  >
                    {activeConv.online ? 'En línea' : 'Desconectado'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-slate-600">
              <button
                type="button"
                onClick={() =>
                  alert(`Iniciando llamada institucional con: ${activeConv.recipientName}`)
                }
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-utla-navy transition-colors"
                title="Llamada de audio"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  alert(`Iniciando sesión Zoom de tutoría con: ${activeConv.recipientName}`)
                }
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-utla-navy transition-colors"
                title="Videoconferencia Zoom"
              >
                <Video className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => alert(`Información de contacto de: ${activeConv.recipientName}`)}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-utla-navy transition-colors"
                title="Detalles de contacto"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Flow */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/40">
            <div className="text-center my-2">
              <span className="px-3 py-1 bg-slate-200/60 rounded-full text-[10px] text-slate-600 font-bold uppercase tracking-wider">
                Inicio de la conversación institucional protegida
              </span>
            </div>

            {activeConv.messages.map((msg) => {
              const isMe = msg.sender === 'ME';
              return (
                <div
                  key={msg.id}
                  className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                >
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

          {/* Chat Message Input Box */}
          <form
            onSubmit={handleSendMessage}
            className="p-3.5 border-t border-slate-200 bg-white flex items-center gap-2"
          >
            <button
              type="button"
              onClick={() => alert('Adjuntar archivo académico o imagen')}
              className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              title="Adjuntar archivo"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Enviar mensaje a ${activeConv.recipientName}...`}
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

      {/* Modal Redactar Nuevo Mensaje */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-utla-navy font-serif uppercase">
                Redactar Nuevo Mensaje Institucional
              </h3>
              <button
                type="button"
                onClick={() => setShowNewModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewConversation} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Destinatario:</label>
                <select
                  value={newRecipient}
                  onChange={(e) => setNewRecipient(e.target.value)}
                  className="w-full p-2.5 border rounded-xl bg-white"
                >
                  <option value="Pr. Luis A. Rentería">Pr. Luis A. Rentería (Docente Titular - CB103)</option>
                  <option value="Dr. Juan Pérez">Dr. Juan Pérez (Profesor de Teología)</option>
                  <option value="Mariana González">Mariana González (Estudiante)</option>
                  <option value="Coordinación Académica UTLA">Coordinación Académica &amp; Rectoría</option>
                  <option value="Soporte Biblioteca Digital">Soporte Biblioteca &amp; Recursos</option>
                  <option value="Capellanía y Consejería">Capellanía y Consejería Bíblica</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mensaje:</label>
                <textarea
                  rows={4}
                  required
                  value={newMsgContent}
                  onChange={(e) => setNewMsgContent(e.target.value)}
                  placeholder="Escriba su consulta o comunicación formal..."
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-utla-navy"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 border rounded-xl font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-utla-navy text-white font-extrabold rounded-xl hover:bg-utla-navy-light flex items-center gap-1.5"
                >
                  <span>Enviar Mensaje</span>
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
