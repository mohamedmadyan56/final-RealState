"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    num: "01",
    title: "Dedicated Editor",
    body: "Your own editor, embedded in your team. They learn your style, your standards, your workflow.",
  },
  {
    num: "02",
    title: "Pro Infrastructure",
    body: "MacBook workstation, Final Cut plugin ecosystem, internal templates and systems.",
  },
  {
    num: "03",
    title: "Continuous Training",
    body: "Three structured sessions per week. Your editor doesn't plateau, they keep getting sharper.",
  },
  {
    num: "04",
    title: "Creative Oversight",
    body: "Senior leadership reviews every placement. Direct creative direction and quality control.",
  },
  {
    num: "05",
    title: "Built for Scale",
    body: "Reserved for companies handling consistent volume and premium work. Reliable support at scale.",
  },
];

export function DedicatedEditor() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          ob.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    ob.observe(node);
    return () => ob.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !visible) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % FEATURES.length),
      2800
    );
    return () => clearInterval(id);
  }, [paused, visible]);

  const onMouseMove = (e: React.MouseEvent) => {
    const panel = panelRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    panel.style.setProperty("--mx", `${e.clientX - r.left}px`);
    panel.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      id="dedicated"
      ref={sectionRef}
      className="relative py-24 md:py-32 border-t border-white/[0.06] bg-black overflow-hidden"
    >
      {/* Diagonal texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #f5d896 0, #f5d896 1px, transparent 1px, transparent 14px)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,180,0,0.07),transparent_55%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Centered header */}
        <div
          className={cn(
            "text-center transition-all duration-700",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="font-medium uppercase tracking-[0.3em] text-[11px] text-primary mb-5">
            The Black Label Division
          </p>
          <h2 className="font-display font-medium uppercase leading-[0.98] tracking-[-0.005em] text-white text-4xl sm:text-5xl md:text-6xl">
            Your Own Dedicated Editor
          </h2>
          <p className="mt-7 text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            A dedicated editor, fully trained on your brand. Integrated into
            your workflow. Consistent quality at scale.
          </p>
        </div>

        {/* Separate cards */}
        <div
          ref={panelRef}
          onMouseMove={onMouseMove}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="spotlight-panel mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5"
        >
          {FEATURES.map((f, i) => {
            const isActive = i === active;
            return (
              <div
                key={f.num}
                onMouseEnter={() => setActive(i)}
                style={{ transitionDelay: `${i * 60}ms` }}
                className={cn(
                  "shine relative h-full rounded-md bg-white/[0.03] border border-white/[0.06] border-l-2 border-l-primary/70 p-6 lg:p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50",
                  isActive && "border-primary/50 -translate-y-1 shadow-gold-glow bg-white/[0.05]",
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
              >
                <p className="font-medium uppercase tracking-[0.18em] text-[10px] text-primary/80">
                  {f.num}
                </p>
                <h3 className="mt-3 font-display font-medium uppercase tracking-wider text-xl lg:text-[1.35rem] text-white leading-tight">
                  {f.title}
                </h3>
                <p className="mt-3 text-[13px] text-white/55 leading-relaxed">
                  {f.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* Centered CTA */}
        <div className="mt-14 flex flex-col items-center gap-5">
          <a
            href="/contact"
            className="shine relative inline-flex items-center justify-center rounded-[3px] bg-primary px-10 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:scale-[1.03] hover:shadow-gold-glow"
          >
            Book A Call
          </a>
          <a
            href="/#packages"
            className="text-xs uppercase tracking-[0.2em] text-white/45 hover:text-primary transition-colors"
          >
            Or browse per-video packages
          </a>
        </div>
      </div>
    </section>
  );
}
