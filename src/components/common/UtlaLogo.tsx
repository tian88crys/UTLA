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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 400"
          className="w-full h-full object-contain drop-shadow-sm"
          role="img"
          aria-label="UTLA Sello Oficial"
        >
          <defs>
            <path id="utla-text-arc-top" d="M 50 200 A 150 150 0 1 1 350 200" fill="none" />
            <path id="utla-text-arc-bottom" d="M 68 220 A 140 140 0 0 0 332 220" fill="none" />
            <linearGradient id="utla-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E5D193" />
              <stop offset="50%" stopColor="#C5A859" />
              <stop offset="100%" stopColor="#9C7F31" />
            </linearGradient>
            <radialGradient id="utla-navy-grad" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="#0F2042" />
              <stop offset="100%" stopColor="#08142C" />
            </radialGradient>
          </defs>

          {/* Outer background circle */}
          <circle cx="200" cy="200" r="195" fill="url(#utla-navy-grad)" stroke="url(#utla-gold-grad)" strokeWidth="7" />
          
          {/* Outer decorative border ring */}
          <circle cx="200" cy="200" r="186" fill="none" stroke="#C5A859" strokeWidth="1.8" />
          
          {/* Middle separator ring */}
          <circle cx="200" cy="200" r="142" fill="none" stroke="#C5A859" strokeWidth="2" />
          <circle cx="200" cy="200" r="139" fill="url(#utla-navy-grad)" />

          {/* Top Curved Text: UNIVERSITY OF THEOLOGY */}
          <text fontFamily="'Times New Roman', 'Playfair Display', Georgia, serif" fontSize="20.5" fontWeight="bold" fill="#FFFFFF" letterSpacing="4.5">
            <textPath href="#utla-text-arc-top" startOffset="50%" textAnchor="middle">
              ★ UNIVERSITY OF THEOLOGY ★
            </textPath>
          </text>

          {/* Bottom Curved Text: LOS ANGELES */}
          <text fontFamily="'Times New Roman', 'Playfair Display', Georgia, serif" fontSize="21" fontWeight="bold" fill="#FFFFFF" letterSpacing="5.5">
            <textPath href="#utla-text-arc-bottom" startOffset="50%" textAnchor="middle">
              LOS ANGELES
            </textPath>
          </text>

          {/* Decorative small dots on ring */}
          <circle cx="95" cy="235" r="3.5" fill="#FFFFFF" />
          <circle cx="108" cy="250" r="3.5" fill="#FFFFFF" />
          <circle cx="305" cy="235" r="3.5" fill="#FFFFFF" />
          <circle cx="292" cy="250" r="3.5" fill="#FFFFFF" />

          {/* Central Emblem Elements */}
          {/* Golden Cross */}
          <rect x="196" y="132" width="8" height="118" fill="url(#utla-gold-grad)" rx="1.5" />
          <rect x="162" y="158" width="76" height="7.5" fill="url(#utla-gold-grad)" rx="1.5" />

          {/* UT and LA Typography */}
          <text x="162" y="218" fontFamily="'Times New Roman', 'Playfair Display', Georgia, serif" fontSize="44" fontWeight="900" fill="#FFFFFF" textAnchor="end" letterSpacing="-1">
            UT
          </text>
          <text x="238" y="218" fontFamily="'Times New Roman', 'Playfair Display', Georgia, serif" fontSize="44" fontWeight="900" fill="#FFFFFF" textAnchor="start" letterSpacing="-1">
            LA
          </text>

          {/* Open Bible at bottom of cross */}
          <g stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 200 252 C 182 240, 160 236, 145 250 C 146 256, 175 250, 200 262" />
            <path d="M 200 252 C 218 240, 240 236, 255 250 C 254 256, 225 250, 200 262" />
            <path d="M 152 254 C 168 266, 186 264, 200 268" />
            <path d="M 248 254 C 232 266, 214 264, 200 268" />
          </g>
        </svg>
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
