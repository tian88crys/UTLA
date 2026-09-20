import React from 'react';

interface UtlaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textColor?: 'white' | 'navy';
  subtextColor?: 'gold' | 'muted';
}

export const UtlaLogo: React.FC<UtlaLogoProps> = ({
  className = '',
  size = 'md',
  showText = false,
  textColor = 'navy',
  subtextColor = 'gold',
}) => {
  const sizeMap = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Seal Emblem */}
      <div className={`relative flex-shrink-0 ${sizeMap[size]}`}>
        <img
          src="/utla-logo.svg"
          alt="UTLA Sello Oficial"
          className="w-full h-full object-contain drop-shadow-sm"
        />
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-baseline gap-1.5">
            <span
              className={`font-serif tracking-tight font-extrabold uppercase leading-none ${
                size === 'xl' ? 'text-2xl' : size === 'lg' ? 'text-xl' : 'text-lg'
              } ${textColor === 'white' ? 'text-white' : 'text-utla-navy'}`}
            >
              Universidad
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className={`font-serif tracking-tight font-extrabold uppercase leading-tight ${
                size === 'xl' ? 'text-2xl' : size === 'lg' ? 'text-xl' : 'text-lg'
              } ${textColor === 'white' ? 'text-white' : 'text-utla-navy'}`}
            >
              de Teología
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <div className={`h-[1px] w-4 ${textColor === 'white' ? 'bg-utla-gold/60' : 'bg-utla-gold'}`} />
            <span
              className={`text-[10px] font-bold tracking-[0.25em] uppercase ${
                subtextColor === 'gold' ? 'text-utla-gold' : 'text-slate-500'
              }`}
            >
              Los Ángeles
            </span>
            <div className={`h-[1px] w-4 ${textColor === 'white' ? 'bg-utla-gold/60' : 'bg-utla-gold'}`} />
          </div>
          <p className="text-[10.5px] italic text-slate-300 font-light mt-0.5 hidden sm:block">
            Equipando siervos líderes para Cristo y Su Reino
          </p>
        </div>
      )}
    </div>
  );
};
