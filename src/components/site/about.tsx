"use client";

import { MapPin } from "lucide-react";
import { LogoMark } from "@/components/site/logo";

const PROCESS = [
  { num: "01", title: "Send footage", body: "Drop your files and tell me the goal — listing, launch, or brand." },
  { num: "02", title: "Direction call", body: "We lock the style, pacing, and the reference that guides the cut." },
  { num: "03", title: "First cut", body: "Delivered on schedule with pacing and grade already dialed in." },
  { num: "04", title: "Review & ship", body: "Revisions until it's right, then final delivery in every format." },
];

const JOURNEY = [
  { year: "2023", title: "Started with volume", body: "Quick social clips for clients who needed speed — learning pace, hooks, and retention." },
  { year: "2024", title: "Found the craft", body: "Cinematic color grading meets rhythm-driven pacing. Every second earns its place." },
  { year: "2026", title: "Studio practice", body: "Operating like a small studio: reviewed deliveries, sharp cuts, zero exceptions." },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#f2ecdf] py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#ff4d00]">
          ( 03 ) — The editor
        </p>
        <h2 className="mt-3 font-display uppercase leading-[0.9] text-[13vw] md:text-8xl lg:text-[10rem]">
          Craftsman, <span className="text-outline-ink">not</span> vendor
        </h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          {/* Portrait card */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="tape relative max-w-xs rotate-[-3deg] rounded-xl border-2 border-[#171410] bg-[#fff8ea] p-3 pb-5 shadow-[8px_8px_0_#171410]">
                <div className="grid aspect-square w-full place-items-center rounded-lg bg-[#171410]">
                  <LogoMark className="h-3/5 w-3/5" />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-display text-xl uppercase">Mustafa Khaled</span>
                  <span className="rounded-full bg-[#ff4d00] px-3 py-1 font-mono text-[10px] font-bold uppercase text-[#fff8ea]">
                    ★ Editor
                  </span>
                </div>
                <p className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6f6656]">
                  <MapPin size={12} className="text-[#ff4d00]" />
                  Cairo · Working worldwide
                </p>
              </div>

              <div className="mt-8 grid w-full max-w-xs grid-cols-3 divide-x-2 divide-[#171410] rounded-xl border-2 border-[#171410] bg-[#fff8ea] text-center">
                {[
                  ["2", "yrs craft"],
                  ["5M+", "views"],
                  ["30+", "clients"],
                ].map(([v, l]) => (
                  <div key={l} className="min-w-0 p-3 sm:p-4">
                    <div className="font-display text-xl sm:text-2xl md:text-3xl text-[#ff4d00]">{v}</div>
                    <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#6f6656] sm:text-[10px] sm:tracking-[0.18em]">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Story */}
          <div className="lg:col-span-8">
            <p className="max-w-3xl text-xl md:text-3xl font-medium leading-snug">
              Mustafa Khaled is a cinematic video editor from Cairo building a
              reputation for cuts that feel{" "}
              <span className="font-accent italic text-[#ff4d00]">intentional, premium, on-trend.</span>{" "}
              What set him apart was the refusal to treat any project as a checkbox.
            </p>

            <blockquote className="mt-8 border-l-4 border-[#ff4d00] pl-6 font-accent text-2xl md:text-4xl italic leading-snug">
              “Every second of footage earns its place in the final cut.”
            </blockquote>

            {/* Journey rows */}
            <div className="mt-12 border-t-2 border-[#171410]">
              {JOURNEY.map((j, i) => (
                <div key={j.year} className="group grid gap-1 border-b border-[#171410]/20 py-6 transition-colors hover:bg-[#fff8ea] md:grid-cols-12 md:items-baseline md:gap-4 px-1 md:px-3">
                  <span className="font-display text-3xl md:text-4xl text-[#ff4d00] md:col-span-2">{j.year}</span>
                  <h3 className="font-display text-2xl md:text-3xl uppercase md:col-span-4 transition-transform group-hover:translate-x-1">
                    {j.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#171410]/65 md:col-span-6">{j.body}</p>
                  <span className="hidden font-mono text-xs text-[#6f6656]">0{i + 1}</span>
                </div>
              ))}
            </div>

            {/* Tools */}
            <div className="mt-8 flex flex-wrap gap-2">
              {["Final Cut Pro", "Premiere Pro", "After Effects", "DaVinci Resolve", "Color Grading", "Sound Design", "Motion Graphics", "Reels · TikTok · Shorts"].map((s) => (
                <span key={s} className="cursor-default rounded-full border-2 border-[#171410] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] transition-all hover:-translate-y-0.5 hover:bg-[#171410] hover:text-[#f2ecdf]">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="mt-20">
          <div className="flex items-center gap-5">
            <span className="whitespace-nowrap font-display text-2xl md:text-3xl uppercase">How it works</span>
            <span className="h-[2px] flex-1 bg-[#171410]" />
            <span className="font-mono text-xs text-[#ff4d00]">4 steps</span>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p) => (
              <div key={p.num} className="group rounded-2xl border-2 border-[#171410] bg-[#fff8ea] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:rotate-[-0.5deg] hover:bg-[#171410] hover:text-[#f2ecdf] hover:shadow-[6px_6px_0_#ff4d00]">
                <span className="font-display text-5xl text-[#ff4d00]">{p.num}</span>
                <h3 className="mt-3 font-display text-2xl uppercase">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-70">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
