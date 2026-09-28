"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const STATS = [
  { value: 2, suffix: " yrs", label: "Craft" },
  { value: 5, suffix: "M+", label: "Views driven" },
  { value: 30, suffix: "+", label: "Happy clients" },
];

const JOURNEY = [
  {
    year: "2023",
    title: "Started with volume",
    body: "Quick social clips for clients who needed speed — learning pace, hooks, and retention.",
  },
  {
    year: "2024",
    title: "Found the craft",
    body: "Cinematic color grading meets rhythm-driven pacing. Every second earns its place.",
  },
  {
    year: "2026",
    title: "Studio practice",
    body: "Operating like a small studio: reviewed deliveries, sharp cuts, zero exceptions.",
  },
];

function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          ob.disconnect();
        }
      },
      { threshold }
    );
    ob.observe(node);
    return () => ob.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.4);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setDisplay(Math.floor((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, value]);
  return (
    <div ref={ref} className="font-display text-3xl font-semibold gold-gradient-text tabular-nums">
      {display}
      {suffix}
    </div>
  );
}

export function About() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="relative py-28 lg:py-36 border-t border-white/[0.06] bg-black overflow-hidden">
      <div
        className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full opacity-[0.06] blur-3xl"
        aria-hidden="true"
        style={{ background: "radial-gradient(circle, rgba(245,216,150,0.7), transparent 70%)" }}
      />

      <div
        ref={ref}
        className={cn(
          "mx-auto max-w-7xl px-6 lg:px-10 transition-all duration-700",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left: sticky identity */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="text-[11px] uppercase tracking-[0.35em] text-primary mb-4">
              About The Editor
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.05] text-white text-balance">
              A craftsman,{" "}
              <span className="italic gold-gradient-text">not a vendor</span>.
            </h2>

            {/* Portrait card */}
            <div className="shine mt-8 flex items-center gap-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 max-w-sm">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-primary/40 ring-1 ring-primary/20">
                <img src="/logo-mustafa.png" alt="Mustafa Khaled" className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="font-display text-lg font-semibold text-white">Mustafa Khaled</div>
                <div className="mt-1 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-white/50">
                  <MapPin size={12} className="text-primary" />
                  Cairo · Working worldwide
                </div>
              </div>
            </div>

            {/* Mini stats */}
            <div className="mt-6 grid grid-cols-3 gap-px max-w-sm rounded-xl overflow-hidden border border-white/[0.07]">
              {STATS.map((s) => (
                <div key={s.label} className="bg-white/[0.02] p-4 text-center">
                  <Counter value={s.value} suffix={s.suffix} />
                  <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/45">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: story */}
          <div className="lg:col-span-7">
            <p className="text-white/65 leading-relaxed text-base md:text-lg">
              <span className="float-left mr-3 font-display text-6xl leading-[0.85] text-primary">
                M
              </span>
              ustafa Khaled is a cinematic video editor based in Cairo, Egypt —
              building a reputation over the past two years for cuts that feel{" "}
              <span className="text-white">intentional, premium, and on-trend</span>.
              He started where most editors start: cutting quick social clips
              for clients who needed volume. What set him apart was the refusal
              to treat any project as a checkbox.
            </p>

            <blockquote className="my-8 border-l-2 border-primary pl-6 font-display text-xl md:text-2xl text-white leading-snug">
              “Every second of footage earns its place in the final cut.”
            </blockquote>

            <p className="text-white/65 leading-relaxed">
              Today, Mustafa works with real estate media companies, agents,
              and ambitious brands that care about the same thing he does. His
              style blends{" "}
              <span className="text-white">cinematic color grading</span> with{" "}
              <span className="text-white">rhythm-driven pacing</span> — the
              kind of edit that holds attention past the three-second hook and
              actually converts viewers into clients.
            </p>

            {/* Journey timeline */}
            <div className="mt-10">
              <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-6">
                The Journey
              </div>
              <div className="relative space-y-0 border-l border-white/10 ml-1">
                {JOURNEY.map((j, i) => (
                  <div key={j.year} className="group relative pl-8 pb-8 last:pb-0">
                    <span
                      className={cn(
                        "absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border transition-all duration-500",
                        "border-primary/50 bg-black group-hover:bg-primary group-hover:shadow-gold-glow"
                      )}
                    />
                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-primary/70 text-sm">{j.year}</span>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-white/30">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-1.5 font-display text-lg font-semibold text-white group-hover:text-primary transition-colors">
                      {j.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-white/55 leading-relaxed max-w-xl">
                      {j.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="pt-8 mt-8 border-t border-white/10">
              <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-4">
                Tools &amp; Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Final Cut Pro",
                  "Adobe Premiere Pro",
                  "After Effects",
                  "DaVinci Resolve",
                  "Color Grading",
                  "Sound Design",
                  "Motion Graphics",
                  "Reels · TikTok · Shorts",
                ].map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-1.5 text-xs text-white/70 transition-all duration-300 hover:border-primary/60 hover:text-primary hover:-translate-y-0.5 cursor-default"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frames strip */}
      <div className="mt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 mb-6 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.3em] text-white/40">
            Frames from recent cuts
          </span>
          <a href="/#work" className="text-[11px] uppercase tracking-[0.3em] text-primary hover:underline underline-offset-4">
            See the work →
          </a>
        </div>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max gap-4 animate-scroll-x">
            {[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6].map((n, i) => (
              <img
                key={i}
                src={`/work/work-${n}.jpg`}
                alt={`Frame from recent cut ${n}`}
                loading="lazy"
                className="h-44 md:h-56 w-auto aspect-[4/5] object-cover rounded-lg border border-white/10 opacity-70 hover:opacity-100 hover:border-primary/50 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
