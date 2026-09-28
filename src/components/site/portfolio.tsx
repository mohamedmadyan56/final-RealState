"use client";

import { Play } from "lucide-react";

type WorkItem = {
  title: string;
  category: string;
  format: string;
  duration: string;
  thumbnail: string;
};

// Using gradient placeholders that look like cinematic frames
const WORK: WorkItem[] = [
  {
    title: "Sunset Villa — Beverly Hills",
    category: "Real Estate · Cinematic Cut",
    format: "Reel",
    duration: "1:24",
    thumbnail:
      "linear-gradient(135deg, #1a1206 0%, #3a2a0c 40%, #8c6726 75%, #d4a857 100%)",
  },
  {
    title: "Downtown Loft Tour",
    category: "Real Estate · Walk-through",
    format: "Short",
    duration: "0:48",
    thumbnail:
      "linear-gradient(135deg, #0c0c0f 0%, #1a1a22 50%, #2d2d3a 100%)",
  },
  {
    title: "Penthouse Skyline",
    category: "Luxury Listing · Cinematic",
    format: "Reel",
    duration: "1:12",
    thumbnail:
      "linear-gradient(135deg, #0a0d1a 0%, #1a2845 50%, #c9a04a 100%)",
  },
  {
    title: "Beachfront Property Launch",
    category: "Branded Series · Viral",
    format: "TikTok",
    duration: "0:32",
    thumbnail:
      "linear-gradient(135deg, #0d1a1a 0%, #1a3a3a 50%, #6b8a8a 100%)",
  },
  {
    title: "Modern Farmhouse — Promo",
    category: "Cinematic Cut · Brand",
    format: "YouTube",
    duration: "2:08",
    thumbnail:
      "linear-gradient(135deg, #1a1208 0%, #4a3a1a 50%, #c9a04a 100%)",
  },
  {
    title: "Architect&apos;s Tour",
    category: "MLS · Walk-through",
    format: "Reel",
    duration: "0:54",
    thumbnail:
      "linear-gradient(135deg, #0a0a0a 0%, #2a2a2a 50%, #8a8a8a 100%)",
  },
];

export function Portfolio() {
  return (
    <section
      id="work"
      className="relative py-28 lg:py-36 border-t border-border/40"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
              Selected Work
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] text-balance">
              Frames from <span className="italic gold-gradient-text">the cut</span>.
            </h2>
          </div>
          <a
            href="#contact"
            className="self-start lg:self-end text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Want a reel like these? →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WORK.map((item, i) => (
            <WorkCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCard({ item }: { item: WorkItem }) {
  return (
    <a
      href="#contact"
      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-border"
      style={{ background: item.thumbnail }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Top row */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <span className="rounded-full bg-background/60 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground">
          {item.format}
        </span>
        <span className="rounded-full bg-background/60 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground">
          {item.duration}
        </span>
      </div>

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/40 bg-background/30 backdrop-blur-md transition-all duration-500 group-hover:bg-primary group-hover:scale-110">
          <Play
            size={22}
            className="ml-0.5 text-primary group-hover:text-primary-foreground transition-colors"
            fill="currentColor"
          />
        </div>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="text-[10px] uppercase tracking-[0.25em] text-primary mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {item.category}
        </div>
        <h3 className="font-display text-lg font-semibold text-foreground leading-tight">
          {item.title}
        </h3>
      </div>

      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-primary/0 group-hover:ring-primary/60 transition-all duration-500" />
    </a>
  );
}
