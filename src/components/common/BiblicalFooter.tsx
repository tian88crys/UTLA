import React from 'react';
import { BookOpen, Globe, Shield } from 'lucide-react';

interface BiblicalFooterProps {
  variant?: 'login' | 'dashboard';
  className?: string;
}

export const BiblicalFooter: React.FC<BiblicalFooterProps> = ({
  variant = 'dashboard',
  className = '',
}) => {
  if (variant === 'login') {
    return (
      <footer className={`bg-utla-navy-dark text-slate-300 border-t border-utla-navy-light/60 py-4 px-6 select-none ${className}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Scripture verse */}
          <div className="text-xs md:text-sm font-light text-slate-300 max-w-2xl">
            <span className="font-semibold text-utla-gold">2 Timoteo 2:2</span> |{' '}
            <span className="italic">
              "Y las cosas que has oído de mí ante muchos testigos, esto encarga a hombres fieles que sean idóneos para enseñar también a otros."
            </span>
          </div>

          {/* Institutional Pillars */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-semibold tracking-wider uppercase text-slate-200">
            <div className="flex items-center gap-1.5 hover:text-utla-gold transition-colors">
              <div className="w-5 h-5 rounded-full bg-utla-gold/20 flex items-center justify-center text-utla-gold">
                <Shield className="w-3 h-3" />
              </div>
              <span>FUNDADA EN LA BIBLIA</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-utla-gold transition-colors">
              <div className="w-5 h-5 rounded-full bg-utla-gold/20 flex items-center justify-center text-utla-gold">
                <BookOpen className="w-3 h-3" />
              </div>
              <span>ACADÉMICAMENTE EXCELENTE</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-utla-gold transition-colors">
              <div className="w-5 h-5 rounded-full bg-utla-gold/20 flex items-center justify-center text-utla-gold">
                <Globe className="w-3 h-3" />
              </div>
              <span>CON VISIÓN GLOBAL</span>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={`bg-utla-navy-dark text-slate-300 border-t border-utla-navy-light/40 py-3 px-6 text-xs select-none ${className}`}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        {/* Scripture & Copyright */}
        <div className="space-y-1">
          <p className="italic text-[11px] text-slate-300 leading-snug">
            "Pero tú, sigue tú lo que has aprendido y te persuadiste, sabiendo de quién has aprendido;
            y que desde la niñez has sabido las Sagradas Escrituras..."{' '}
            <span className="font-semibold text-utla-gold">2 Timoteo 3:14-15</span>
          </p>
          <p className="text-[10px] text-slate-400">
            © 2025 Universidad de Teología Los Ángeles (UTLA) - Todos los derechos reservados.
          </p>
        </div>

        {/* Pillars Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-utla-navy/80 border border-utla-navy-light text-[11px] font-bold tracking-widest text-slate-200">
          <div className="w-4 h-4 rounded-sm bg-utla-gold/20 flex items-center justify-center text-utla-gold text-[10px]">
            ✝
          </div>
          <span className="text-utla-gold">VERDAD</span>
          <span className="text-slate-500">•</span>
          <span className="text-white">GRACIA</span>
          <span className="text-slate-500">•</span>
          <span className="text-utla-gold">SERVICIO</span>
        </div>
      </div>
    </footer>
  );
};
