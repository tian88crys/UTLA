export type AttendanceCode = 'P' | 'J' | 'A' | 'O' | 'W';

export interface StudentGradeRow {
  index: number;
  code: string;
  name: string;
  email: string;
  phone: string;
  // Attendance records per session date (e.g. '05-Feb', '12-Feb', etc.)
  attendance: {
    d1: AttendanceCode;
    d2: AttendanceCode;
    d3: AttendanceCode;
    d4: AttendanceCode;
    d5: AttendanceCode;
  };
  totalAttendance: number;
  // Assignments, Forums, Group Works, Final Exam
  t1: number;
  f1: number;
  t2: number;
  f2: number;
  t3: number;
  t4: number;
  f5: number;
  t6: number;
  aScore: number;  // Attendance score points (max 15)
  tgScore: number; // Trabajo Grupal (max 20)
  efScore: number; // Examen Final (max 30)
  gradePercentage: number;
  letterGrade: 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'F';
}

export interface ClassMatrixMeta {
  className: string;
  classCode: string;
  sectionKey: string;
  professorName: string;
  dayTime: string;
  startDate: string;
  endDate: string;
  totalRegistered: number;
  activeStudents: number;
  droppedStudents: number;
  auditorStudents: number;
  totalPossiblePoints: number;
  highestScore: number;
  lowestScore: number;
  classAverage: number;
  professorComments: string;
  professorSignature: string;
  signatureDate: string;
}
