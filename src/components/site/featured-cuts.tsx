"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Pause, Play, Volume2, VolumeX } from "lucide-react";

// The three the client picked to lead with: two presenter/caption pieces and one
// lifestyle reel. They're deliberately a different shape from the property reels
// in the hero — this is the "I can edit your talking-head content too" proof.
const FEATURED = [
  {
    title: "Price Strategy",
    kind: "Presenter cut",
    note: "Caption styling + beat-matched cuts",
    platform: "Reels",
    src: "/work/clips/seller-strategy.mp4",
    poster: "/work/clips/seller-strategy.jpg",
    duration: "0:14",
  },
  {
    title: "Market Talk",
    kind: "Presenter + screen",
    note: "B-roll inserts, burned-in captions",
    platform: "TikTok",
    src: "/work/clips/capitol-talk.mp4",
    poster: "/work/clips/capitol-talk.jpg",
    duration: "0:11",
  },
  {
    title: "Lifestyle Reel",
    kind: "Lifestyle film",
    note: "Natural light, clean sound design",
    platform: "Reel",
    src: "/work/clips/lifestyle-reel.mp4",
    poster: "/work/clips/lifestyle-reel.jpg",
    duration: "0:15",
  },
];

const META =
  "text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#f2ecdf]/60";

export function FeaturedCuts() {
  return (
    <section id="featured" className="relative overflow-hidden bg-[#171410] text-[#f2ecdf]">
      <div className="film-grain" />

      <div className="relative mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
        {/* Meta rail */}
        <div className={`flex items-center justify-between gap-4 border-b border-[#f2ecdf]/15 pb-4 ${META}`}>
          <span className="flex items-center gap-2.5 text-[#f2ecdf]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff4d00] animate-soft-pulse" />
            Featured — Presenter &amp; lifestyle
          </span>
          <span className="hidden md:block">Beyond the listing reel</span>
          <span>03 cuts</span>
        </div>

        {/* Headline */}
        <div className="grid grid-cols-12 gap-x-6 pt-10 md:pt-14 lg:gap-x-10">
          <h2 className="col-span-12 font-display uppercase leading-[0.86] tracking-[-0.012em] text-[13vw] lg:col-span-8 lg:text-[clamp(3rem,7.5vw,7.5rem)]">
            <span className="rise-in block" style={{ animationDelay: "0.05s" }}>
              Not just
            </span>
            <span
              className="rise-in block text-outline-paper"
              style={{ animationDelay: "0.15s" }}
            >
              listing
            </span>
            <span
              className="rise-in block text-[#ff4d00]"
              style={{ animationDelay: "0.25s" }}
            >
              footage
            </span>
          </h2>

          <div className="col-span-12 mt-8 lg:col-span-4 lg:mt-0 lg:flex lg:flex-col lg:justify-end">
            <p className="max-w-[40ch] text-base leading-[1.55] text-[#f2ecdf]/75 md:text-lg">
              Most editors only touch the property. These are the cuts where the{" "}
              <span className="font-accent italic text-[#f2ecdf]">
                talking head is the property
              </span>{" "}
              — caption timing, hook structure, and the screen inserts that keep a reel watched to the end.
            </p>
            <a
              href="#packages"
              className="group mt-7 inline-flex w-fit items-center gap-3 border border-[#f2ecdf]/30 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f2ecdf] transition-colors hover:border-[#ff4d00] hover:bg-[#ff4d00] hover:text-[#fff8ea]"
            >
              See the packages
              <ArrowUpRight
                size={15}
                strokeWidth={2.5}
                className="transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
              />
            </a>
          </div>
        </div>

        {/* The three */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {FEATURED.map((clip, i) => (
            <FeaturedCard key={clip.src} clip={clip} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

type Clip = (typeof FEATURED)[number];

function FeaturedCard({ clip, index }: { clip: Clip; index: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  // The ambient video budget in video-autoplay.tsx pauses these once they scroll
  // away, so the play/pause icon has to read the element, not its own stale state.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const sync = () => setPlaying(!v.paused);
    v.addEventListener("play", sync);
    v.addEventListener("pause", sync);
    return () => {
      v.removeEventListener("play", sync);
      v.removeEventListener("pause", sync);
    };
  }, []);

  const togglePlay = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      // Unmuting on the first deliberate play is what people expect — a clip you
      // chose to watch shouldn't come back silent.
      v.muted = false;
      setMuted(false);
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = ref.current;
    if (!v) return;
    v.muted = !muted;
    setMuted(!muted);
  };

  return (
    <article
      className="rise-in group"
      style={{ animationDelay: `${0.35 + index * 0.08}s` }}
    >
      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? `Pause ${clip.title}` : `Play ${clip.title}`}
        className="block w-full cursor-pointer text-left"
      >
        <div className="scanlines relative aspect-[9/16] w-full overflow-hidden rounded-sm border border-[#f2ecdf]/20 bg-black">
          <video
            ref={ref}
            src={clip.src}
            poster={clip.poster}
            autoPlay
            muted={muted}
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />

          {/* Grade so the overlay UI reads on any footage */}
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-black/40" />

          {/* Viewfinder corners */}
          <span className="viewfinder" aria-hidden>
            <i />
            <i />
            <i />
            <i />
          </span>

          {/* Index */}
          <span className="pointer-events-none absolute left-4 top-4 border border-[#f2ecdf]/25 bg-black/70 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#f2ecdf]">
            {String(index + 1).padStart(2, "0")}
            <span className="text-[#f2ecdf]/40"> / 03</span>
          </span>

          {/* Platform tag */}
          <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-[#ff4d00] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#fff8ea]">
            {clip.platform}
          </span>

          {/* Play state — mirrors the hero player: the badge only shows on hover
              while it's playing, and stays put the moment it's paused. */}
          <span
            className={`pointer-events-none absolute inset-0 m-auto grid h-16 w-16 place-items-center rounded-full transition-all duration-300 md:h-20 md:w-20 ${
              playing
                ? "scale-90 bg-[#f2ecdf]/90 text-[#171410] opacity-0 group-hover:scale-100 group-hover:opacity-100"
                : "scale-100 bg-[#ff4d00] text-[#fff8ea] opacity-100"
            }`}
          >
            {playing ? (
              <Pause size={22} fill="currentColor" />
            ) : (
              <Play size={22} className="ml-1" fill="currentColor" />
            )}
          </span>

          {/* Lower third */}
          <span className="pointer-events-none absolute inset-x-4 bottom-4 text-left">
            <span className="block h-[2px] w-9 bg-[#ff4d00]" />
            <span className="mt-2.5 block font-display text-2xl uppercase leading-none tracking-[0.02em] md:text-3xl">
              {clip.title}
            </span>
            <span className="mt-2 block font-mono text-[9px] uppercase tracking-[0.18em] text-[#f2ecdf]/60 md:text-[10px]">
              {clip.kind}
              <span className="hidden sm:inline"> — {clip.note}</span>
            </span>
          </span>
        </div>
      </button>

      {/* Transport row */}
      <div className="mt-4 flex items-center justify-between gap-4 border-t border-[#f2ecdf]/15 pt-3">
        <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${META}`}>
          {clip.duration}
        </span>
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? `Unmute ${clip.title}` : `Mute ${clip.title}`}
          className="-my-2 -mr-2 flex h-11 items-center gap-2 px-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#f2ecdf]/70 transition-colors hover:text-[#ff4d00] sm:my-0 sm:mr-0 sm:h-auto sm:px-0"
        >
          {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          <span className="hidden sm:inline">{muted ? "Sound on" : "Mute"}</span>
        </button>
      </div>
    </article>
  );
}
