"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 350, suffix: "+", label: "Videos Delivered" },
  { value: 5, suffix: "M+", label: "Views Generated" },
  { value: 30, suffix: "+", label: "Companies Served" },
];

const LOGOS = [
  { name: "COHEN & CO.", sub: "MEDIA", cls: "font-display font-semibold tracking-[0.08em]" },
  { name: "KNOWN", sub: null, cls: "font-display font-black italic tracking-tight" },
  { name: "STUDIO 910", sub: null, cls: "font-sans font-bold tracking-[0.2em]" },
  { name: "STUDIO SUNDAY", sub: null, cls: "font-display font-light tracking-[0.25em]" },
  { name: "JT", sub: "VISUALS", cls: "font-display font-black tracking-tight" },
  { name: "AKBAR", sub: null, cls: "font-sans font-semibold tracking-[0.35em]" },
  { name: "RESONATE", sub: "REAL ESTATE MEDIA", cls: "font-sans font-bold tracking-[0.15em]" },
  { name: "EV", sub: "ERIC VISUALS", cls: "font-display font-bold tracking-tight" },
];

export function Stats() {
  return (
    <section className="relative border-y border-white/[0.06] bg-black">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        {/* Big numbers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
          {STATS.map((s, i) => (
            <StatBlock key={i} {...s} />
          ))}
        </div>

        <p className="mt-16 text-center font-medium uppercase tracking-[0.25em] text-[11px] text-white/45">
          Trusted by leading real estate media companies
        </p>

        {/* Logo row */}
        <div className="relative overflow-hidden mt-10 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max items-center gap-16 animate-scroll-x">
            {[...LOGOS, ...LOGOS].map((l, i) => (
              <span
                key={i}
                className="flex flex-col items-center whitespace-nowrap text-white/35 hover:text-white/70 transition-colors select-none"
              >
                <span className={`text-lg md:text-xl uppercase ${l.cls}`}>
                  {l.name}
                </span>
                {l.sub && (
                  <span className="mt-1 text-[9px] uppercase tracking-[0.3em] text-white/25">
                    {l.sub}
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatBlock({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let started = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          const duration = 1800;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(Math.floor(eased * value));
            if (p < 1) requestAnimationFrame(tick);
            else setDisplay(value);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="font-display font-semibold text-primary leading-none text-[48px] md:text-[64px] tabular-nums">
        {display.toLocaleString("en-US")}
        {suffix}
      </div>
      <div className="mt-5 text-[11px] md:text-xs uppercase tracking-[0.3em] text-white/50 font-medium">
        {label}
      </div>
    </div>
  );
}
