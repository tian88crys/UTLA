import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { BiblicalFooter } from '../components/common/BiblicalFooter';
import { UtlaLogo } from '../components/common/UtlaLogo';

interface AuthLayoutProps {
  children?: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-utla-navy via-[#0c1b38] to-[#060e1c] text-white">
      {/* Top institutional identity bar */}
      <header className="border-b border-utla-navy-light/40 py-3 px-6 bg-utla-navy-dark/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/portal-select" className="hover:opacity-95 transition-opacity">
            <UtlaLogo size="md" showText={true} textColor="white" subtextColor="gold" />
          </Link>
          <div className="flex items-center gap-4 text-xs">
            <Link
              to="/portal-select"
              className="text-utla-gold hover:underline font-semibold tracking-wide"
            >
              Seleccionar Rol
            </Link>
            <span className="text-slate-500">•</span>
            <Link
              to="/login"
              className="text-slate-300 hover:text-white font-medium"
            >
              Iniciar Sesión
            </Link>
            <span className="text-slate-500">•</span>
            <Link
              to="/register"
              className="bg-utla-gold text-utla-navy font-bold px-3 py-1.5 rounded-lg hover:bg-utla-gold-light transition-colors"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </header>

      {/* Main Form Body */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        {children || <Outlet />}
      </main>

      {/* Institutional Scripture & Pillars Footer */}
      <BiblicalFooter variant="login" />
    </div>
  );
};
