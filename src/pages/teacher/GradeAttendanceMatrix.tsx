import React, { useState, useEffect } from 'react';
import {
  FileSpreadsheet,
  Printer,
  Save,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Info,
  Calendar,
  Clock,
  User,
  Plus,
  UserPlus,
  BookOpen,
  GraduationCap,
  Sparkles,
  X
} from 'lucide-react';
import {
  ALL_TEACHER_CLASSES_DATA,
  TEACHER_CLASSES,
  ClassGradebookData
} from '../../mocks/academicData';
import { StudentGradeRow, AttendanceCode, ClassMatrixMeta } from '../../types/gradeMatrix';

export const GradeAttendanceMatrix: React.FC = () => {
  // Initialize gradebook data with localStorage persistence or fallback to mock data
  const [classesData, setClassesData] = useState<Record<string, ClassGradebookData>>(() => {
    try {
      const saved = localStorage.getItem('utla_classes_gradebook');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return ALL_TEACHER_CLASSES_DATA;
  });

  const [selectedClassCode, setSelectedClassCode] = useState<string>('CEB103');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAddGradeModal, setShowAddGradeModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New Grade Modal State
  const [newGradeTitle, setNewGradeTitle] = useState('Control de Lectura 2');
  const [targetColumn, setTargetColumn] = useState<'t1' | 't2' | 't3' | 't4' | 't6' | 'f1' | 'f2' | 'f5' | 'tgScore' | 'efScore'>('t2');
  const [defaultPoints, setDefaultPoints] = useState<number>(3.3);

  // New Student Modal State
  const [newStudentCode, setNewStudentCode] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentPhone, setNewStudentPhone] = useState('555-000-1122');

  // Active class data
  const activeClass = classesData[selectedClassCode] || classesData['CEB103'];
  const { meta, rows } = activeClass;

  // Persist to localStorage whenever classesData changes
  useEffect(() => {
    try {
      localStorage.setItem('utla_classes_gradebook', JSON.stringify(classesData));
    } catch (e) {
      console.error(e);
    }
  }, [classesData]);

  // Dynamic statistics recalculated based on current rows
  const recalculateClassStats = (currentRows: StudentGradeRow[]) => {
    if (currentRows.length === 0) return { highest: 0, lowest: 0, average: 0, active: 0 };

    const validScores = currentRows.map((r) => r.gradePercentage);
    const highest = Math.max(...validScores);
    const lowest = Math.min(...validScores);
    const sum = validScores.reduce((acc, curr) => acc + curr, 0);
    const average = parseFloat((sum / currentRows.length).toFixed(2));
    const active = currentRows.filter((r) => r.gradePercentage > 0).length;

    return { highest, lowest, average, active };
  };

  // Helper to recalculate a row's percentage and letter grade
  const handleScoreChange = (index: number, field: keyof StudentGradeRow, value: number) => {
    setClassesData((prev) => {
      const currentClass = prev[selectedClassCode];
      const updatedRows = [...currentClass.rows];
      const row = { ...updatedRows[index], [field]: value };

      // Total sum of homeworks + forums + attendance + group + final exam
      const assignmentsSum =
        row.t1 + row.f1 + row.t2 + row.f2 + row.t3 + row.t4 + row.f5 + row.t6;
      const totalScore = assignmentsSum + row.aScore + row.tgScore + row.efScore;
      row.gradePercentage = parseFloat(Math.min(100, Math.max(0, totalScore)).toFixed(2));

      // Calculate letter grade
      if (row.gradePercentage >= 90) row.letterGrade = 'A';
      else if (row.gradePercentage >= 80) row.letterGrade = 'B';
      else if (row.gradePercentage >= 70) row.letterGrade = 'C';
      else row.letterGrade = 'F';

      updatedRows[index] = row;

      const stats = recalculateClassStats(updatedRows);
      const updatedMeta: ClassMatrixMeta = {
        ...currentClass.meta,
        highestScore: stats.highest,
        lowestScore: stats.lowest,
        classAverage: stats.average,
        activeStudents: stats.active,
      };

      return {
        ...prev,
        [selectedClassCode]: {
          meta: updatedMeta,
          rows: updatedRows,
        },
      };
    });
  };

  // Helper to change student attendance
  const handleAttendanceChange = (
    rowIndex: number,
    day: 'd1' | 'd2' | 'd3' | 'd4' | 'd5',
    code: AttendanceCode
  ) => {
    setClassesData((prev) => {
      const currentClass = prev[selectedClassCode];
      const updatedRows = [...currentClass.rows];
      const row = { ...updatedRows[rowIndex] };
      row.attendance = { ...row.attendance, [day]: code };

      // Count absences
      let absences = 0;
      Object.values(row.attendance).forEach((val) => {
        if (val === 'A' || val === 'W') absences++;
      });
      row.totalAttendance = absences;

      updatedRows[rowIndex] = row;

      return {
        ...prev,
        [selectedClassCode]: {
          ...currentClass,
          rows: updatedRows,
        },
      };
    });
  };

  // Apply batch grade from modal
  const handleApplyBatchGrade = (e: React.FormEvent) => {
    e.preventDefault();
    setClassesData((prev) => {
      const currentClass = prev[selectedClassCode];
      const updatedRows = currentClass.rows.map((r) => {
        const row = { ...r, [targetColumn]: defaultPoints };
        const assignmentsSum =
          row.t1 + row.f1 + row.t2 + row.f2 + row.t3 + row.t4 + row.f5 + row.t6;
        const totalScore = assignmentsSum + row.aScore + row.tgScore + row.efScore;
        row.gradePercentage = parseFloat(Math.min(100, Math.max(0, totalScore)).toFixed(2));

        if (row.gradePercentage >= 90) row.letterGrade = 'A';
        else if (row.gradePercentage >= 80) row.letterGrade = 'B';
        else if (row.gradePercentage >= 70) row.letterGrade = 'C';
        else row.letterGrade = 'F';

        return row;
      });

      const stats = recalculateClassStats(updatedRows);
      return {
        ...prev,
        [selectedClassCode]: {
          meta: {
            ...currentClass.meta,
            highestScore: stats.highest,
            lowestScore: stats.lowest,
            classAverage: stats.average,
            activeStudents: stats.active,
          },
          rows: updatedRows,
        },
      };
    });

    setShowAddGradeModal(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Add new student to roster
  const handleAddNewStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;

    const generatedCode = newStudentCode || `7732${Math.floor(1000 + Math.random() * 9000)}`;
    const newStudent: StudentGradeRow = {
      index: rows.length + 1,
      code: generatedCode,
      name: newStudentName.trim(),
      email: newStudentEmail || `${newStudentName.toLowerCase().replace(/[\s,]+/g, '.')}@myutla.org`,
      phone: newStudentPhone || '555-900-1234',
      attendance: { d1: 'P', d2: 'P', d3: 'P', d4: 'P', d5: 'P' },
      totalAttendance: 0,
      t1: 3.3,
      f1: 2.5,
      t2: 3.0,
      f2: 2.5,
      t3: 3.0,
      t4: 2.5,
      f5: 3.0,
      t6: 2.5,
      aScore: 15,
      tgScore: 19.0,
      efScore: 28.0,
      gradePercentage: 94.3,
      letterGrade: 'A',
    };

    setClassesData((prev) => {
      const currentClass = prev[selectedClassCode];
      const updatedRows = [...currentClass.rows, newStudent];
      const stats = recalculateClassStats(updatedRows);

      return {
        ...prev,
        [selectedClassCode]: {
          meta: {
            ...currentClass.meta,
            totalRegistered: updatedRows.length,
            highestScore: stats.highest,
            lowestScore: stats.lowest,
            classAverage: stats.average,
            activeStudents: stats.active,
          },
          rows: updatedRows,
        },
      };
    });

    setShowAddStudentModal(false);
    setNewStudentName('');
    setNewStudentCode('');
    setNewStudentEmail('');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleFinalSubmit = () => {
    setShowConfirmModal(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  // Export current class CSV
  const exportToCsv = () => {
    const headers = [
      '#',
      'Codigo',
      'Nombre',
      'Email',
      'Telefono',
      'Asist D1',
      'D2',
      'D3',
      'D4',
      'D5',
      'Faltas',
      'T1',
      'F1',
      'T2',
      'F2',
      'T3',
      'T4',
      'F5',
      'T6',
      'Asistencia',
      'TrabajoGrupal',
      'ExamenFinal',
      'GradoFinalPre',
      'Final',
    ];
    const csvRows = [headers.join(',')];

    rows.forEach((r) => {
      const line = [
        r.index,
        r.code,
        `"${r.name}"`,
        r.email,
        r.phone,
        r.attendance.d1,
        r.attendance.d2,
        r.attendance.d3,
        r.attendance.d4,
        r.attendance.d5,
        r.totalAttendance,
        r.t1,
        r.f1,
        r.t2,
        r.f2,
        r.t3,
        r.t4,
        r.f5,
        r.t6,
        r.aScore,
        r.tgScore,
        r.efScore,
        r.gradePercentage,
        r.letterGrade,
      ];
      csvRows.push(line.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `UTLA_Calificaciones_${meta.classCode}_${meta.sectionKey}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* 1. Class Selection Cards Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-utla-gold block">
              PORTAL: MAESTRO • EVALUACIÓN ACADÉMICA
            </span>
            <h2 className="text-base sm:text-lg font-black text-utla-navy font-serif uppercase tracking-tight">
              Selecciona la Asignatura a Calificar
            </h2>
          </div>

          <span className="text-xs text-slate-500 font-semibold">
            {TEACHER_CLASSES.length} Clases Cátedra Asignadas
          </span>
        </div>

        {/* Classes Horizontal Carousel / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {TEACHER_CLASSES.map((cls) => {
            const isSelected = selectedClassCode === cls.code;
            const currentRoster = classesData[cls.code]?.rows || [];
            return (
              <div
                key={cls.id}
                onClick={() => setSelectedClassCode(cls.code)}
                className={`cursor-pointer rounded-xl p-3.5 border transition-all text-left flex flex-col justify-between ${
                  isSelected
                    ? 'bg-utla-navy text-white border-utla-gold ring-2 ring-utla-gold/60 shadow-md scale-[1.02]'
                    : 'bg-slate-50 hover:bg-white text-slate-800 border-slate-200 hover:border-utla-navy/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-black ${
                        isSelected
                          ? 'bg-utla-gold text-utla-navy-deep'
                          : 'bg-blue-100 text-utla-navy'
                      }`}
                    >
                      {cls.code}
                    </span>
                    <span
                      className={`text-[10px] font-bold ${
                        isSelected ? 'text-amber-300' : 'text-slate-500'
                      }`}
                    >
                      {currentRoster.length} alumnos
                    </span>
                  </div>

                  <h3
                    className={`font-black text-xs leading-tight line-clamp-2 ${
                      isSelected ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {cls.name}
                  </h3>
                </div>

                <div
                  className={`mt-2 pt-2 border-t text-[10px] flex items-center justify-between ${
                    isSelected ? 'border-white/20 text-slate-300' : 'border-slate-200 text-slate-500'
                  }`}
                >
                  <span>{cls.schedule}</span>
                  {isSelected && <span className="font-extrabold text-utla-gold">● Activa</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Top Header Information & Actions */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-black bg-amber-100 text-amber-900 border border-amber-300">
                {meta.classCode}
              </span>
              <h1 className="text-lg sm:text-xl font-black text-utla-navy uppercase font-serif tracking-tight">
                {meta.className}
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Registro oficial de asistencia presencial/virtual y cómputo de actas de notas
            </p>
          </div>

          {/* Action Buttons: Export to Excel, Add Grade, Add Student, Print, Save Changes */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAddGradeModal(true)}
              className="px-3.5 py-2 rounded-xl bg-utla-gold hover:bg-amber-400 text-utla-navy font-black text-xs flex items-center gap-1.5 transition-all shadow-xs"
              title="Añadir una nueva columna o nota a los estudiantes"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar Evaluación</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAddStudentModal(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-300"
              title="Matricular un nuevo estudiante en esta clase"
            >
              <UserPlus className="w-4 h-4 text-utla-navy" />
              <span>Inscribir Estudiante</span>
            </button>

            <button
              type="button"
              onClick={exportToCsv}
              className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Exportar Excel</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Printer className="w-4 h-4 text-utla-navy" />
              <span>Imprimir</span>
            </button>

            <button
              type="button"
              onClick={() => setShowConfirmModal(true)}
              className="px-4 py-2 rounded-xl bg-utla-navy hover:bg-utla-navy-light text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
            >
              <Save className="w-4 h-4 text-utla-gold" />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </div>

        {/* Class metadata bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">PROFESOR:</span>
            <span className="font-extrabold text-slate-900">{meta.professorName}</span>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">CÓDIGO CLASE:</span>
            <span className="font-extrabold text-utla-gold font-mono">{meta.classCode}</span>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">CLAVE DE SECCIÓN:</span>
            <span className="font-extrabold text-slate-800 font-mono">{meta.sectionKey}</span>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">DÍA Y HORA:</span>
            <span className="font-extrabold text-slate-800">{meta.dayTime}</span>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">FECHA INICIO:</span>
            <span className="font-extrabold text-slate-800">{meta.startDate}</span>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">FECHA FIN:</span>
            <span className="font-extrabold text-slate-800">{meta.endDate}</span>
          </div>
        </div>
      </div>

      {saveSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>¡Calificaciones y asistencia de {meta.className} actualizadas y guardadas con éxito!</span>
        </div>
      )}

      {/* 3. Main Excel-like Matrix Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
        <div className="overflow-x-auto max-h-[580px]">
          <table className="w-full text-left text-xs border-collapse font-sans">
            {/* Table Header Groups */}
            <thead className="bg-[#0F2042] text-white sticky top-0 z-20 select-none">
              <tr className="border-b border-utla-navy-light text-[11px] font-black uppercase tracking-wider text-center">
                <th colSpan={5} className="py-2.5 px-3 bg-[#0A162C] border-r border-slate-700 text-left">
                  DATOS DEL ESTUDIANTE ({rows.length})
                </th>
                <th colSpan={6} className="py-2.5 px-2 bg-[#0F2042] border-r border-slate-700 text-amber-300">
                  ASISTENCIA POR SESIÓN
                </th>
                <th colSpan={11} className="py-2.5 px-2 bg-[#0A162C] border-r border-slate-700 text-white">
                  TRABAJOS Y EVALUACIONES (PUNTOS)
                </th>
                <th colSpan={2} className="py-2.5 px-2 bg-utla-gold text-utla-navy-deep font-extrabold">
                  CALIFICACIÓN FINAL
                </th>
              </tr>
              <tr className="bg-[#152B57] text-slate-200 text-[10px] uppercase font-bold border-b border-slate-700">
                <th className="py-2 px-2 text-center w-8">#</th>
                <th className="py-2 px-2.5 font-mono">CÓDIGO</th>
                <th className="py-2 px-3 min-w-[150px]">NOMBRE DEL ESTUDIANTE</th>
                <th className="py-2 px-2 min-w-[130px]">E-MAIL</th>
                <th className="py-2 px-2 border-r border-slate-700">TELÉFONO</th>

                {/* Asistencia dates */}
                <th className="py-2 px-1 text-center w-9">5</th>
                <th className="py-2 px-1 text-center w-9">12</th>
                <th className="py-2 px-1 text-center w-9">19</th>
                <th className="py-2 px-1 text-center w-9">26</th>
                <th className="py-2 px-1 text-center w-9">2</th>
                <th className="py-2 px-1.5 text-center font-extrabold bg-utla-navy-dark text-amber-300 border-r border-slate-700 w-8">
                  F
                </th>

                {/* Assignments */}
                <th className="py-2 px-1 text-center w-11">T1</th>
                <th className="py-2 px-1 text-center w-11">F1</th>
                <th className="py-2 px-1 text-center w-11">T2</th>
                <th className="py-2 px-1 text-center w-11">F2</th>
                <th className="py-2 px-1 text-center w-11">T3</th>
                <th className="py-2 px-1 text-center w-11">T4</th>
                <th className="py-2 px-1 text-center w-11">F5</th>
                <th className="py-2 px-1 text-center w-11">T6</th>
                <th className="py-2 px-1.5 text-center font-bold bg-blue-950 text-sky-200 w-12">
                  A (15)
                </th>
                <th className="py-2 px-1.5 text-center font-bold bg-blue-950 text-sky-200 w-12">
                  TG (20)
                </th>
                <th className="py-2 px-1.5 text-center font-bold bg-blue-950 text-sky-200 border-r border-slate-700 w-12">
                  EF (30)
                </th>

                {/* Final Grade columns */}
                <th className="py-2 px-2 text-center font-extrabold bg-amber-400 text-utla-navy-dark min-w-[70px]">
                  % PRE
                </th>
                <th className="py-2 px-2 text-center font-extrabold bg-amber-500 text-utla-navy-dark w-14">
                  FINAL
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-200">
              {rows.map((row, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <tr
                    key={`${selectedClassCode}-${row.code}`}
                    className={`hover:bg-amber-50/50 transition-colors ${
                      isEven ? 'bg-white' : 'bg-slate-50/60'
                    }`}
                  >
                    <td className="py-1.5 px-2 text-center font-semibold text-slate-400 text-[11px]">
                      {idx + 1}
                    </td>
                    <td className="py-1.5 px-2 font-mono font-bold text-slate-700 text-[11px]">
                      {row.code}
                    </td>
                    <td className="py-1.5 px-3 font-extrabold text-slate-900 text-xs">
                      {row.name}
                    </td>
                    <td className="py-1.5 px-2 text-slate-500 text-[11px] truncate max-w-[130px]">
                      {row.email}
                    </td>
                    <td className="py-1.5 px-2 text-slate-500 text-[11px] border-r border-slate-200">
                      {row.phone}
                    </td>

                    {/* Attendance Dropdowns */}
                    {(['d1', 'd2', 'd3', 'd4', 'd5'] as const).map((dayKey) => {
                      const val = row.attendance[dayKey];
                      return (
                        <td key={dayKey} className="py-1 px-1 text-center">
                          <select
                            value={val}
                            onChange={(e) =>
                              handleAttendanceChange(idx, dayKey, e.target.value as AttendanceCode)
                            }
                            className={`w-7 h-6 text-center text-[10px] font-black rounded border cursor-pointer focus:outline-none focus:ring-1 focus:ring-utla-navy ${
                              val === 'P'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : val === 'J'
                                ? 'bg-blue-50 text-blue-800 border-blue-300'
                                : val === 'A'
                                ? 'bg-rose-100 text-rose-800 border-rose-400 font-bold'
                                : val === 'W'
                                ? 'bg-slate-200 text-slate-800 border-slate-400'
                                : 'bg-amber-50 text-amber-800 border-amber-300'
                            }`}
                          >
                            <option value="P">P</option>
                            <option value="J">J</option>
                            <option value="A">A</option>
                            <option value="O">O</option>
                            <option value="W">W</option>
                          </select>
                        </td>
                      );
                    })}

                    <td className="py-1.5 px-1.5 text-center font-bold text-slate-700 bg-slate-100 border-r border-slate-200 text-[11px]">
                      {row.totalAttendance}
                    </td>

                    {/* Task inputs */}
                    {(['t1', 'f1', 't2', 'f2', 't3', 't4', 'f5', 't6'] as const).map((taskKey) => (
                      <td key={taskKey} className="py-1 px-0.5 text-center">
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="5"
                          value={row[taskKey]}
                          onChange={(e) =>
                            handleScoreChange(idx, taskKey, parseFloat(e.target.value) || 0)
                          }
                          className="w-10 h-6 text-center text-[11px] font-semibold border border-slate-200 rounded bg-white hover:border-slate-400 focus:border-utla-navy focus:outline-none focus:ring-1 focus:ring-utla-navy"
                        />
                      </td>
                    ))}

                    {/* Attendance Score (max 15) */}
                    <td className="py-1 px-0.5 text-center bg-blue-50/50">
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        max="15"
                        value={row.aScore}
                        onChange={(e) =>
                          handleScoreChange(idx, 'aScore', parseFloat(e.target.value) || 0)
                        }
                        className="w-11 h-6 text-center text-[11px] font-bold text-blue-900 border border-blue-200 rounded bg-white focus:outline-none"
                      />
                    </td>

                    {/* Group Work Score (max 20) */}
                    <td className="py-1 px-0.5 text-center bg-blue-50/50">
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        max="20"
                        value={row.tgScore}
                        onChange={(e) =>
                          handleScoreChange(idx, 'tgScore', parseFloat(e.target.value) || 0)
                        }
                        className="w-11 h-6 text-center text-[11px] font-bold text-blue-900 border border-blue-200 rounded bg-white focus:outline-none"
                      />
                    </td>

                    {/* Final Exam Score (max 30) */}
                    <td className="py-1 px-0.5 text-center bg-blue-50/50 border-r border-slate-200">
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        max="30"
                        value={row.efScore}
                        onChange={(e) =>
                          handleScoreChange(idx, 'efScore', parseFloat(e.target.value) || 0)
                        }
                        className="w-11 h-6 text-center text-[11px] font-bold text-blue-900 border border-blue-200 rounded bg-white focus:outline-none"
                      />
                    </td>

                    {/* % GRADO FINAL PRE */}
                    <td className="py-1.5 px-2 text-center font-black text-xs text-slate-900 bg-amber-50">
                      {row.gradePercentage.toFixed(2)}%
                    </td>

                    {/* FINAL LETTER GRADE */}
                    <td className="py-1.5 px-2 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded font-black text-xs ${
                          row.letterGrade === 'A' || row.letterGrade === 'A+'
                            ? 'bg-emerald-100 text-emerald-800'
                            : row.letterGrade === 'B' || row.letterGrade === 'B+'
                            ? 'bg-blue-100 text-blue-800'
                            : row.letterGrade === 'C'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {row.letterGrade}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Bottom Summary Cards matching Mockup 6 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
        {/* CLAVE DE ASISTENCIA */}
        <div className="md:col-span-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle space-y-2">
          <h3 className="font-extrabold text-utla-navy uppercase text-[11px] border-b pb-1.5">
            CLAVE DE ASISTENCIA
          </h3>
          <div className="space-y-1.5 text-slate-700">
            <div className="flex items-center justify-between">
              <span><strong>P</strong> Presente</span>
              <span className="w-5 h-5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center justify-center">P</span>
            </div>
            <div className="flex items-center justify-between">
              <span><strong>J</strong> Justificado</span>
              <span className="w-5 h-5 rounded bg-blue-100 text-blue-800 text-[10px] font-black flex items-center justify-center">J</span>
            </div>
            <div className="flex items-center justify-between">
              <span><strong>W</strong> Dejó Clase</span>
              <span className="w-5 h-5 rounded bg-slate-200 text-slate-800 text-[10px] font-black flex items-center justify-center">W</span>
            </div>
            <div className="flex items-center justify-between">
              <span><strong>A</strong> Ausente</span>
              <span className="w-5 h-5 rounded bg-rose-100 text-rose-800 text-[10px] font-black flex items-center justify-center">A</span>
            </div>
            <div className="flex items-center justify-between">
              <span><strong>O</strong> Oyente</span>
              <span className="w-5 h-5 rounded bg-amber-100 text-amber-800 text-[10px] font-black flex items-center justify-center">O</span>
            </div>
          </div>
        </div>

        {/* RESUMEN DE LA CLASE */}
        <div className="md:col-span-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle space-y-2">
          <h3 className="font-extrabold text-utla-navy uppercase text-[11px] border-b pb-1.5">
            RESUMEN DE LA CLASE
          </h3>
          <div className="space-y-1.5 text-slate-700">
            <div className="flex items-center justify-between">
              <span>Estudiantes Registrados:</span>
              <strong className="text-slate-900">{rows.length}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Estudiantes Activos:</span>
              <strong className="text-emerald-700">{meta.activeStudents}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Estudiantes Ausentes:</span>
              <strong className="text-rose-700">{meta.droppedStudents}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Oyentes:</span>
              <strong className="text-slate-600">{meta.auditorStudents}</strong>
            </div>
          </div>
        </div>

        {/* TOTALES Y PUNTOS */}
        <div className="md:col-span-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle space-y-2">
          <h3 className="font-extrabold text-utla-navy uppercase text-[11px] border-b pb-1.5">
            ESTADÍSTICAS DEL GRUPO
          </h3>
          <div className="space-y-1 text-slate-700">
            <div className="flex items-center justify-between">
              <span>Total Puntos Posibles:</span>
              <strong className="text-utla-navy font-black">{meta.totalPossiblePoints}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Punto Más Alto:</span>
              <strong className="text-emerald-700 font-bold">{meta.highestScore}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Punto Más Bajo:</span>
              <strong className="text-rose-700 font-bold">{meta.lowestScore}</strong>
            </div>
            <div className="flex items-center justify-between pt-1 border-t">
              <span className="font-bold text-utla-navy">Promedio de la Clase:</span>
              <span className="text-sm font-black text-utla-navy bg-amber-100 px-2 py-0.5 rounded">
                {meta.classAverage}
              </span>
            </div>
          </div>
        </div>

        {/* COMENTARIOS Y FIRMA */}
        <div className="md:col-span-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle space-y-2">
          <h3 className="font-extrabold text-utla-navy uppercase text-[11px] border-b pb-1.5">
            COMENTARIOS DEL PROFESOR
          </h3>
          <textarea
            rows={2}
            value={meta.professorComments}
            onChange={(e) => {
              const val = e.target.value;
              setClassesData((prev) => ({
                ...prev,
                [selectedClassCode]: {
                  ...prev[selectedClassCode],
                  meta: { ...prev[selectedClassCode].meta, professorComments: val },
                },
              }));
            }}
            className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-utla-navy"
          />
          <div className="pt-2 border-t text-[11px] flex items-center justify-between text-slate-600">
            <div>
              <span className="block text-[10px] text-slate-400 uppercase">FIRMA PROFESOR:</span>
              <strong className="font-serif italic text-utla-navy">{meta.professorSignature}</strong>
            </div>
            <div className="text-right">
              <span className="block text-[10px] text-slate-400 uppercase">FECHA:</span>
              <strong className="font-mono">{meta.signatureDate}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Modal 1: Agregar Evaluación */}
      {showAddGradeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-utla-gold tracking-wider">
                  CÁTEDRA {meta.classCode}
                </span>
                <h3 className="font-extrabold text-sm text-utla-navy font-serif uppercase">
                  Agregar Nueva Evaluación
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddGradeModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplyBatchGrade} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nombre de la Evaluación:</label>
                <input
                  type="text"
                  required
                  value={newGradeTitle}
                  onChange={(e) => setNewGradeTitle(e.target.value)}
                  placeholder="Ej. Control de Lectura 2, Exégesis Paulina"
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Columna / Tipo de Trabajo:</label>
                <select
                  value={targetColumn}
                  onChange={(e) => setTargetColumn(e.target.value as any)}
                  className="w-full p-2.5 border rounded-xl bg-white"
                >
                  <option value="t1">Tarea 1 (T1 - Máx 3.33 pts)</option>
                  <option value="t2">Tarea 2 (T2 - Máx 3.33 pts)</option>
                  <option value="t3">Tarea 3 (T3 - Máx 3.33 pts)</option>
                  <option value="t4">Tarea 4 (T4 - Máx 2.5 pts)</option>
                  <option value="t6">Tarea 6 (T6 - Máx 2.5 pts)</option>
                  <option value="f1">Foro 1 (F1 - Máx 2.5 pts)</option>
                  <option value="f2">Foro 2 (F2 - Máx 2.5 pts)</option>
                  <option value="f5">Foro 5 (F5 - Máx 3.33 pts)</option>
                  <option value="tgScore">Trabajo Grupal (TG - Máx 20 pts)</option>
                  <option value="efScore">Examen Final (EF - Máx 30 pts)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Puntos a Asignar a los Alumnos:</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="30"
                  required
                  value={defaultPoints}
                  onChange={(e) => setDefaultPoints(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 border rounded-xl font-mono font-bold text-utla-navy"
                />
                <span className="text-[10.5px] text-slate-400 mt-1 block">
                  Se asignará esta nota base a todos los alumnos de la clase. Luego podrá ajustar individualmente en la tabla.
                </span>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddGradeModal(false)}
                  className="px-4 py-2 border rounded-xl font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-utla-navy text-white font-extrabold rounded-xl hover:bg-utla-navy-light"
                >
                  Aplicar Evaluación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Inscribir Estudiante */}
      {showAddStudentModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-utla-gold tracking-wider">
                  CLASE {meta.classCode}
                </span>
                <h3 className="font-extrabold text-sm text-utla-navy font-serif uppercase">
                  Inscribir Alumno a la Clase
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddStudentModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewStudent} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nombre Completo del Estudiante:</label>
                <input
                  type="text"
                  required
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="Ej. Castillo, Fernando"
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Código de Estudiante (Opcional):</label>
                <input
                  type="text"
                  value={newStudentCode}
                  onChange={(e) => setNewStudentCode(e.target.value)}
                  placeholder="Ej. 77321200 (Autogenerado si está vacío)"
                  className="w-full p-2.5 border rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Correo Electrónico:</label>
                <input
                  type="email"
                  value={newStudentEmail}
                  onChange={(e) => setNewStudentEmail(e.target.value)}
                  placeholder="f.castillo@myutla.org"
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Teléfono:</label>
                <input
                  type="text"
                  value={newStudentPhone}
                  onChange={(e) => setNewStudentPhone(e.target.value)}
                  placeholder="555-900-1234"
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-4 py-2 border rounded-xl font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-utla-navy text-white font-extrabold rounded-xl hover:bg-utla-navy-light"
                >
                  Inscribir Alumno
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal matching Mockup 6 */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border-2 border-utla-navy text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto ring-4 ring-amber-50">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-black text-utla-navy uppercase font-serif">
              Confirmación de Calificaciones
            </h3>

            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              Los Grados Finales de <strong>{meta.className} ({meta.classCode})</strong> serán enviados
              y no podrá hacer más cambios en el sistema. ¿Desea continuar y formalizar el acta académica?
            </p>

            <div className="pt-3 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="w-28 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 uppercase tracking-wider transition-colors"
              >
                NO
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="w-28 py-2.5 rounded-xl bg-utla-navy text-white text-xs font-black uppercase tracking-wider hover:bg-utla-navy-light shadow-md transition-all"
              >
                SÍ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
