"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    quote: "Mustafa created a style that many try to imitate, but none can match. Truly the best in the business.",
    name: "Ahmed Salem",
    role: "Founder · Resonate Media",
  },
  {
    quote: "The solution we all needed. Fast, cinematic, and consistent. Every single cut just hits.",
    name: "Mariam Hassan",
    role: "Creative Director · Studio 910",
  },
  {
    quote: "The difference between Mustafa and other editors is his relentless pursuit of improvement. He's built like one of the best in the industry.",
    name: "Youssef Tarek",
    role: "Founder · JT Visuals",
  },
  {
    quote: "Superior to anyone else I've worked with — I exclusively use him for all my videos. Seamless communication, always on time.",
    name: "Chris Glenn",
    role: "Broker · Glenn & Associates",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  const go = (d: number) => setActive((a) => (a + d + TESTIMONIALS.length) % TESTIMONIALS.length);
  const t = TESTIMONIALS[active];

  return (
    <section id="testimonials" className="relative overflow-hidden bg-[#f2ecdf] py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#ff4d00]">
              ( 05 ) — Receipts
            </p>
            <h2 className="mt-3 font-display uppercase leading-[0.9] text-[13vw] md:text-8xl">
              Word on <span className="font-accent normal-case italic">the street</span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} className="text-[#ff4d00]" fill="currentColor" />
            ))}
          </div>
        </div>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="mt-10 rounded-2xl border-2 border-[#171410] bg-[#fff8ea] p-8 md:p-14 shadow-[8px_8px_0_#171410]"
        >
          <div className="font-display text-7xl md:text-8xl leading-none text-[#ff4d00]">“</div>
          <blockquote key={active} className="animate-fade-up min-h-[140px] md:min-h-[170px] font-accent text-2xl md:text-4xl lg:text-5xl italic leading-snug">
            {t.quote}
          </blockquote>
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="grid h-13 w-13 shrink-0 place-items-center rounded-full bg-[#171410] p-3.5 font-display text-lg text-[#f2ecdf]">
                {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </span>
              <div>
                <div className="font-display text-xl uppercase">{t.name}</div>
                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#6f6656]">{t.role}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Testimonial ${i + 1}`}
                    aria-current={i === active}
                    className="group grid h-11 w-6 place-items-center"
                  >
                    <span
                      className={cn(
                        "block h-2.5 rounded-full transition-all duration-300",
                        i === active
                          ? "w-6 bg-[#ff4d00]"
                          : "w-2.5 bg-[#171410]/20 group-hover:bg-[#171410]/40"
                      )}
                    />
                  </button>
                ))}
              </div>
              <button onClick={() => go(-1)} aria-label="Previous" className="grid h-11 w-11 place-items-center rounded-full border-2 border-[#171410] transition-colors hover:bg-[#171410] hover:text-[#f2ecdf]">
                <ArrowLeft size={18} />
              </button>
              <button onClick={() => go(1)} aria-label="Next" className="grid h-11 w-11 place-items-center rounded-full bg-[#ff4d00] text-[#fff8ea] transition-transform hover:scale-110">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
