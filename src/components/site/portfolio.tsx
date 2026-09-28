"use client";

import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

type WorkItem = {
  title: string;
  category: string;
  format: string;
  duration: string;
  src: string;
  poster: string;
};

const WORK: WorkItem[] = [
  {
    title: "Sunset Villa — Beverly Hills",
    category: "Real Estate · Cinematic Cut",
    format: "Reel",
    duration: "0:10",
    src: "/work/work-1.mp4",
    poster: "/work/work-1.jpg",
  },
  {
    title: "Downtown Loft Tour",
    category: "Real Estate · Walk-through",
    format: "Short",
    duration: "0:10",
    src: "/work/work-2.mp4",
    poster: "/work/work-2.jpg",
  },
  {
    title: "Penthouse Skyline",
    category: "Luxury Listing · Cinematic",
    format: "Reel",
    duration: "0:10",
    src: "/work/work-3.mp4",
    poster: "/work/work-3.jpg",
  },
  {
    title: "Beachfront Property Launch",
    category: "Branded Series · Viral",
    format: "TikTok",
    duration: "0:12",
    src: "/work/work-4.mp4",
    poster: "/work/work-4.jpg",
  },
  {
    title: "Modern Farmhouse — Promo",
    category: "Cinematic Cut · Brand",
    format: "YouTube",
    duration: "0:08",
    src: "/work/work-5.mp4",
    poster: "/work/work-5.jpg",
  },
  {
    title: "Architect's Tour",
    category: "MLS · Walk-through",
    format: "Reel",
    duration: "0:10",
    src: "/work/work-6.mp4",
    poster: "/work/work-6.jpg",
  },
];

export function Portfolio() {
  return (
    <section
      id="work"
      className="relative py-28 lg:py-36 border-t border-white/[0.06] bg-black"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="text-[11px] uppercase tracking-[0.35em] text-primary mb-4">
              Selected Work
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium uppercase leading-[1.02] tracking-[-0.005em] text-white text-balance">
              Frames from <span className="italic gold-gradient-text">the cut</span>.
            </h2>
          </div>
          <a
            href="/contact"
            className="group self-start lg:self-end text-sm text-white/50 hover:text-primary transition-colors"
          >
            Want a reel like these?{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WORK.map((item, i) => (
            <WorkCard key={i} item={item} index={i} total={WORK.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCard({ item, index, total }: { item: WorkItem; index: number; total: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const toggle = () => {
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

  return (
    <div
      onClick={toggle}
      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 cursor-pointer bg-black"
    >
      {/* Video */}
      <video
        ref={ref}
        src={item.src}
        poster={item.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

      {/* Top row */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <span className="rounded-full bg-black/60 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white">
          {item.format}
        </span>
        <span className="rounded-full bg-black/60 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white">
          {item.duration}
        </span>
      </div>

      {/* Play / pause button */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/40 bg-black/30 backdrop-blur-md transition-all duration-500 group-hover:bg-primary group-hover:scale-110">
          {playing ? (
            <Pause size={22} className="text-primary group-hover:text-black transition-colors" fill="currentColor" />
          ) : (
            <Play size={22} className="ml-0.5 text-primary group-hover:text-black transition-colors" fill="currentColor" />
          )}
        </div>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
        <div className="text-[10px] uppercase tracking-[0.25em] text-white/60 mb-2">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
        <div className="text-[10px] uppercase tracking-[0.25em] text-primary mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {item.category}
        </div>
        <h3 className="font-display text-lg font-semibold text-white leading-tight drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
          {item.title}
        </h3>
      </div>

      {/* Border glow + viewfinder on hover */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-primary/0 group-hover:ring-primary/60 transition-all duration-500 pointer-events-none" />
      <div className="viewfinder" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}
