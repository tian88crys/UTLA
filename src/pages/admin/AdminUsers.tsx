import React, { useState } from 'react';
import { Users, Search, Plus, Filter, MoreVertical, CheckCircle, Shield } from 'lucide-react';
import { UserRole } from '../../types/user';

export const AdminUsers: React.FC = () => {
  const [filterRole, setFilterRole] = useState<'ALL' | UserRole>('ALL');
  const [search, setSearch] = useState('');

  const usersList = [
    { id: '1', name: 'Juan Carlos López', email: 'j.lopez@myutla.org', role: 'STUDENT', code: '77321113', status: 'Activo', prog: 'Licenciatura en Teología' },
    { id: '2', name: 'Dr. Juan Pérez', email: 'juan.perez@docentes.myutla.org', role: 'TEACHER', code: 'DOC-99210', status: 'Activo', prog: 'Facultad de Teología' },
    { id: '3', name: 'Mariana González', email: 'm.gonzalez@myutla.org', role: 'STUDENT', code: '77321085', status: 'Activo', prog: 'Estudios Bíblicos' },
    { id: '4', name: 'Pr. Luis A. Rentería', email: 'luis.renteria@utla.edu', role: 'TEACHER', code: 'DOC-88301', status: 'Activo', prog: 'Nuevo Testamento' },
    { id: '5', name: 'Super Usuario', email: 'rectoria@myutla.org', role: 'ADMIN', code: 'ADM-001', status: 'Activo', prog: 'Rectoría UTLA' },
  ];

  const filtered = usersList.filter((u) => {
    if (filterRole !== 'ALL' && u.role !== filterRole) return false;
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-utla-navy font-serif">Gestión de Usuarios y Roles</h1>
          <p className="text-xs text-slate-500 mt-0.5">Administración integral del padrón estudiantil, docente y administrativo</p>
        </div>
        <button
          type="button"
          onClick={() => alert('Crear nuevo usuario institucional')}
          className="px-4 py-2 bg-utla-navy text-white text-xs font-bold rounded-xl hover:bg-utla-navy-light flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4 text-utla-gold" />
          <span>Nuevo Usuario</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre o correo..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-utla-navy"
            />
          </div>

          <div className="flex items-center gap-2">
            {(['ALL', 'STUDENT', 'TEACHER', 'ADMIN'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setFilterRole(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  filterRole === r
                    ? 'bg-utla-navy text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {r === 'ALL' ? 'Todos' : r === 'STUDENT' ? 'Estudiantes' : r === 'TEACHER' ? 'Profesores' : 'Admins'}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[11px] border-y border-slate-200">
              <tr>
                <th className="p-3">Código</th>
                <th className="p-3">Usuario</th>
                <th className="p-3">Rol</th>
                <th className="p-3">Programa / Área</th>
                <th className="p-3 text-center">Estado</th>
                <th className="p-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-slate-700">{u.code}</td>
                  <td className="p-3">
                    <p className="font-extrabold text-slate-900">{u.name}</p>
                    <p className="text-[11px] text-slate-500">{u.email}</p>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      u.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : u.role === 'TEACHER' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 font-medium">{u.prog}</td>
                  <td className="p-3 text-center">
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {u.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`Editar usuario: ${u.name}`)}
                      className="text-utla-navy hover:underline font-bold text-xs"
                    >
                      Editar
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
