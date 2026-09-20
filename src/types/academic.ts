export interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  badgeDate?: string;
  targetRole?: 'ALL' | 'STUDENT' | 'TEACHER' | 'ADMIN';
  category?: string;
  link?: string;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  time: string;
  month: string;
  day: string;
  details?: string;
  badge?: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  professor: string;
  professorEmail?: string;
  schedule: string;
  term: string;
  startDate: string;
  endDate: string;
  studentsCount: number;
  credits: number;
  progress?: number;
  syllabusUrl?: string;
  currentStatus?: string;
}

export interface TeacherClass {
  id: string;
  code: string;
  name: string;
  studentsCount: number;
  room?: string;
  schedule: string;
}
