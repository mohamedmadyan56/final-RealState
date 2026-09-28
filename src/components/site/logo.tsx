import { cn } from "@/lib/utils";

/**
 * MK monogram — ink badge, paper letters, blaze "cut" slash.
 * Inline SVG so it inherits the page fonts (Anton).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={cn("h-10 w-10", className)} role="img" aria-label="Mustafa Khaled logo">
      <rect x="4" y="4" width="120" height="120" rx="32" fill="#171410" />
      {/* blaze cut slash */}
      <rect
        x="60"
        y="14"
        width="13"
        height="100"
        rx="6.5"
        fill="#ff4d00"
        transform="rotate(16 66 64)"
      />
      {/* letters */}
      <text
        x="64"
        y="88"
        textAnchor="middle"
        fill="#f2ecdf"
        fontSize="62"
        letterSpacing="1"
        style={{ fontFamily: "var(--font-display), 'Arial Black', sans-serif" }}
      >
        MK
      </text>
      {/* rec dot */}
      <circle cx="102" cy="26" r="6" fill="#ff4d00" />
    </svg>
  );
}
