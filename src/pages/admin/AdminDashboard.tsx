import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  BookOpen,
  DollarSign,
  ClipboardList,
  FileCheck,
  FolderArchive,
  Mail,
  Library,
  Settings,
  ShieldCheck,
  Plus,
  ChevronRight,
  TrendingUp,
  Clock,
  Calendar,
  Award,
  BarChart3,
  CheckCircle2
} from 'lucide-react';
import { INSTITUTIONAL_ANNOUNCEMENTS } from '../../mocks/academicData';

export const AdminDashboard: React.FC = () => {
  const [showNewAnnouncementModal, setShowNewAnnouncementModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const adminAnnouncements = INSTITUTIONAL_ANNOUNCEMENTS.filter(
    (a) => a.targetRole === 'ADMIN' || a.targetRole === 'ALL'
  );

  return (
    <div className="space-y-6">
      {/* Top Grid: Anuncios Importantes & Resumen Institucional KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 cols: ANUNCIOS IMPORTANTES */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-utla-navy/10 flex items-center justify-center text-utla-navy">
                <BookOpen className="w-4 h-4" />
              </div>
              <h2 className="font-black text-sm text-utla-navy uppercase tracking-wider">
                ANUNCIOS IMPORTANTES
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowNewAnnouncementModal(true)}
                className="px-3 py-1 bg-utla-navy text-white text-[11px] font-bold rounded-lg hover:bg-utla-navy-light transition-colors flex items-center gap-1 shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>NUEVO ANUNCIO</span>
              </button>
              <button
                type="button"
                className="text-xs font-bold text-slate-500 hover:text-utla-navy flex items-center gap-0.5 ml-2"
              >
                <span>Ver todos</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {adminAnnouncements.slice(0, 3).map((ann) => (
              <div
                key={ann.id}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <h3 className="font-bold text-xs text-slate-900">{ann.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{ann.description}</p>
                </div>
                <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs">
                  {ann.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 cols: RESUMEN INSTITUCIONAL (Mockup 7 top-right) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h2 className="font-black text-sm text-utla-navy uppercase tracking-wider">
              RESUMEN INSTITUCIONAL
            </h2>
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Tiempo Real</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            {/* 1,248 Estudiantes Activos */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-utla-navy text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-utla-navy leading-none">1,248</h3>
                <p className="text-[11px] font-semibold text-slate-600 mt-1">Estudiantes Activos</p>
                <span className="text-[10px] text-utla-gold font-bold hover:underline cursor-pointer">
                  Ver detalle &gt;
                </span>
              </div>
            </div>

            {/* 86 Profesores Activos */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 leading-none">86</h3>
                <p className="text-[11px] font-semibold text-slate-600 mt-1">Profesores Activos</p>
                <span className="text-[10px] text-amber-700 font-bold hover:underline cursor-pointer">
                  Ver detalle &gt;
                </span>
              </div>
            </div>

            {/* 118 Clases Activas */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-900 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-utla-navy leading-none">118</h3>
                <p className="text-[11px] font-semibold text-slate-600 mt-1">Clases Activas</p>
                <span className="text-[10px] text-utla-gold font-bold hover:underline cursor-pointer">
                  Ver detalle &gt;
                </span>
              </div>
            </div>

            {/* 24 Programas Académicos */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Library className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 leading-none">24</h3>
                <p className="text-[11px] font-semibold text-slate-600 mt-1">Programas Académicos</p>
                <span className="text-[10px] text-amber-700 font-bold hover:underline cursor-pointer">
                  Ver detalle &gt;
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Grid: Acceso Rápido - Administración Total & Actividad Reciente */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 cols: ACCESO RÁPIDO - ADMINISTRACIÓN TOTAL (12 modules matching Mockup 7) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle">
          <div className="border-b border-slate-100 pb-3 mb-5">
            <h2 className="font-black text-sm text-utla-navy uppercase tracking-wider">
              ACCESO RÁPIDO - ADMINISTRACIÓN TOTAL
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { title: 'GESTIÓN DE USUARIOS', desc: 'Crear, editar y administrar usuarios y roles.', icon: Users },
              { title: 'GESTIÓN ACADÉMICA', desc: 'Administrar programas, clases, sílabus y currículo.', icon: BookOpen },
              { title: 'INSCRIPCIONES', desc: 'Administrar inscripciones, matrículas y registros.', icon: ClipboardList },
              { title: 'CALIFICACIONES', desc: 'Supervisar calificaciones, escalas y actas finales.', icon: Award },
              { title: 'FINANZAS', desc: 'Matrículas, pagos, becas, facturación y contabilidad.', icon: DollarSign },
              { title: 'REPORTES', desc: 'Generar reportes personalizados e institucionales.', icon: BarChart3 },
              { title: 'ARCHIVOS DE ESTUDIANTES', desc: 'Ver y administrar expedientes académicos.', icon: FolderArchive },
              { title: 'TRANSCRIPCIONES OFICIALES', desc: 'Generar y emitir transcripciones oficiales.', icon: FileCheck },
              { title: 'COMUNICACIÓN', desc: 'Enviar anuncios institucionales, circulares y correos.', icon: Mail },
              { title: 'BIBLIOTECA Y RECURSOS', desc: 'Administrar recursos, biblioteca y materiales.', icon: Library },
              { title: 'CONFIGURACIÓN DEL SISTEMA', desc: 'Ajustes generales, periodos y políticas.', icon: Settings },
              { title: 'SEGURIDAD Y AUDITORÍA', desc: 'Monitorear actividades, logs y respaldos.', icon: ShieldCheck },
            ].map((mod, i) => {
              const Icon = mod.icon;
              return (
                <div
                  key={i}
                  onClick={() => alert(`Módulo Administrativo UTLA: ${mod.title}`)}
                  className="cursor-pointer p-4 rounded-xl border border-slate-200 hover:border-utla-gold hover:shadow-md transition-all flex items-start gap-3 group bg-white hover:bg-amber-50/20"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-utla-gold/20 flex items-center justify-center text-utla-navy flex-shrink-0 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-extrabold text-xs text-utla-navy uppercase group-hover:text-amber-800 transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      {mod.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 4 cols: Actividad Reciente & Accesos Frecuentes */}
        <div className="lg:col-span-4 space-y-6">
          {/* ACTIVIDAD RECIENTE */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle">
            <h2 className="font-black text-xs text-slate-500 uppercase tracking-wider mb-4">
              ACTIVIDAD RECIENTE
            </h2>
            <div className="space-y-3.5 text-xs">
              {[
                { title: 'Nuevo estudiante registrado: Ana Torres', time: 'Hace 15 min', icon: Users, color: 'text-blue-600' },
                { title: 'Profesor actualizado: Dr. Juan Pérez', time: 'Hace 45 min', icon: GraduationCap, color: 'text-amber-600' },
                { title: 'Pago recibido: Matrícula Verano 2025', time: 'Hace 1 hora', icon: DollarSign, color: 'text-emerald-600' },
                { title: 'Nueva clase creada: Consejería Bíblica', time: 'Hace 2 horas', icon: BookOpen, color: 'text-purple-600' },
                { title: 'Transcripción oficial emitida: Carlos Ramírez', time: 'Hace 3 horas', icon: FileCheck, color: 'text-utla-navy' },
              ].map((act, i) => {
                const Icon = act.icon;
                return (
                  <div key={i} className="flex items-start justify-between gap-3 p-1.5 hover:bg-slate-50 rounded-lg">
                    <div className="flex items-start gap-2.5">
                      <Icon className={`w-4 h-4 mt-0.5 ${act.color} flex-shrink-0`} />
                      <span className="font-semibold text-slate-800 leading-snug">{act.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">{act.time}</span>
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              className="mt-4 w-full text-center text-xs font-bold text-utla-navy hover:underline block"
            >
              Ver toda la actividad &gt;
            </button>
          </div>

          {/* ACCESOS FRECUENTES */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle">
            <h2 className="font-black text-xs text-slate-500 uppercase tracking-wider mb-4">
              ACCESOS FRECUENTES
            </h2>
            <div className="grid grid-cols-2 gap-3 text-center text-xs">
              <button
                type="button"
                onClick={() => alert('Calendario Académico')}
                className="p-3 rounded-xl border border-slate-200 hover:border-utla-navy hover:bg-slate-50 flex flex-col items-center gap-1.5"
              >
                <Calendar className="w-5 h-5 text-utla-navy" />
                <span className="font-bold text-slate-800 text-[11px]">Calendario Académico</span>
              </button>
              <button
                type="button"
                onClick={() => alert('Respaldos del Sistema')}
                className="p-3 rounded-xl border border-slate-200 hover:border-utla-navy hover:bg-slate-50 flex flex-col items-center gap-1.5"
              >
                <Settings className="w-5 h-5 text-utla-navy" />
                <span className="font-bold text-slate-800 text-[11px]">Respaldos</span>
              </button>
              <button
                type="button"
                onClick={() => alert('Políticas Institucionales')}
                className="p-3 rounded-xl border border-slate-200 hover:border-utla-navy hover:bg-slate-50 flex flex-col items-center gap-1.5"
              >
                <FileCheck className="w-5 h-5 text-utla-navy" />
                <span className="font-bold text-slate-800 text-[11px]">Políticas Institucionales</span>
              </button>
              <button
                type="button"
                onClick={() => alert('Centro de Ayuda Administrativo')}
                className="p-3 rounded-xl border border-slate-200 hover:border-utla-navy hover:bg-slate-50 flex flex-col items-center gap-1.5"
              >
                <Clock className="w-5 h-5 text-utla-navy" />
                <span className="font-bold text-slate-800 text-[11px]">Centro de Ayuda</span>
              </button>
            </div>
            <button
              type="button"
              className="mt-4 w-full text-center text-xs font-bold text-utla-navy hover:underline block"
            >
              Ver todos los accesos &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Summary Bar: RESUMEN GENERAL (Mockup 7 bottom banner) */}
      <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-subtle">
        <h2 className="font-black text-xs text-utla-navy uppercase tracking-wider mb-4">
          RESUMEN GENERAL
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xl font-black text-utla-navy block">1,248</span>
            <span className="text-[11px] font-semibold text-slate-600">Estudiantes Activos</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xl font-black text-amber-700 block">86</span>
            <span className="text-[11px] font-semibold text-slate-600">Profesores Activos</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xl font-black text-utla-navy block">118</span>
            <span className="text-[11px] font-semibold text-slate-600">Clases Activas</span>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="text-xl font-black text-emerald-800 block">$245,680.00</span>
            <span className="text-[11px] font-semibold text-emerald-700">Ingresos del Mes</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xl font-black text-slate-900 block">3,456</span>
            <span className="text-[11px] font-semibold text-slate-600">Inscripciones Totales</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xl font-black text-slate-900 block">2,789</span>
            <span className="text-[11px] font-semibold text-slate-600">Expedientes en Archivo</span>
          </div>
        </div>
      </div>

      {/* Modal for Nuevo Anuncio */}
      {showNewAnnouncementModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="font-extrabold text-base text-utla-navy uppercase font-serif">
              Publicar Nuevo Anuncio Institucional
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Título:</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ej. Convocatoria Asamblea Teológica"
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Descripción:</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Detalles del anuncio..."
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>
            </div>
            <div className="pt-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowNewAnnouncementModal(false)}
                className="px-4 py-2 border rounded-xl text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Anuncio institucional publicado con éxito en todos los portales.');
                  setShowNewAnnouncementModal(false);
                }}
                className="px-5 py-2 bg-utla-navy text-white rounded-xl text-xs font-bold hover:bg-utla-navy-light"
              >
                Publicar Anuncio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
