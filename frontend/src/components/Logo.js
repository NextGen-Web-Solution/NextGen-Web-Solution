export const LogoMark = ({ size = 34 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="zip-logo-g" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#9F5937" />
        <stop offset="1" stopColor="#D2A078" />
      </linearGradient>
    </defs>
    <rect x="1" y="1" width="30" height="30" rx="8" fill="url(#zip-logo-g)" />
    <path d="M16 4.8 26.5 10.5v11L16 27.2 5.5 21.5v-11L16 4.8Z" stroke="#fff" strokeWidth="1.65" strokeLinejoin="round" />
    <path d="m5.9 10.7 7.3 4.1a5.7 5.7 0 0 1 2.8 4.9v6.9M26.1 10.7l-7.3 4.1a5.7 5.7 0 0 0-2.8 4.9" stroke="#fff" strokeWidth="1.55" strokeLinejoin="round" />
    <path d="m10 8.45 6 3.45 6-3.45M16 11.9v5.2m-.8 1.1h1.6v4.1h-1.6z" stroke="#fff" strokeWidth="1.55" strokeLinejoin="round" />
  </svg>
);

export const Logo = () => (
  <span className="flex items-center gap-2.5">
    <LogoMark />
    <span className="font-display text-lg font-bold tracking-tight text-white">
      The<span className="text-gradient">ZipCode</span>
    </span>
  </span>
);
