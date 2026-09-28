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
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#171410] text-[#f2ecdf] transition-opacity duration-700",
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-[#f2ecdf]/50">
        ● Rec — Loading the cut
      </p>
      <p className="loader-word mt-4 font-display uppercase text-5xl md:text-7xl">
        Mustafa <span className="text-[#ff4d00]">Khaled</span>
      </p>
      <div className="mt-8 h-1 w-52 overflow-hidden rounded-full bg-[#f2ecdf]/15">
        <span className="loader-bar block h-full bg-[#ff4d00]" />
      </div>
    </div>
  );
}
