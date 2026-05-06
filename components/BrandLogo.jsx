export default function BrandLogo({ className = "h-10 w-auto", showWordmark = true }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 120 120" className="h-full w-auto" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="brand-ring" x1="10" y1="18" x2="110" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#75c74e" />
            <stop offset="34%" stopColor="#17934c" />
            <stop offset="68%" stopColor="#1a7fbb" />
            <stop offset="100%" stopColor="#1f4f93" />
          </linearGradient>
          <linearGradient id="brand-leaf" x1="24" y1="22" x2="82" y2="88" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#61be4b" />
            <stop offset="100%" stopColor="#117b57" />
          </linearGradient>
          <linearGradient id="brand-wave" x1="38" y1="60" x2="100" y2="104" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1f4f93" />
            <stop offset="100%" stopColor="#1c88cf" />
          </linearGradient>
        </defs>

        <path
          d="M60 8c28.7 0 52 23.3 52 52s-23.3 52-52 52S8 88.7 8 60 31.3 8 60 8Z"
          fill="none"
          stroke="url(#brand-ring)"
          strokeWidth="14"
          strokeLinecap="round"
        />

        <path
          d="M41 24c12.9 0 23.8 7.1 30 18.3C55.4 43.7 41.7 53.7 33 68.7 29.7 50.3 31 31.1 41 24Z"
          fill="url(#brand-leaf)"
        />

        <path
          d="M77.5 28.5c7.5 9.5 11.5 22 11.5 33.5 0 14.8-6.2 28.5-17.1 38.1-3.8 3.3-8.5 6.2-13.5 8.3 16.4-6 29.5-18.6 35.7-35.3 4.1-11.1 4.8-22.9 2.2-34.3-4.6-2.7-9.7-6-15.7-10.3-.8-.5-1.5-1-2.1-1.5Z"
          fill="url(#brand-wave)"
        />

        <path
          d="M47 80c8-1.2 15.7-5 22.3-10.6 11.8-10 19.7-23.9 23.7-41.2-7.5 12.8-17.4 24.8-29.7 35.8C57 70 50 74.2 43.2 76.6c1 1.2 2.2 2.3 3.8 3.4Z"
          fill="#1f4c90"
          opacity="0.95"
        />
      </svg>

      {showWordmark ? (
        <span className="leading-none">
          <span className="block font-display text-[1.55rem] tracking-[-0.03em] text-text-primary">Revive Fiber</span>
          <span className="-mt-0.5 block text-[0.92rem] font-medium tracking-[0.22em] text-text-secondary uppercase">Co</span>
        </span>
      ) : null}
    </span>
  );
}