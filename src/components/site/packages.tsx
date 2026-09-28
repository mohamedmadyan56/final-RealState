"use client";

import { useRef, useState } from "react";

type Demo = {
  name: string;
  price: string;
  src: string;
  poster: string;
  points: string[];
  ratio: "9 / 16" | "16 / 9";
};

const TOP: Demo[] = [
  {
    name: "Viral Cut",
    price: "$279",
    src: "/demos/viral_cut.mp4",
    poster: "/demos/viral_cut.jpg",
    points: ["15–75 sec", "Fast, trend-driven", "Reels, TikTok, Shorts"],
    ratio: "9 / 16",
  },
  {
    name: "Branding Cut",
    price: "$189",
    src: "/demos/branding_cut.mp4",
    poster: "/demos/branding_cut.jpg",
    points: ["15–40 sec", "Text-driven, structured", "Authority & reach"],
    ratio: "9 / 16",
  },
  {
    name: "Groovy Cut",
    price: "$279",
    src: "/demos/groovy_cut.mp4",
    poster: "/demos/groovy_cut.jpg",
    points: ["15–75 sec", "Creative, rhythmic", "Standout social posts"],
    ratio: "9 / 16",
  },
];

const BOTTOM: Demo[] = [
  {
    name: "Cinematic Cut",
    price: "$279",
    src: "/demos/cinematic_cut.mp4",
    poster: "/demos/cinematic_cut.jpg",
    points: ["20 sec – 2 min", "Elegant, cinematic", "MLS & flagship listings"],
    ratio: "16 / 9",
  },
  {
    name: "Value Cut",
    price: "$149",
    src: "/demos/value_cut.mp4",
    poster: "/demos/value_cut.jpg",
    points: ["Walk-through", "Clean, ambient", "2-day delivery"],
    ratio: "16 / 9",
  },
];

export function Packages() {
  return (
    <section id="packages" className="relative overflow-hidden border-t border-white/[0.06] bg-black">
      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="text-center mb-14 md:mb-16">
          <p className="font-medium uppercase tracking-[0.3em] text-[11px] text-primary mb-5">
            À La Carte
          </p>
          <h2 className="font-display font-medium uppercase leading-[0.98] tracking-[-0.005em] text-white text-4xl sm:text-5xl md:text-6xl">
            Per-Video Editing
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
            Choose your style, upload your footage, get your edit.
          </p>
        </div>

        {/* Top: 3 vertical */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-center lg:max-w-[900px] lg:mx-auto">
          {TOP.map((d) => (
            <DemoCard key={d.name} demo={d} />
          ))}
        </div>

        {/* Bottom: 2 landscape */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:max-w-6xl md:mx-auto">
          {BOTTOM.map((d) => (
            <DemoCard key={d.name} demo={d} wide />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-white/60">
            Need something custom?{" "}
            <a href="/contact" className="text-primary hover:underline underline-offset-4">
              Request a custom quote
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function DemoCard({ demo, wide }: { demo: Demo; wide?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  return (
    <div
      className="shine relative rounded-md overflow-hidden bg-card mx-auto w-full border border-white/[0.06]"
      style={{ maxWidth: wide ? undefined : 280 }}
    >
      <div
        className="relative group cursor-pointer"
        style={{ aspectRatio: demo.ratio }}
        onClick={() => ref.current?.play().catch(() => {})}
      >
        <video
          ref={ref}
          src={demo.src}
          poster={demo.poster}
          autoPlay
          muted={muted}
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white" className="opacity-30 group-hover:opacity-70 transition-opacity ml-0.5">
            <polygon points="6 4 20 12 6 20 6 4" />
          </svg>
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-5 text-left">
          <h3 className="font-display font-medium uppercase tracking-wide text-2xl text-white leading-none">
            {demo.name}
          </h3>
          <p className="mt-1.5 font-display text-primary text-xl">{demo.price}</p>
          <ul className="mt-4 space-y-1.5">
            {demo.points.map((p) => (
              <li key={p} className="flex items-center gap-2 text-[11px] text-white/85">
                <span className="h-1 w-1 rounded-full bg-primary" />
                <span className="uppercase tracking-[0.12em]">{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          aria-label={muted ? "Unmute" : "Mute"}
          onClick={(e) => {
            e.stopPropagation();
            const v = ref.current;
            if (v) {
              v.muted = !muted;
              setMuted(!muted);
            }
          }}
          className="absolute bottom-3 right-3 h-9 w-9 grid place-items-center rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-white hover:bg-primary hover:text-black hover:border-primary transition-colors z-10"
        >
          {muted ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
      </div>
      <div className="p-4">
        <a
          href="/contact"
          className="w-full inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 font-medium uppercase tracking-[0.2em] text-[10px] transition-colors border border-white/15 text-white hover:border-primary hover:text-primary"
        >
          Select
        </a>
      </div>
    </div>
  );
}
