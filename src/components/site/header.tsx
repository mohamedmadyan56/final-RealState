"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/site/logo";

const NAV_LINKS = [
  { num: "01", label: "Showreel", href: "/#work" },
  { num: "02", label: "Packages", href: "/#packages" },
  { num: "03", label: "The Editor", href: "/#about" },
  { num: "04", label: "Dedicated", href: "/#dedicated" },
  { num: "05", label: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[60] transition-all duration-500",
          scrolled
            ? "bg-[#f2ecdf]/85 backdrop-blur-xl border-b-2 border-[#171410]"
            : "bg-transparent border-b-2 border-transparent"
        )}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 md:px-10 py-4">
          {/* Brand */}
          <a href="/#home" className="flex items-center gap-3 shrink-0">
            <LogoMark className="h-10 w-10 transition-transform duration-500 hover:rotate-[-8deg] hover:scale-105" />
            <span className="hidden sm:block leading-none">
              <span className="block font-display text-lg tracking-wide">
                MUSTAFA KHALED
              </span>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-[#6f6656]">
                Cuts that convert
              </span>
            </span>
          </a>

          {/* Desktop quick links */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.slice(0, 4).map((l) => (
              <a
                key={l.href + l.label}
                href={l.href}
                className="text-[12px] font-semibold uppercase tracking-[0.2em] hover:text-[#ff4d00] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#ff4d00] px-6 py-2.5 text-[12px] font-bold uppercase tracking-[0.18em] text-[#fff8ea] transition-transform duration-300 hover:scale-105 hover:-rotate-1"
            >
              Book a call
              <ArrowUpRight size={15} strokeWidth={2.5} />
            </a>
            {/* Burger */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="group flex items-center gap-2 rounded-full border-2 border-[#171410] bg-[#f2ecdf] px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.18em] transition-colors hover:bg-[#171410] hover:text-[#f2ecdf]"
            >
              Menu
              <span className="flex flex-col gap-[4px]">
                <span className="h-[2px] w-5 bg-current transition-all group-hover:w-3" />
                <span className="h-[2px] w-5 bg-current" />
                <span className="h-[2px] w-3 bg-current transition-all group-hover:w-5" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen overlay menu */}
      <div
        className={cn(
          "fixed inset-0 z-[80] flex flex-col bg-[#171410] text-[#f2ecdf] transition-all duration-500",
          open ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        aria-hidden={!open}
      >
        <div className="film-grain" />
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-5 md:px-10 py-4">
          <span className="font-display text-lg tracking-wide">MK — MENU</span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="rounded-full border-2 border-[#f2ecdf] px-6 py-2.5 text-[12px] font-bold uppercase tracking-[0.18em] transition-colors hover:bg-[#ff4d00] hover:border-[#ff4d00]"
          >
            Close ✕
          </button>
        </div>

        <nav className="relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-5 md:px-10">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
              className={cn(
                "group flex items-baseline gap-4 border-b border-[#f2ecdf]/15 py-2 md:py-3 transition-all duration-500 hover:pl-4",
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <span className="font-mono text-sm text-[#ff4d00]">{l.num}</span>
              <span className="font-display uppercase leading-none text-[13vw] sm:text-6xl md:text-7xl lg:text-8xl transition-colors group-hover:text-[#ff4d00]">
                {l.label}
              </span>
              <ArrowUpRight
                className="ml-auto hidden md:block text-[#ff4d00] opacity-0 -translate-x-3 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                size={40}
              />
            </a>
          ))}
        </nav>

        <div className="relative mx-auto flex w-full max-w-[1600px] flex-col sm:flex-row gap-2 sm:items-center justify-between px-5 md:px-10 pb-8 text-[11px] uppercase tracking-[0.25em] text-[#f2ecdf]/60">
          <span>Cairo → Worldwide</span>
          <span className="text-[#ff4d00]">● Available for new projects</span>
          <a href="mailto:mostafakhaled369852@gmai.com" className="hover:text-[#f2ecdf]">
            mostafakhaled369852@gmai.com
          </a>
        </div>
      </div>
    </>
  );
}
