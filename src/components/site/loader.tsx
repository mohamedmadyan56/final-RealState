"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Loader() {
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setDone(true), 1500);
    const t2 = setTimeout(() => setGone(true), 2100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-700",
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      <p className="text-[11px] uppercase tracking-[0.4em] text-white/50">
        Cinematic Editor
      </p>
      <p className="loader-word mt-4 font-display text-4xl md:text-5xl font-semibold text-white">
        Mustafa Khaled
      </p>
      <div className="mt-8 h-px w-48 bg-white/10 overflow-hidden">
        <span className="loader-bar block h-full bg-primary" />
      </div>
    </div>
  );
}
