"use client";

import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURES = [
  { num: "01", title: "Dedicated editor", body: "Your own editor, embedded in your team. They learn your style, your standards, your workflow." },
  { num: "02", title: "Pro infrastructure", body: "MacBook workstation, Final Cut plugin ecosystem, internal templates and systems." },
  { num: "03", title: "Continuous training", body: "Three structured sessions per week. Your editor doesn't plateau, they keep getting sharper." },
  { num: "04", title: "Creative oversight", body: "Senior leadership reviews every placement. Direct creative direction and quality control." },
  { num: "05", title: "Built for scale", body: "Reserved for companies handling consistent volume and premium work. Reliable support at scale." },
];

export function DedicatedEditor() {
  return (
    <section id="dedicated" className="relative overflow-hidden bg-[#171410] text-[#f2ecdf]">
      <div className="film-grain" />

      {/* Marquee top */}
      <div className="overflow-hidden border-b border-[#f2ecdf]/15 py-3">
        <div className="flex w-max animate-scroll-x-fast gap-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap font-mono text-xs uppercase tracking-[0.3em] text-[#f2ecdf]/50">
              Black label division <span className="text-[#ff4d00]">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-20 md:py-28">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#ff4d00]">
          ( 04 ) — Black label
        </p>
        <h2 className="mt-3 font-display uppercase leading-[0.88] text-[16vw] md:text-8xl lg:text-[10rem]">
          Your own <br />
          <span className="text-outline-paper">dedicated</span> <span className="text-[#ff4d00]">editor</span>
        </h2>
        <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-[#f2ecdf]/70">
          A dedicated editor, fully trained on your brand. Integrated into your
          workflow. <span className="font-accent italic text-[#f2ecdf]">Consistent quality at scale.</span>
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {FEATURES.map((f, i) => (
            <div
              key={f.num}
              className={cn(
                "group rounded-2xl border border-[#f2ecdf]/20 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#ff4d00] hover:bg-[#ff4d00] hover:text-[#fff8ea]",
                i % 2 === 1 && "lg:translate-y-6"
              )}
            >
              <span className="font-mono text-sm text-[#ff4d00] transition-colors group-hover:text-[#fff8ea]">
                /{f.num}
              </span>
              <h3 className="mt-4 font-display text-2xl uppercase leading-tight">{f.title}</h3>
              <p className="mt-3 text-[13px] leading-relaxed opacity-65">{f.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-[#ff4d00] px-9 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#fff8ea] transition-all hover:scale-105 hover:-rotate-1"
          >
            Book a call
            <ArrowUpRight size={17} strokeWidth={2.5} className="transition-transform group-hover:rotate-45" />
          </a>
          <a href="/#packages" className="text-xs font-bold uppercase tracking-[0.2em] text-[#f2ecdf]/60 hover:text-[#ff4d00] transition-colors">
            Or browse per-video packages →
          </a>
        </div>
      </div>
    </section>
  );
}
