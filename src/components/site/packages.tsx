"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Check, Pause, Play, Plus, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

type Demo = {
  name: string;
  price: string;
  src: string;
  poster: string;
  points: string[];
  tag: string;
  vertical: boolean;
  blurb: string;
};

const DEMOS: Demo[] = [
  {
    name: "Viral Cut",
    price: "$279",
    src: "/demos/viral_cut.mp4",
    poster: "/demos/viral_cut.jpg",
    points: ["15–75 sec runtime", "Fast, trend-driven pacing", "Reels · TikTok · Shorts", "Hook + captions included"],
    tag: "Most ordered",
    vertical: true,
    blurb: "Built to stop the scroll and spike reach on every listing.",
  },
  {
    name: "Branding Cut",
    price: "$189",
    src: "/demos/branding_cut.mp4",
    poster: "/demos/branding_cut.jpg",
    points: ["15–40 sec runtime", "Text-driven, structured", "Authority & reach", "Logo + brand colors"],
    tag: "For agents",
    vertical: true,
    blurb: "Position yourself as the agent everyone remembers.",
  },
  {
    name: "Groovy Cut",
    price: "$279",
    src: "/demos/groovy_cut.mp4",
    poster: "/demos/groovy_cut.jpg",
    points: ["15–75 sec runtime", "Creative, rhythmic edit", "Standout social posts", "Music-synced cuts"],
    tag: "Stand out",
    vertical: true,
    blurb: "A rhythmic cut with personality — impossible to ignore.",
  },
  {
    name: "Cinematic Cut",
    price: "$279",
    src: "/demos/cinematic_cut.mp4",
    poster: "/demos/cinematic_cut.jpg",
    points: ["20 sec – 2 min runtime", "Elegant, cinematic grade", "MLS & flagship listings", "Drone + interior flow"],
    tag: "Flagship",
    vertical: false,
    blurb: "The premium showcase for flagship listings and MLS.",
  },
  {
    name: "Value Cut",
    price: "$149",
    src: "/demos/value_cut.mp4",
    poster: "/demos/value_cut.jpg",
    points: ["Full walk-through", "Clean, ambient sound", "2-day delivery", "Every room covered"],
    tag: "Fast & clean",
    vertical: false,
    blurb: "A clean walk-through, delivered fast. No fluff.",
  },
];

export function Packages() {
  const [open, setOpen] = useState(0);

  return (
    <section id="packages" className="relative overflow-hidden bg-[#f2ecdf] py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#ff4d00]">
              ( 02 ) — À la carte
            </p>
            <h2 className="mt-3 font-display text-[15vw] uppercase leading-[0.9] md:text-8xl lg:text-9xl">
              Pick your <span className="text-outline-ink">cut</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[#171410]/70">
            Tap a package to preview it big. Choose your style, upload footage, get your edit.{" "}
            <a href="/contact" className="font-bold text-[#ff4d00] underline underline-offset-4">
              Need custom? →
            </a>
          </p>
        </div>

        <div className="mt-12 border-t-2 border-[#171410]">
          {DEMOS.map((d, i) => (
            <PackageItem
              key={d.name}
              demo={d}
              index={i}
              open={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PackageItem({
  demo,
  index,
  open,
  onToggle,
}: {
  demo: Demo;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <article
      className={cn(
        "border-b-2 border-[#171410] transition-colors duration-300",
        open && "bg-[#171410] text-[#f2ecdf]"
      )}
    >
      {/* Header row */}
      <button
        onClick={onToggle}
        aria-expanded={open}
        className={cn(
          "grid w-full grid-cols-12 items-center gap-3 px-1 py-5 text-left transition-colors duration-300 md:px-4 md:py-6",
          !open && "hover:bg-[#171410] hover:text-[#f2ecdf]"
        )}
      >
        <span className="col-span-2 md:col-span-1">
          <span className="block font-mono text-sm text-[#ff4d00]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="mt-2 hidden rounded-full border border-current px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] opacity-70 md:inline-block">
            {demo.tag}
          </span>
        </span>
        <span className="col-span-8 md:col-span-8">
          <span
            className={cn(
              "block font-display text-4xl uppercase leading-none transition-all duration-300 sm:text-5xl md:text-6xl lg:text-7xl",
              open && "translate-x-2 text-[#ff4d00]"
            )}
          >
            {demo.name}
          </span>
          <span className="mt-2 block text-[11px] font-semibold uppercase tracking-[0.18em] opacity-60 md:hidden">
            {demo.price} · {demo.points[0]}
          </span>
        </span>
        <span className="hidden text-right md:col-span-2 md:block">
          <span className="font-display text-4xl text-[#ff4d00] lg:text-5xl">{demo.price}</span>
        </span>
        <span className="col-span-2 grid justify-end md:col-span-1">
          <Plus
            size={30}
            strokeWidth={2.5}
            className={cn("transition-transform duration-300", open && "rotate-45 text-[#ff4d00]")}
          />
        </span>
      </button>

      {/* Expandable big preview */}
      <div
        className={cn(
          "grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="grid items-center gap-8 px-1 pb-10 pt-2 md:grid-cols-2 md:px-4">
            <BigPreview demo={demo} active={open} />
            <div>
              <p className="font-accent text-2xl italic leading-snug md:text-3xl">{demo.blurb}</p>
              <ul className="mt-6 space-y-3">
                {demo.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em]">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#ff4d00] text-[#fff8ea]">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <span className="font-display text-5xl text-[#ff4d00] md:text-6xl">{demo.price}</span>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[#ff4d00] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-[#fff8ea] transition-transform hover:scale-105 hover:-rotate-1"
                >
                  Select {demo.name} <ArrowUpRight size={15} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function BigPreview({ demo, active }: { demo: Demo; active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

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

  return (
    <div
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-[#ff4d00]",
        demo.vertical ? "mx-auto aspect-[9/16] max-h-[560px] w-full max-w-[330px]" : "aspect-video w-full"
      )}
      onClick={togglePlay}
    >
      {active && (
        <video
          ref={ref}
          src={demo.src}
          poster={demo.poster}
          autoPlay
          muted={muted}
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
      )}
      <span className="absolute left-4 top-4 rounded-full bg-[#ff4d00] px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#fff8ea]">
        ▶ {demo.name} preview
      </span>
      <span
        className={cn(
          "absolute inset-0 m-auto grid h-20 w-20 place-items-center rounded-full transition-all duration-300",
          playing
            ? "bg-[#f2ecdf]/90 text-[#171410] opacity-0 group-hover:opacity-100"
            : "bg-[#ff4d00] text-[#fff8ea] opacity-100"
        )}
      >
        {playing ? <Pause size={28} fill="currentColor" /> : <Play size={28} className="ml-1" fill="currentColor" />}
      </span>
      <button
        type="button"
        aria-label={muted ? "Unmute" : "Mute"}
        onClick={(e) => {
          e.stopPropagation();
          const v = ref.current;
          if (v) {
            v.muted = !muted;
            setMuted(!muted);
            if (v.paused) {
              v.play().catch(() => {});
              setPlaying(true);
            }
          }
        }}
        className={cn(
          "absolute bottom-4 right-4 flex items-center gap-2 rounded-full px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] backdrop-blur-sm transition-colors",
          muted ? "bg-[#ff4d00] text-[#fff8ea]" : "bg-black/60 text-white hover:bg-[#ff4d00]"
        )}
      >
        {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        {muted ? "Sound off" : "Sound on"}
      </button>
    </div>
  );
}
