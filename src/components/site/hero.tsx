"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Pause, Play, Volume2, VolumeX } from "lucide-react";

const WORDS = ["realtors", "developers", "architects", "agents"];

const TICKER = [
  "Viral Cut",
  "Cinematic Cut",
  "Branding Cut",
  "Groovy Cut",
  "Value Cut",
  "Dedicated Editor",
];

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
    <section id="home" className="relative overflow-hidden bg-[#f2ecdf]">
      <div className="film-grain" />

      {/* Meta top bar */}
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 md:px-10 pt-24 md:pt-28 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.25em]">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#ff4d00] animate-soft-pulse" />
          Rec — Showreel &apos;26
        </span>
        <span className="hidden md:block text-[#6f6656]">
          Real estate video editing
        </span>
        <span className="font-mono tabular-nums">TC {tc}</span>
      </div>

      {/* Giant type */}
      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10 pt-6 md:pt-10 pb-10">
        <h1 className="relative font-display uppercase leading-[0.85] tracking-tight text-[#171410]">
          <span className="rise-in block text-[19vw] lg:text-[15rem]" style={{ animationDelay: "0.1s" }}>
            Your
          </span>
          <span className="rise-in flex items-center gap-[0.12em] text-[12vw] lg:text-[9rem]" style={{ animationDelay: "0.22s" }}>
            <span className="text-outline-ink">Cont—</span>
            {/* Inline video chip inside the headline */}
            <span className="relative hidden sm:inline-block h-[0.7em] w-[1.7em] shrink-0 overflow-hidden rounded-full border-2 border-[#171410] rotate-[-2deg]">
              <video
                src="/work/work-1.mp4"
                poster="/work/work-1.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
            </span>
            <span>ent</span>
          </span>
          <span className="rise-in block text-[19vw] lg:text-[15rem]" style={{ animationDelay: "0.34s" }}>
            <span className="text-[#ff4d00]">Elev</span>ated
            <span className="font-accent normal-case italic text-[0.5em] align-middle text-[#171410]">
              {" "}for{" "}
            </span>
          </span>
          <span className="rise-in relative block h-[0.95em] overflow-hidden text-[19vw] lg:text-[15rem]" style={{ animationDelay: "0.46s" }}>
            <span key={wi} className="rotating-word absolute inset-0 text-[#ff4d00]">
              {WORDS[wi]}.
            </span>
          </span>
        </h1>

        {/* Top-right vertical cuts — sleek phone mockup with cut switcher */}
        <div className="absolute right-[3%] top-[2%] hidden xl:block">
          <div className="rise-in" style={{ animationDelay: "0.6s" }}>
            <VerticalCutsPhone />
          </div>
        </div>

        {/* Sub + polaroid + CTAs — polaroid lives in normal flow so it can never overlap */}
        <div className="rise-in mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-12 lg:items-end" style={{ animationDelay: "0.55s" }}>
          <p className="max-w-md text-base md:text-lg leading-relaxed text-[#171410]/75 lg:col-span-4">
            Professional editing for real estate media companies and agents.{" "}
            <span className="font-accent italic text-[#171410]">
              Cinematic quality, consistent results —
            </span>{" "}
            cuts that actually convert.
          </p>
          {/* Fanned clip deck — multiple cuts visible at once */}
          <div className="hidden justify-center lg:col-span-4 lg:flex" style={{ animationDelay: "0.72s" }}>
            <div className="flex items-center">
              {[
                { src: "/demos/branding_cut.jpg", alt: "Branding cut", rot: "-rotate-6", z: "z-10 -mr-8", shadow: "shadow-[7px_7px_0_#171410]" },
                { src: "/demos/groovy_cut.jpg", alt: "Groovy cut", rot: "rotate-3", z: "z-20 -mr-8", shadow: "shadow-[7px_7px_0_#ff4d00]" },
                { src: "/demos/cinematic_cut.jpg", alt: "Cinematic cut", rot: "rotate-7", z: "z-30", shadow: "shadow-[7px_7px_0_#171410]" },
              ].map((c) => (
                <div
                  key={c.alt}
                  className={`tape relative w-36 shrink-0 rounded-xl border-2 border-[#171410] bg-[#fff8ea] p-1.5 pb-5 transition-transform duration-500 hover:z-40 hover:-translate-y-2 hover:rotate-0 ${c.rot} ${c.z} ${c.shadow}`}
                >
                  <img
                    src={c.src}
                    alt={c.alt}
                    loading="lazy"
                    className="aspect-[9/16] w-full rounded-md object-cover"
                  />
                  <p className="mt-1 text-center font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-[#171410]">
                    {c.alt}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 md:justify-end lg:col-span-4">
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-[#171410] px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#f2ecdf] transition-all duration-300 hover:bg-[#ff4d00] hover:-rotate-1 hover:scale-105"
            >
              Book a call
              <ArrowUpRight size={17} strokeWidth={2.5} className="transition-transform group-hover:rotate-45" />
            </a>
            <a
              href="/#work"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-[#171410] px-8 py-[14px] text-sm font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:bg-[#171410] hover:text-[#f2ecdf]"
            >
              <Play size={15} fill="currentColor" />
              See the work
            </a>
          </div>
        </div>

        {/* Stats strip */}
        <div className="rise-in mt-10 grid grid-cols-3 gap-4 border-t-2 border-[#171410] pt-6" style={{ animationDelay: "0.65s" }}>
          {[
            ["350+", "Videos delivered"],
            ["5M+", "Views generated"],
            ["30+", "Companies served"],
          ].map(([v, l]) => (
            <div key={l}>
              <div className="font-display text-3xl md:text-5xl">{v}</div>
              <div className="mt-1 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#6f6656]">
                {l}
              </div>
            </div>
          ))}
        </div>
        {/* Featured showreel cinema */}
        <ShowreelPlayer />
      </div>

      {/* Ticker */}
      <div className="relative border-y-2 border-[#171410] bg-[#ff4d00] py-3 text-[#fff8ea] overflow-hidden">
        <div className="flex w-max animate-marquee gap-0">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="flex items-center gap-6 px-6 font-display text-xl md:text-2xl uppercase whitespace-nowrap">
              {t} <span className="text-sm">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="/#work"
        className="mx-auto flex w-fit items-center gap-2 py-5 text-[11px] font-bold uppercase tracking-[0.3em] text-[#6f6656] hover:text-[#ff4d00] transition-colors"
      >
        Scroll for the showreel
        <ArrowDown size={14} className="animate-bounce" />
      </a>
    </section>
  );
}

function ShowreelPlayer() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = ref.current;
    if (!v) return;
    v.muted = !muted;
    setMuted(!muted);
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <div className="rise-in mt-10" style={{ animationDelay: "0.7s" }}>
      <div className="overflow-hidden rounded-2xl border-2 border-[#171410] bg-[#171410] shadow-[8px_8px_0_#ff4d00]">
        {/* Player top bar */}
        <div className="flex items-center justify-between gap-3 px-4 md:px-5 py-3 text-[#f2ecdf]">
          <span className="flex items-center gap-2 font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em]">
            <span className="h-2 w-2 rounded-full bg-[#ff4d00] animate-soft-pulse" />
            Now showing — Showreel &apos;26
          </span>
          <span className="hidden sm:block font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-[#f2ecdf]/50">
            4K · 24fps
          </span>
        </div>

        {/* Video */}
        <div className="group relative cursor-pointer px-2 pb-2 md:px-3 md:pb-3" onClick={togglePlay}>
          <video
            ref={ref}
            src="/hero-bg.mp4"
            poster="/hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="aspect-video w-full rounded-xl object-cover"
          />

          {/* Center play state */}
          <span
            className={`absolute inset-0 m-auto grid h-20 w-20 place-items-center rounded-full transition-all duration-300 ${
              playing
                ? "bg-[#f2ecdf]/90 text-[#171410] opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
                : "bg-[#ff4d00] text-[#fff8ea] opacity-100 scale-100"
            }`}
          >
            {playing ? (
              <Pause size={28} fill="currentColor" />
            ) : (
              <Play size={28} className="ml-1" fill="currentColor" />
            )}
          </span>

          {/* Bottom controls */}
          <span className="absolute bottom-5 left-5 md:bottom-6 md:left-6 rounded-full bg-black/60 px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
            ▶ Featured cut
          </span>
          <button
            type="button"
            onClick={toggleMute}
            className={`absolute bottom-5 right-5 md:bottom-6 md:right-6 flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.15em] backdrop-blur-sm transition-colors ${
              muted
                ? "bg-[#ff4d00] text-[#fff8ea] animate-soft-pulse"
                : "bg-black/60 text-white hover:bg-[#ff4d00]"
            }`}
          >
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            {muted ? "Tap for sound" : "Sound on"}
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.25em] text-[#6f6656]">
        <span>Full showreel — real client work</span>
        <a href="/#work" className="text-[#ff4d00] hover:underline underline-offset-4">
          More work ↓
        </a>
      </div>
    </div>
  );
}

const VERTICAL_CUTS = [
  { name: "Viral", price: "$279", src: "/demos/viral_cut.mp4", poster: "/demos/viral_cut.jpg" },
  { name: "Branding", price: "$189", src: "/demos/branding_cut.mp4", poster: "/demos/branding_cut.jpg" },
  { name: "Groovy", price: "$279", src: "/demos/groovy_cut.mp4", poster: "/demos/groovy_cut.jpg" },
];

function VerticalCutsPhone() {
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const ref = useRef<HTMLVideoElement>(null);
  const cut = VERTICAL_CUTS[active];

  return (
    <div className="w-[210px] rotate-[4deg] transition-transform duration-500 hover:rotate-0">
      {/* Label */}
      <div className="mb-2 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff4d00] animate-soft-pulse" />
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-[#6f6656]">
          Vertical cuts · 9:16
        </span>
      </div>

      {/* Phone frame */}
      <div className="rounded-[1.8rem] border-2 border-[#171410] bg-[#171410] p-2 shadow-[7px_7px_0_#ff4d00]">
        {/* Screen */}
        <div className="relative overflow-hidden rounded-[1.3rem] bg-black">
          {/* Notch */}
          <span className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
          <video
            key={cut.src}
            ref={ref}
            src={cut.src}
            poster={cut.poster}
            autoPlay
            muted={muted}
            loop
            playsInline
            preload="metadata"
            className="aspect-[9/16] w-full object-cover"
          />
          {/* Top overlay */}
          <span className="absolute left-0 right-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent px-3 pb-4 pt-2.5">
            <span className="flex items-center gap-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff4d00] animate-soft-pulse" />
              {cut.name}
            </span>
            <button
              type="button"
              aria-label={muted ? "Unmute" : "Mute"}
              onClick={() => {
                const v = ref.current;
                if (v) {
                  v.muted = !muted;
                  setMuted(!muted);
                }
              }}
              className="grid h-6 w-6 place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-[#ff4d00]"
            >
              {muted ? <VolumeX size={11} /> : <Volume2 size={11} />}
            </button>
          </span>
          {/* Bottom overlay */}
          <span className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-3 pb-2.5 pt-4">
            <span className="font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-white/90">
              Reels · TikTok
            </span>
            <span className="font-display text-sm text-[#ff4d00]">{cut.price}</span>
          </span>
        </div>

        {/* Cut switcher */}
        <div className="flex gap-1.5 px-1 pb-1 pt-2">
          {VERTICAL_CUTS.map((c, i) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setActive(i)}
              className={`flex-1 rounded-full py-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.12em] transition-all ${
                i === active
                  ? "bg-[#ff4d00] text-[#fff8ea]"
                  : "bg-[#f2ecdf]/10 text-[#f2ecdf]/60 hover:bg-[#f2ecdf]/20 hover:text-[#f2ecdf]"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
