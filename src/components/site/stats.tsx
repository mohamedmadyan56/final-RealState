"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 350, suffix: "+", label: "Videos Delivered" },
  { value: 5, suffix: "M+", label: "Views Generated" },
  { value: 30, suffix: "+", label: "Clients Served" },
  { value: 2, suffix: " yrs", label: "Craft & Counting" },
];

export function Stats() {
  return (
    <section className="relative py-20 border-t border-border/40 bg-card/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border/30 rounded-2xl overflow-hidden border border-border/40">
          {STATS.map((s, i) => (
            <StatBlock key={i} {...s} />
          ))}
        </div>
        <div className="mt-8 text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Trusted by leading real estate media companies & agencies
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
    <div
      ref={ref}
      className="bg-background/60 backdrop-blur p-8 lg:p-10 flex flex-col items-start gap-1"
    >
      <div className="font-display text-4xl lg:text-5xl font-semibold gold-gradient-text">
        {display}
        {suffix}
      </div>
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
