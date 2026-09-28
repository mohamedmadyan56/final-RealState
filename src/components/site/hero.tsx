"use client";

import { useEffect, useState } from "react";

const WORDS = ["realtors", "developers", "architects", "agents"];

function useTimecode() {
  const [tc, setTc] = useState("00:00:00:00");
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const el = (now - start) / 1000;
      const f = Math.floor((el % 1) * 24);
      const s = Math.floor(el % 60);
      const m = Math.floor((el / 60) % 60);
      const h = Math.floor(el / 3600);
      const p = (n: number) => String(n).padStart(2, "0");
      setTc(`${p(h)}:${p(m)}:${p(s)}:${p(f)}`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return tc;
}

export function Hero() {
  const [wi, setWi] = useState(0);
  const tc = useTimecode();

  useEffect(() => {
    const id = setInterval(() => setWi((v) => (v + 1) % WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Video background — cliffside style */}
      <div className="absolute inset-0" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-poster.jpg"
          src="/hero-bg.mp4"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      {/* Content with readability shadow (no dark layer over video) */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-36 pb-28 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
        <p className="text-[11px] md:text-xs uppercase tracking-[0.4em] text-primary mb-8">
          Premium Real Estate Video Editing
        </p>
        {/* Rotating headline — lucid idea, cliffside wording */}
        <h1 className="font-display font-medium uppercase leading-[0.98] tracking-[-0.005em] text-white text-[30px] sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block sm:inline">Your Content. </span>
          <span className="relative inline-block overflow-hidden align-bottom min-w-[10ch]">
            <span key={wi} className="rotating-word inline-block text-primary">
              {WORDS[wi]}.
            </span>
          </span>
          <span className="sr-only">
            Your Content. Elevated. For realtors, developers, architects, and
            agents.
          </span>
        </h1>
        <p className="mt-8 text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
          Professional editing for real estate media companies and agents.
          Cinematic quality. Consistent results.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 max-w-sm sm:max-w-none mx-auto">
          <a
            href="/contact"
            className="relative inline-flex items-center justify-center uppercase tracking-[0.15em] rounded-sm transition-all duration-300 bg-primary text-primary-foreground hover:scale-[1.03] hover:shadow-gold-glow text-sm px-9 py-4 font-semibold"
          >
            Book A Call
          </a>
          <a
            href="/#work"
            className="group relative inline-flex items-center justify-center gap-2 uppercase tracking-[0.15em] rounded-sm transition-all duration-300 text-white/85 hover:text-primary text-sm px-9 py-4 font-semibold"
          >
            See the work
            <svg
              className="transition-transform group-hover:translate-x-1"
              width="20"
              height="10"
              viewBox="0 0 20 10"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M0 5h18M14 1l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.25"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Slate + scroll — lucid timecode + cliffside scroll */}
      <div className="absolute bottom-10 inset-x-0 z-10 flex items-end justify-between px-6 md:px-10">
        <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/50">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-soft-pulse" />
          MK-01&nbsp;&nbsp;{tc}
        </span>
        <span className="flex flex-col items-center gap-2 text-white/50">
          <span className="text-[10px] uppercase tracking-[0.32em]">
            Scroll
          </span>
          <svg
            className="animate-bounce"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
        <span className="hidden sm:block text-[10px] uppercase tracking-[0.3em] text-white/30">
          24fps · 4K
        </span>
      </div>
    </section>
  );
}
