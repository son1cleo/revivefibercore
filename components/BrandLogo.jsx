export default function BrandLogo({ className = "h-10 w-auto", showWordmark = true }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/brand/logo-icon.png"
        alt="Revive Fiber Co"
        width={128}
        height={123}
        className="h-full w-auto object-contain"
      />

      {showWordmark ? (
        <span className="leading-none">
          <span className="block font-display text-[1.55rem] tracking-[-0.03em] text-text-primary">Revive Fiber</span>
          <span className="-mt-0.5 block text-[0.92rem] font-medium tracking-[0.22em] text-text-secondary uppercase">Co</span>
        </span>
      ) : null}
    </span>
  );
}
