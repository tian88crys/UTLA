import React from 'react';
import { Award, Printer, Download, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export const StudentGrades: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-utla-navy font-serif">
            Calificaciones &amp; Transcripción No Oficial
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Estudiante: <strong>{user?.name}</strong> • ID: <strong>{user?.studentId}</strong>
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="px-4 py-2 bg-utla-navy text-white rounded-xl text-xs font-bold hover:bg-utla-navy-light flex items-center gap-1.5 shadow-sm"
        >
          <Printer className="w-4 h-4 text-utla-gold" />
          <span>Imprimir Transcripción</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <span className="font-extrabold text-xs text-utla-navy uppercase">
            Semestre Actual: Primavera 2026
          </span>
          <span className="text-xs font-bold text-slate-600">
            Promedio Acumulado: <strong className="text-emerald-700">78.34 / 100 (A)</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0F2042] text-white uppercase text-[11px]">
              <tr>
                <th className="p-3">Código</th>
                <th className="p-3">Asignatura</th>
                <th className="p-3">Profesor</th>
                <th className="p-3 text-center">Créditos</th>
                <th className="p-3 text-center">Asistencia</th>
                <th className="p-3 text-center">% Final</th>
                <th className="p-3 text-center">Grado</th>
                <th className="p-3 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr className="hover:bg-amber-50/40">
                <td className="p-3 font-mono font-bold text-slate-700">CB103</td>
                <td className="p-3 font-bold text-slate-900">Introducción al Nuevo Testamento</td>
                <td className="p-3 text-slate-600">Pr. Luis A. Rentería</td>
                <td className="p-3 text-center">3.0</td>
                <td className="p-3 text-center font-semibold text-emerald-700">95% (4/5)</td>
                <td className="p-3 text-center font-black text-slate-900">91.65%</td>
                <td className="p-3 text-center">
                  <span className="px-2.5 py-0.5 rounded font-black text-xs bg-emerald-100 text-emerald-800">
                    A
                  </span>
                </td>
                <td className="p-3 text-center">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    Aprobada
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
