"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 350, suffix: "+", label: "Videos delivered" },
  { value: 5, suffix: "M+", label: "Views generated" },
  { value: 30, suffix: "+", label: "Companies served" },
];

const LOGOS = [
  "Cohen & Co.",
  "Known",
  "Studio 910",
  "Studio Sunday",
  "JT Visuals",
  "Akbar",
  "Resonate",
  "Eric Visuals",
];

export function Stats() {
  return (
    <section className="relative border-y-2 border-[#171410] bg-[#ff4d00] text-[#fff8ea] overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
          {STATS.map((s) => (
            <StatBlock key={s.label} {...s} />
          ))}
        </div>
      </div>

      <div className="border-t-2 border-[#171410] bg-[#171410] py-5 text-[#f2ecdf] overflow-hidden">
        <p className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[#f2ecdf]/50">
          Trusted by leading real estate media companies
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max items-center gap-14 animate-scroll-x">
            {[...LOGOS, ...LOGOS].map((l, i) => (
              <span key={i} className="whitespace-nowrap font-display text-2xl uppercase opacity-60 hover:opacity-100 hover:text-[#ff4d00] transition-all select-none">
                {l} <span className="ml-10 text-[#ff4d00] text-lg">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatBlock({ value, suffix, label }: { value: number; suffix: string; label: string }) {
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
    <div ref={ref} className="flex items-baseline justify-center md:justify-start gap-3">
      <span className="font-display leading-none text-7xl md:text-8xl tabular-nums drop-shadow-[4px_4px_0_#171410]">
        {display.toLocaleString("en-US")}{suffix}
      </span>
      <span className="max-w-[110px] text-[11px] font-bold uppercase tracking-[0.22em]">
        {label}
      </span>
    </div>
  );
}
