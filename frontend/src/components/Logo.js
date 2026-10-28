export const LogoMark = ({ size = 34 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="ng-logo-g" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#9F5937" />
        <stop offset="1" stopColor="#D2A078" />
      </linearGradient>
    </defs>
    <rect x="1" y="1" width="30" height="30" rx="8" fill="url(#ng-logo-g)" />
    <path
      d="M10 23V9l12 14V9"
      stroke="#fff"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
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
