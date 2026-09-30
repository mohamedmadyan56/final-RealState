"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Play, Pause, MoveRight } from "lucide-react";

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
    title: "Neighbourhood Aerial",
    category: "Drone film",
    format: "Reel",
    duration: "0:15",
    src: "/work/clips/aerial-reveal.mp4",
    poster: "/work/clips/aerial-reveal.jpg",
  },
  {
    title: "Backlit Modern Exterior",
    category: "Exterior",
    format: "Reel",
    duration: "0:12",
    src: "/work/clips/palm-modern.mp4",
    poster: "/work/clips/palm-modern.jpg",
  },
  {
    title: "Timber Entry Walk-through",
    category: "Walk-through",
    format: "Short",
    duration: "0:09",
    src: "/work/clips/timber-entry.mp4",
    poster: "/work/clips/timber-entry.jpg",
  },
  {
    title: "Whip-Pan Room Tour",
    category: "Listing tour",
    format: "TikTok",
    duration: "0:15",
    src: "/work/clips/modern-walk.mp4",
    poster: "/work/clips/modern-walk.jpg",
  },
  {
    title: "Price Drop Announcement",
    category: "Presenter cut",
    format: "Short",
    duration: "0:12",
    src: "/work/clips/listing-update.mp4",
    poster: "/work/clips/listing-update.jpg",
  },
  {
    title: "Market Explainer",
    category: "Presenter cut",
    format: "YouTube",
    duration: "0:16",
    src: "/work/clips/market-insights.mp4",
    poster: "/work/clips/market-insights.jpg",
  },
];

const TOTAL = WORK.length + 1; // + end card

export function Portfolio() {
  const trackRef = useRef<HTMLDivElement>(null);
  const suppressClick = useRef(false);
  const dragState = useRef({ down: false, startX: 0, startScroll: 0, moved: false });
  const [index, setIndex] = useState(1);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const step = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 400;
    const first = track.querySelector<HTMLElement>("[data-card]");
    return (first?.offsetWidth ?? 360) + 20; // card + gap-5
  }, []);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setCanPrev(track.scrollLeft > 8);
    setCanNext(track.scrollLeft < max - 8);
    setIndex(Math.min(TOTAL, Math.max(1, Math.round(track.scrollLeft / step()) + 1)));
  }, [step]);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  // throttle بـ rAF — من غير كده كل scroll event بيعمل setState وبيعمل rerender
  const syncRaf = useRef(0);
  const onScroll = useCallback(() => {
    if (syncRaf.current) return;
    syncRaf.current = requestAnimationFrame(() => {
      syncRaf.current = 0;
      sync();
    });
  }, [sync]);

  useEffect(() => () => cancelAnimationFrame(syncRaf.current), []);

  const go = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * step(), behavior: "smooth" });
  };

  // Mouse drag-to-scroll (desktop)
  const onPointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track || e.pointerType !== "mouse") return;
    dragState.current = { down: true, startX: e.clientX, startScroll: track.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const track = trackRef.current;
    const d = dragState.current;
    if (!track || !d.down) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 8) {
      d.moved = true;
      suppressClick.current = true;
      track.scrollLeft = d.startScroll - dx;
    }
  };
  const endDrag = () => {
    dragState.current.down = false;
  };

  return (
    <section id="work" className="relative overflow-hidden bg-[#f2ecdf] py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#ff4d00]">
              ( 01 ) — Selected work
            </p>
            <h2 className="mt-3 font-display uppercase leading-[0.9] text-[15vw] md:text-8xl lg:text-9xl">
              The <span className="font-accent normal-case italic tracking-normal">show</span>reel
            </h2>
          </div>

          {/* Controls */}
          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden sm:block font-mono text-xs tabular-nums text-[#6f6656]">
              {String(index).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
            </span>
            <button
              onClick={() => go(-1)}
              disabled={!canPrev}
              aria-label="Previous work"
              className="grid h-12 w-12 place-items-center rounded-full border-2 border-[#171410] transition-all hover:bg-[#171410] hover:text-[#f2ecdf] disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-current"
            >
              <ArrowLeft size={19} />
            </button>
            <button
              onClick={() => go(1)}
              disabled={!canNext}
              aria-label="Next work"
              className="grid h-12 w-12 place-items-center rounded-full bg-[#ff4d00] text-[#fff8ea] transition-all hover:scale-110 disabled:opacity-25 disabled:hover:scale-100"
            >
              <ArrowRight size={19} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal strip — drag on desktop, swipe on mobile */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="no-scrollbar mt-10 flex cursor-grab gap-5 overflow-x-auto px-5 pb-4 active:cursor-grabbing md:px-10"
      >
        {WORK.map((item, i) => (
          <WorkCard key={i} item={item} index={i} suppressClick={suppressClick} />
        ))}

        {/* End card */}
        <a
          data-card
          href="/contact"
          onClick={(e) => {
            if (suppressClick.current) {
              suppressClick.current = false;
              e.preventDefault();
            }
          }}
          className="group grid w-[78vw] shrink-0 place-items-center rounded-2xl border-2 border-dashed border-[#171410]/40 p-10 text-center transition-colors hover:border-[#ff4d00] hover:bg-[#171410] hover:text-[#f2ecdf] sm:w-[380px]"
        >
          <div>
            <p className="font-display text-4xl uppercase leading-[0.95] md:text-5xl">
              Your listing <br /> could be <span className="text-[#ff4d00]">next</span>
            </p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#ff4d00] px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#fff8ea] transition-transform group-hover:scale-105">
              Start a project <MoveRight size={15} />
            </span>
          </div>
        </a>
      </div>

      <p className="mt-2 text-center text-[11px] font-bold uppercase tracking-[0.3em] text-[#6f6656] sm:hidden">
        Swipe → to see all {TOTAL} cards
      </p>
    </section>
  );
}

function WorkCard({
  item,
  index,
  suppressClick,
}: {
  item: WorkItem;
  index: number;
  suppressClick: React.RefObject<boolean>;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  // مصدر الحقيقة هو حالة الفيديو نفسها — الـ IO في video-autoplay.tsx بيوقّف
  // الكروت اللي خرجت من الشاشة، والـ state هنا لازم يتبعها.
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

  const toggle = () => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
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
      data-card
      onClick={toggle}
      className="group relative block aspect-[4/5] w-[78vw] shrink-0 cursor-pointer overflow-hidden rounded-2xl border-2 border-[#171410] select-none sm:w-[340px] md:w-[380px]"
      style={{ transform: `rotate(${index % 2 === 0 ? "-1" : "1"}deg)` }}
    >
      <video
        ref={ref}
        src={item.src}
        poster={item.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
        <span className="rounded-full bg-[#ff4d00] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#fff8ea]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="rounded-full bg-black/75 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white">
          {item.format} · {item.duration}
        </span>
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-[#f2ecdf] text-[#171410] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#ff4d00] group-hover:text-[#fff8ea]">
          {playing ? (
            <Pause size={22} fill="currentColor" />
          ) : (
            <Play size={22} className="ml-0.5" fill="currentColor" />
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#ff4d00]">
          {item.category}
        </div>
        <h3 className="mt-1 font-display text-2xl uppercase leading-tight text-white">
          {item.title}
        </h3>
      </div>
    </div>
  );
}
