import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';

// Auth Pages
import { PortalSelector } from '../pages/auth/PortalSelector';
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';

// Student Pages
import { StudentDashboard } from '../pages/student/StudentDashboard';
import { StudentProfile } from '../pages/student/StudentProfile';
import { StudentCourses } from '../pages/student/StudentCourses';
import { StudentGrades } from '../pages/student/StudentGrades';
import { StudentAssignments } from '../pages/student/StudentAssignments';
import { StudentForums } from '../pages/student/StudentForums';
import { StudentMessages } from '../pages/student/StudentMessages';
import { StudentResources } from '../pages/student/StudentResources';

// Teacher Pages
import { TeacherDashboard } from '../pages/teacher/TeacherDashboard';
import { GradeAttendanceMatrix } from '../pages/teacher/GradeAttendanceMatrix';
import { TeacherSyllabus } from '../pages/teacher/TeacherSyllabus';
import { TeacherMessages } from '../pages/teacher/TeacherMessages';
import { TeacherResources } from '../pages/teacher/TeacherResources';
import { TeacherForums } from '../pages/teacher/TeacherForums';
import { TeacherReports } from '../pages/teacher/TeacherReports';

// Admin Pages
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminUsers } from '../pages/admin/AdminUsers';

export const AppRouter: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Public & Authentication Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/portal-select" element={<PortalSelector />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Student Portal Routes */}
        <Route path="/student" element={<DashboardLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="classes" element={<StudentCourses />} />
          <Route path="assignments" element={<StudentAssignments />} />
          <Route path="forums" element={<StudentForums />} />
          <Route path="grades" element={<StudentGrades />} />
          <Route path="messages" element={<StudentMessages />} />
          <Route path="resources" element={<StudentResources />} />
          <Route path="help" element={<StudentProfile />} />
        </Route>

        {/* Teacher Portal Routes */}
        <Route path="/teacher" element={<DashboardLayout />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="grades" element={<GradeAttendanceMatrix />} />
          <Route path="classes" element={<TeacherDashboard />} />
          <Route path="students" element={<GradeAttendanceMatrix />} />
          <Route path="syllabus" element={<TeacherSyllabus />} />
          <Route path="announcements" element={<TeacherDashboard />} />
          <Route path="messages" element={<TeacherMessages />} />
          <Route path="resources" element={<TeacherResources />} />
          <Route path="forums" element={<TeacherForums />} />
          <Route path="reports" element={<TeacherReports />} />
          <Route path="settings" element={<TeacherDashboard />} />
          <Route path="help" element={<TeacherDashboard />} />
        </Route>

        {/* Administrator Portal Routes */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="students" element={<AdminUsers />} />
          <Route path="teachers" element={<AdminUsers />} />
          <Route path="programs" element={<AdminDashboard />} />
          <Route path="enrollments" element={<AdminDashboard />} />
          <Route path="grades" element={<AdminDashboard />} />
          <Route path="finances" element={<AdminDashboard />} />
          <Route path="reports" element={<AdminDashboard />} />
          <Route path="transcripts" element={<AdminDashboard />} />
          <Route path="archives" element={<AdminDashboard />} />
          <Route path="communication" element={<AdminDashboard />} />
          <Route path="library" element={<AdminDashboard />} />
          <Route path="settings" element={<AdminDashboard />} />
          <Route path="security" element={<AdminDashboard />} />
          <Route path="help" element={<AdminDashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </HashRouter>
  );
};
