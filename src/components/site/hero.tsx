"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Maximize2,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
} from "lucide-react";

const WORDS = ["realtors", "developers", "architects", "agents"];

const TICKER = [
  "Viral Cut",
  "Cinematic Cut",
  "Branding Cut",
  "Groovy Cut",
  "Value Cut",
  "Dedicated Editor",
];

const PROOF = [
  { value: "350+", label: "Videos delivered" },
  { value: "5M+", label: "Views generated" },
  { value: "30+", label: "Companies served" },
];

const META = "text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#171410]/60";

// Timecode بيتكتب على الـ DOM مباشرة — من غير state — عشان مايعملش
// re-render للـ Hero (فيه فيديوهات) 60 مرة في الثانية.
// rAF بيحسب الوقت بس، والكتابة بتتم بـ interval 24fps (مطابق لـ 24fps
// cinematics) — الـ DOM layout بيتغير 24 مرة في الدقيقة بدل 60 في الثانية.
function Timecode() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const start = performance.now();
    const p = (n: number) => String(n).padStart(2, "0");
    const write = () => {
      const t = (performance.now() - start) / 1000;
      el.textContent = `TC ${p(Math.floor(t / 3600))}:${p(Math.floor(t / 60) % 60)}:${p(
        Math.floor(t) % 60
      )}:${p(Math.floor((t % 1) * 24))}`;
    };
    write();
    // 1000/24 ≈ 41.7ms — يطابق الـ frame rate المعروض في التايم كود
    const id = window.setInterval(write, 1000 / 24);
    return () => clearInterval(id);
  }, []);
  return (
    <span
      ref={ref}
      className="font-mono text-[10px] tabular-nums tracking-[0.15em] text-[#171410]/60 md:text-[11px]"
    >
      TC 00:00:00:00
    </span>
  );
}

export function Hero() {
  const [wi, setWi] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setWi((v) => (v + 1) % WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative overflow-hidden bg-[#f2ecdf]">
      <div className="film-grain" />

      <div className="relative mx-auto max-w-[1600px] px-5 pt-28 md:px-10 md:pt-32">
        {/* Meta rail */}
        <div className={`flex items-center justify-between gap-4 border-b border-[#171410]/15 pb-4 ${META}`}>
          <span className="flex items-center gap-2.5 text-[#171410]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff4d00] animate-soft-pulse" />
            Rec — Showreel &apos;26
          </span>
          <span className="hidden md:block">Real estate video editing</span>
          <Timecode />
        </div>

        {/* Headline + right rail */}
        <div className="grid grid-cols-12 gap-x-6 pt-10 md:pt-14 lg:gap-x-10">
          <div className="relative col-span-12 lg:col-span-9">
            <h1 className="font-display uppercase leading-[0.84] tracking-[-0.012em] text-[#171410] text-[22vw] lg:pb-6 lg:text-[clamp(3.5rem,16vw,16rem)]">
              <span className="rise-in block" style={{ animationDelay: "0.08s" }}>
                Your
              </span>
              <span
                className="rise-in block text-outline-display"
                style={{ animationDelay: "0.18s" }}
              >
                Content
              </span>
              <span
                className="rise-in block text-[#ff4d00]"
                style={{ animationDelay: "0.28s" }}
              >
                Elevated
              </span>
              {/* clip-path (not overflow-hidden) so the mask box keeps its text baseline */}
              <span
                className="rise-in mt-[0.44em] block text-[0.45em] leading-[0.86]"
                style={{ animationDelay: "0.38s" }}
              >
                <span className="font-accent mr-[0.22em] text-[0.6em] italic normal-case tracking-normal text-[#171410]/80">
                  for
                </span>
                <span className="relative inline-block [clip-path:inset(-0.02em_0_-0.06em_0)]">
                  <span
                    key={wi}
                    className="rotating-word inline-block text-[#ff4d00]"
                  >
                    {WORDS[wi]}.
                  </span>
                </span>
              </span>
            </h1>

            {/* Vertical spine — anchors the rag on the right of the display type */}
            <span
              aria-hidden
              className="pointer-events-none absolute right-0 top-0 hidden h-full items-center gap-3 lg:flex"
            >
              <span className="h-full w-px bg-[#171410]/15" />
              <span className="[writing-mode:vertical-rl] font-mono text-[10px] uppercase tracking-[0.35em] text-[#171410]/40">
                Showreel &apos;26 — Mustafa Khaled — Real estate
              </span>
            </span>
          </div>

          {/* Right rail — 9:16 cuts monitor + proof sheet */}
          <aside
            className="rise-in col-span-12 mt-12 hidden lg:col-span-3 lg:mt-0 lg:block"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="ml-auto w-full max-w-[280px]">
              <div
                className={`flex items-center justify-between border-b border-[#171410]/15 pb-2.5 ${META}`}
              >
                <span className="text-[#171410]">Vertical cuts</span>
                <span className="flex items-center gap-1.5 text-[#ff4d00]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff4d00] animate-soft-pulse" />
                  9:16
                </span>
              </div>

              <VerticalCutsPhone />

              <ProofList className="mt-6" />
            </div>
          </aside>
        </div>

        {/* Sub + CTAs */}
        <div className="mt-16 grid grid-cols-12 items-end gap-x-6 border-t border-[#171410]/15 pt-8 md:mt-20 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-5">
            <p className="max-w-[52ch] text-lg leading-[1.5] text-[#171410]/80 md:text-xl">
              Professional editing for real estate media companies and agents.{" "}
              <span className="font-accent italic text-[#171410]">
                Cinematic quality, consistent results —
              </span>{" "}
              cuts that actually convert.
            </p>
            <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              {[
                "Delivered in 24h",
                "Unlimited revisions",
                "Client-ready files",
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#171410]/60"
                >
                  <Check size={12} strokeWidth={3} className="text-[#ff4d00]" />
                  {t}
                </li>
              ))}
            </ul>
            <ProofList className="mt-7 lg:hidden" />
          </div>
          <div className="col-span-12 mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:mt-0 lg:col-span-4 lg:col-start-9 lg:flex lg:justify-end">
            <a
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 bg-[#171410] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-[#f2ecdf] transition-colors duration-300 hover:bg-[#ff4d00] lg:w-auto"
            >
              Book a call
              <ArrowUpRight
                size={16}
                strokeWidth={2.5}
                className="transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
              />
            </a>
            <a
              href="#showreel"
              className="group inline-flex items-center justify-center gap-3 border border-[#171410] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-[#171410] transition-colors duration-300 hover:bg-[#171410] hover:text-[#f2ecdf] lg:w-auto"
            >
              <Play size={13} fill="currentColor" />
              Watch the reel
            </a>
          </div>
        </div>

        {/* Featured showreel cinema */}
        <div id="showreel">
          <ShowreelPlayer />
        </div>
      </div>

      {/* Ticker */}
      <div className="relative mt-14 overflow-hidden border-y border-[#171410] bg-[#ff4d00] py-3 text-[#fff8ea] md:mt-20">
        <div className="flex w-max animate-marquee">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-6 whitespace-nowrap px-6 font-display text-lg uppercase md:text-2xl"
            >
              {t} <span className="text-xs">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="/#work"
        className="mx-auto flex w-fit items-center gap-2.5 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-[#171410]/50 transition-colors hover:text-[#ff4d00] md:text-[11px]"
      >
        Scroll for the full reel
        <ArrowDown size={13} className="animate-bounce" />
      </a>
    </section>
  );
}

function ProofList({ className }: { className?: string }) {
  return (
    <dl
      className={`grid grid-cols-1 gap-x-8 border-t border-[#171410]/15 pt-3 sm:grid-cols-3 lg:grid-cols-1 ${className ?? ""}`}
    >
      {PROOF.map((p) => (
        <div
          key={p.label}
          className="flex items-baseline justify-between gap-4 border-b border-[#171410]/10 py-2 last:border-b-0 sm:flex-col sm:items-start sm:gap-1 lg:flex-row lg:items-baseline lg:gap-4"
        >
          <dt className="font-display text-xl leading-none text-[#171410]">
            {p.value}
          </dt>
          <dd className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#171410]/50 sm:text-left lg:text-right">
            {p.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* The reel is a real sequence of finished client cuts — this is what sells the
   work, so it plays as one film instead of a single looping clip. */
type Chapter = {
  name: string;
  kind: string;
  note: string;
  src: string;
  poster: string;
  duration: number;
};

// The reel is the client's own finished cuts, sequenced as one film. Durations
// are read off the encoded files so the chapter bar and the total stay honest.
const REEL: Chapter[] = [
  {
    name: "Aerial reveal",
    kind: "Drone film",
    note: "Neighbourhood sweep + grade",
    src: "/work/clips/aerial-reveal.mp4",
    poster: "/work/clips/aerial-reveal.jpg",
    duration: 15.6,
  },
  {
    name: "Palm modern",
    kind: "Exterior",
    note: "Backlit flare, slow push",
    src: "/work/clips/palm-modern.mp4",
    poster: "/work/clips/palm-modern.jpg",
    duration: 12.1,
  },
  {
    name: "Timber entry",
    kind: "Walk-through",
    note: "Natural light throughout",
    src: "/work/clips/timber-entry.mp4",
    poster: "/work/clips/timber-entry.jpg",
    duration: 9.1,
  },
  {
    name: "Night drive",
    kind: "Cinematic cut",
    note: "Headlights, handheld",
    src: "/work/clips/night-drive.mp4",
    poster: "/work/clips/night-drive.jpg",
    duration: 14.0,
  },
  {
    name: "Modern walk",
    kind: "Listing tour",
    note: "Whip transitions between rooms",
    src: "/work/clips/modern-walk.mp4",
    poster: "/work/clips/modern-walk.jpg",
    duration: 15.3,
  },
  {
    name: "Kitchen & living",
    kind: "Interior",
    note: "Clean cuts, ambient sound",
    src: "/work/clips/neighborhood-kitchen.mp4",
    poster: "/work/clips/neighborhood-kitchen.jpg",
    duration: 13.0,
  },
];

const REEL_LENGTH = REEL.reduce((sum, c) => sum + c.duration, 0);
const offsetOf = (i: number) =>
  REEL.slice(0, i).reduce((sum, c) => sum + c.duration, 0);

const clock = (s: number) => {
  const v = Number.isFinite(s) && s > 0 ? s : 0;
  return `${Math.floor(v / 60)}:${String(Math.floor(v % 60)).padStart(2, "0")}`;
};

function ShowreelPlayer() {
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const chapterFillRef = useRef<HTMLSpanElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const totalRef = useRef<HTMLSpanElement>(null);
  const timers = useRef<number[]>([]);
  const onScreen = useRef(true);

  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [finished, setFinished] = useState(false);
  const [dipping, setDipping] = useState(false);
  const [scrubbing, setScrubbing] = useState(false);

  const chapter = REEL[idx];

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  // الشريط بيتحسب بـ rAF ويكتب على الـ DOM مباشرة — تحديث state هنا معناه
  // re-render 60 مرة/ثانية والتركيزة كلها فيها فيديو.
  // scaleX مش width: الـ transform بيتنفذ على الـ GPU من غير layout، والـ
  // width كان بيعمل reflow للـ track كل frame. وكمان بنوقف الـ rAF خالص وقت
  // ما الفيديو واقف — مفيش داعي نحسب ربع ثانية في الثانية دي مالهاش لازمة.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let raf = 0;
    let lastSec = -1;
    let lastPct = -1;

    const paint = () => {
      const dur = v.duration && Number.isFinite(v.duration) ? v.duration : 0;
      const now = v.currentTime;
      const pct = dur ? now / dur : 0;

      // ما ينفعش نكتب كل frame — الفرق بين frame والتاني 0.1% على الشريط
      if (Math.abs(pct - lastPct) > 0.001) {
        lastPct = pct;
        const scale = `scaleX(${pct})`;
        if (fillRef.current) fillRef.current.style.transform = scale;
        if (chapterFillRef.current) chapterFillRef.current.style.transform = scale;
      }

      const sec = Math.floor(now);
      if (sec !== lastSec) {
        lastSec = sec;
        if (timeRef.current) timeRef.current.textContent = clock(now);
        if (totalRef.current) {
          totalRef.current.textContent = `${clock(offsetOf(idx) + now)} / ${clock(
            REEL_LENGTH
          )}`;
        }
      }

      if (!v.paused && !v.ended) {
        raf = requestAnimationFrame(paint);
      }
    };

    const kick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(paint);
    };

    kick();
    // أي play/pause من المستخدم يرجّع الـ loop تاني
    v.addEventListener("play", kick);
    v.addEventListener("seeked", kick);
    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener("play", kick);
      v.removeEventListener("seeked", kick);
    };
  }, [idx]);

  // نفس عنصر الـ video بيتبدل بيه الـ src عشان الـ IntersectionObserver
  // اللي في video-autoplay.tsx يفضل ماسكه. التشغيل والـ mute بيتحكموا
  // من أزرار المستخدم، فمفيش إعادة تشغيل تلقائي هنا.
  //
  // الـ next cut بيتحمّل في background عنصر مخفي، عشان لما ييجي وقت الـ cut
  // يكون في HTTP cache جاهز. من غير كده كل قطع = طلب شبكة + فك ترميز من الصفر
  // = ستاتر مرئي في نص ثانية من الشاشة.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const wasMuted = v.muted;
    v.poster = chapter.poster;
    if (v.getAttribute("src") !== chapter.src) {
      v.src = chapter.src;
      v.load();
    }
    v.muted = wasMuted;
    // لو الـ reel بره الشاشة مبنشغّلش — الـ IO تحت هيرجّعه لما يرجع
    if (onScreen.current) v.play().catch(() => {});

    const next = REEL[(idx + 1) % REEL.length];
    if (next.src === chapter.src) return;
    const warm = document.createElement("video");
    warm.preload = "auto";
    warm.muted = true;
    warm.playsInline = true;
    warm.src = next.src;
    warm.load();
    return () => {
      warm.removeAttribute("src");
      warm.load();
    };
  }, [chapter.src, idx]);

  // Player visibility — نوقف فك الترميز لما الـ reel يطلع من الشاشة. ده أكبر
  // توفير في فك الترميز في الصفحة كلها، والفيديو بيرجع لما يرجع تاني.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let wasPlaying = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current;
        if (!v) return;
        onScreen.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (wasPlaying && v.paused) v.play().catch(() => {});
        } else {
          wasPlaying = !v.paused && !v.ended;
          v.pause();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(stage);
    return () => io.disconnect();
  }, []);

  const cutTo = (next: number) => {
    const target = (next + REEL.length) % REEL.length;
    if (dipping) return;
    setDipping(true);
    timers.current.forEach(clearTimeout);
    timers.current = [
      window.setTimeout(() => {
        setIdx(target);
        setFinished(false);
      }, 230),
      window.setTimeout(() => setDipping(false), 720),
    ];
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (finished) {
      setFinished(false);
      v.currentTime = 0;
      v.play().catch(() => {});
      setPlaying(true);
      return;
    }
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    setMuted(next);
    if (next && v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
    }
  };

  const goFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = stageRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      el.requestFullscreen().catch(() => {});
    }
  };

  const handleEnded = () => {
    if (idx < REEL.length - 1) {
      cutTo(idx + 1);
    } else {
      setFinished(true);
      setPlaying(false);
    }
  };

  const seekTo = (clientX: number) => {
    const track = trackRef.current;
    const v = videoRef.current;
    if (!track || !v) return;
    const box = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - box.left) / box.width));
    v.currentTime = ratio * (v.duration || chapter.duration);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "k") {
      e.preventDefault();
      togglePlay();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      cutTo(idx + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      cutTo(idx - 1);
    } else if (e.key.toLowerCase() === "m") {
      e.preventDefault();
      toggleMute();
    }
  };

  return (
    <div className="rise-in mt-12 md:mt-16" style={{ animationDelay: "0.62s" }}>
      <div
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="overflow-hidden rounded-sm border border-[#171410] bg-[#171410] shadow-[0_40px_80px_-40px_rgba(23,20,16,0.6)] outline-none"
        aria-label="Showreel player — space to play, arrows to change cut, M to mute"
      >
        {/* Transport bar */}
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5 text-[#f2ecdf] md:px-5">
          <span className="flex items-center gap-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.25em] md:text-[11px]">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                playing ? "bg-[#ff4d00] animate-soft-pulse" : "bg-[#f2ecdf]/30"
              }`}
            />
            <span className="hidden sm:inline">Now showing</span>
            <span className="text-[#f2ecdf]/45">/</span>
            <span className="text-[#ff4d00]">{chapter.name}</span>
          </span>
          <span className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] md:text-[11px]">
            <span className="hidden tabular-nums text-[#f2ecdf]/45 lg:block">
              <span ref={totalRef} className="tabular-nums">
                0:00 / {clock(REEL_LENGTH)}
              </span>
              <span className="mx-3 text-white/20">·</span>
            </span>
            <span className="text-[#f2ecdf]/45">4K · 24fps</span>
          </span>
        </div>

        {/* Stage */}
        <div className="p-1.5 md:p-2">
          <div
            ref={stageRef}
            onClick={togglePlay}
            className="scanlines group relative aspect-video cursor-pointer overflow-hidden bg-black"
          >
            <video
              ref={videoRef}
              poster={chapter.poster}
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={handleEnded}
              // المشغّل ده بيدير تشغيله بنفسه (عنده play/pause/scrub من المستخدم)
              // وعنده visibility logic جوّه نفسه — فاللي subject to the ambient
              // video budget في video-autoplay.tsx هو غيره.
              data-video-manual
              className="h-full w-full object-cover"
            />

            {/* Grade the frame so the UI reads on top of any footage */}
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-black/35" />

            {/* Dip to black between cuts */}
            <span
              className={`pointer-events-none absolute inset-0 bg-black ${
                dipping ? "dip-black" : "opacity-0"
              }`}
            />

            {/* Cut index */}
            <span className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 md:left-5 md:top-4">
                <span className="border border-white/25 bg-black/70 px-2 py-1">
                {String(idx + 1).padStart(2, "0")}
                <span className="text-white/40"> / {String(REEL.length).padStart(2, "0")}</span>
              </span>
            </span>

            {/* Lower third */}
            <span
              key={chapter.name}
              className="lower-third pointer-events-none absolute bottom-3 left-3 max-w-[70%] md:bottom-5 md:left-5"
            >
              <span className="block h-[2px] w-9 bg-[#ff4d00]" />
              <span className="mt-2 block font-display text-lg uppercase leading-none tracking-[0.02em] text-white uppercase md:text-3xl">
                {chapter.name}
              </span>
              <span className="mt-1.5 block font-mono text-[9px] uppercase tracking-[0.18em] text-white/60 md:text-[10px]">
                {chapter.kind}
                <span className="hidden sm:inline"> — {chapter.note}</span>
              </span>
            </span>

            {/* Big play / pause */}
            <span
              className={`pointer-events-none absolute inset-0 m-auto grid h-16 w-16 place-items-center rounded-full transition-all duration-300 md:h-20 md:w-20 ${
                playing
                  ? "scale-90 bg-[#f2ecdf]/90 text-[#171410] opacity-0 group-hover:scale-100 group-hover:opacity-100"
                  : "scale-100 bg-[#ff4d00] text-[#fff8ea] opacity-100"
              }`}
            >
              {playing ? (
                <Pause size={24} fill="currentColor" />
              ) : (
                <Play size={24} className="ml-1" fill="currentColor" />
              )}
            </span>

            {/* End card */}
            {finished && (
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-[#171410]/95 px-6 text-center">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff4d00]">
                  End of reel
                </span>
                <span className="wipe-in max-w-[26ch] font-display text-2xl uppercase leading-[0.95] tracking-[-0.01em] text-[#f2ecdf] md:text-4xl">
                  That&apos;s a minute of the work
                </span>
                <span className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="/contact"
                    className="group inline-flex items-center gap-2.5 bg-[#ff4d00] px-7 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#fff8ea] transition-colors hover:bg-[#f2ecdf] hover:text-[#171410]"
                  >
                    Book a call
                    <ArrowUpRight
                      size={15}
                      strokeWidth={2.5}
                      className="transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                    />
                  </a>
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="inline-flex items-center gap-2.5 border border-[#f2ecdf]/35 px-7 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f2ecdf] transition-colors hover:border-[#f2ecdf] hover:bg-[#f2ecdf] hover:text-[#171410]"
                  >
                    <RotateCcw size={14} />
                    Replay
                  </button>
                </span>
              </span>
            )}
          </div>

          {/* Transport controls — الموبايل صفّين عشان الـ scrub bar يفضل عريض */}
          <div className="flex flex-col gap-2 px-1.5 py-2.5 sm:flex-row sm:items-center sm:gap-4 md:px-2">
            <div className="flex items-center gap-3 sm:w-full sm:gap-4">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? "Pause" : "Play"}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f2ecdf] text-[#171410] transition-colors hover:bg-[#ff4d00] hover:text-[#fff8ea]"
              >
                {playing ? (
                  <Pause size={13} fill="currentColor" />
                ) : (
                  <Play size={13} className="ml-[1px]" fill="currentColor" />
                )}
              </button>

              <span
                ref={timeRef}
                className="w-9 shrink-0 font-mono text-[10px] tabular-nums tracking-[0.1em] text-[#f2ecdf]/70"
              >
                0:00
              </span>

              {/* Scrubber */}
              <div
                ref={trackRef}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  e.currentTarget.setPointerCapture(e.pointerId);
                  setScrubbing(true);
                  seekTo(e.clientX);
                }}
                onPointerMove={(e) => scrubbing && seekTo(e.clientX)}
                onPointerUp={(e) => {
                  e.currentTarget.releasePointerCapture(e.pointerId);
                  setScrubbing(false);
                }}
                onClick={(e) => e.stopPropagation()}
                role="slider"
                tabIndex={-1}
                aria-label="Reel progress"
                aria-valuemin={0}
                aria-valuemax={REEL.length}
                aria-valuenow={idx + 1}
                className="relative h-6 flex-1 cursor-pointer"
              >
                <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-white/15" />
                <span
                  ref={fillRef}
                  className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 origin-left scale-x-0 bg-[#ff4d00] will-change-transform"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 sm:gap-3">
              <span className="hidden shrink-0 font-mono text-[10px] tabular-nums tracking-[0.1em] text-[#f2ecdf]/40 lg:block">
                {clock(REEL_LENGTH)}
              </span>

              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Turn sound on" : "Mute"}
                className="flex shrink-0 items-center gap-2 border border-white/15 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#f2ecdf]/85 transition-colors hover:border-[#ff4d00] hover:bg-[#ff4d00] hover:text-white"
              >
                {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                {muted ? "Sound on" : "Mute"}
              </button>

              <button
                type="button"
                onClick={goFullscreen}
                aria-label="Fullscreen"
                className="grid h-8 w-8 shrink-0 place-items-center border border-white/15 text-[#f2ecdf]/85 transition-colors hover:border-[#ff4d00] hover:bg-[#ff4d00] hover:text-white"
              >
                <Maximize2 size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters */}
      <div className="mt-3 grid grid-cols-2 gap-px bg-[#171410]/15 sm:grid-cols-3 lg:grid-cols-6">
        {REEL.map((c, i) => {
          const on = i === idx;
          return (
            <button
              key={c.src}
              type="button"
              onClick={() => cutTo(i)}
              className={`group relative overflow-hidden bg-[#f2ecdf] px-3 py-3 text-left transition-colors duration-300 ${
                on ? "text-[#171410]" : "text-[#171410]/55 hover:text-[#171410]"
              }`}
            >
              <span className="flex items-baseline justify-between gap-2">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#ff4d00]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[9px] tabular-nums tracking-[0.1em] opacity-50">
                  {clock(c.duration)}
                </span>
              </span>
              <span
                className={`mt-1 block text-[12px] font-bold uppercase tracking-[0.06em] ${
                  on ? "wipe-in" : ""
                }`}
              >
                {c.name}
              </span>
              <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.14em] opacity-55">
                {c.kind}
              </span>
              {on && (
                <span className="absolute inset-x-0 bottom-0 block h-[3px] bg-[#ff4d00]/25">
                  <span
                    ref={chapterFillRef}
                    className="block h-full origin-left scale-x-0 bg-[#ff4d00] will-change-transform"
                  />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className={`mt-4 flex items-center justify-between gap-6 ${META}`}>
        <span className="hidden sm:block">
          Full reel — {REEL_LENGTH.toFixed(0)}s of real client work
        </span>
        <a
          href="/#work"
          className="whitespace-nowrap text-[#ff4d00] underline-offset-4 transition-colors hover:underline sm:ml-auto"
        >
          More work ↓
        </a>
      </div>
    </div>
  );
}

const VERTICAL_CUTS = [
  { name: "Exterior", price: "$279", src: "/work/clips/palm-modern.mp4", poster: "/work/clips/palm-modern.jpg" },
  { name: "Interior", price: "$189", src: "/work/clips/modern-walk.mp4", poster: "/work/clips/modern-walk.jpg" },
  { name: "Drone", price: "$279", src: "/work/clips/aerial-reveal.mp4", poster: "/work/clips/aerial-reveal.jpg" },
];

function VerticalCutsPhone() {
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const ref = useRef<HTMLVideoElement>(null);
  const cut = VERTICAL_CUTS[active];

  return (
    <div className="mt-5 w-full select-none">
      {/* Studio Monitor Unit */}
      <div className="rounded-sm border border-[#171410] bg-[#171410] p-2">
        {/* Video Viewport with viewfinder marks */}
        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-sm bg-black">
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
            className="h-full w-full object-cover"
          />

          {/* Clean Cinematic Corner Guides */}
          <div className="pointer-events-none absolute inset-2.5">
            <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-white/35" />
            <span className="absolute right-0 top-0 h-2 w-2 border-r border-t border-white/35" />
            <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-white/35" />
            <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-white/35" />
          </div>

          {/* Top Info Bar */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/85 via-black/40 to-transparent p-2.5">
            <span className="border border-white/15 bg-black/80 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-white">
              {cut.name} cut
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
              className="grid h-6 w-6 place-items-center rounded-full border border-white/15 bg-black/80 text-white/90 transition-colors hover:bg-[#ff4d00] hover:text-white"
            >
              {muted ? <VolumeX size={11} /> : <Volume2 size={11} />}
            </button>
          </div>

          {/* Bottom Info Bar */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/90 via-black/45 to-transparent p-2.5">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/45">
                Format
              </p>
              <p className="text-[11px] font-semibold text-white/90">
                Reels / TikTok
              </p>
            </div>
            <div className="text-right">
              <span className="font-display text-lg leading-none text-[#ff4d00]">
                {cut.price}
              </span>
            </div>
          </div>
        </div>

        {/* Segmented switcher */}
        <div className="mt-2 grid grid-cols-3 gap-px bg-white/10">
          {VERTICAL_CUTS.map((c, i) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setActive(i)}
              className={`py-2 text-center font-mono text-[9px] font-bold uppercase tracking-wider transition-colors duration-200 ${
                i === active
                  ? "bg-[#ff4d00] text-[#fff8ea]"
                  : "bg-[#171410] text-[#f2ecdf]/50 hover:bg-[#221e16] hover:text-[#f2ecdf]"
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
