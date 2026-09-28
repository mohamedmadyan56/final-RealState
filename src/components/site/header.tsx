"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Dedicated Editor", href: "/#dedicated" },
  { label: "Work", href: "/#work" },
  { label: "A La Carte", href: "/#packages" },
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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-gradient-to-b from-black/50 to-transparent"
      )}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        {/* Logo left */}
        <a href="/#home" className="flex items-center gap-3 group shrink-0">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-primary/30 ring-1 ring-primary/20">
            <img
              src="/logo-mustafa.png"
              alt="Mustafa Khaled logo"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="hidden sm:flex flex-col leading-none drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
            <span className="font-display text-base font-semibold tracking-wide text-white">
              Mustafa Khaled
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">
              Cinematic Editor
            </span>
          </div>
        </a>

        {/* Center links — cliffside style */}
        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-[12px] font-medium uppercase tracking-[0.22em] text-white/85 transition-colors hover:text-white py-1"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right buttons — ORDER outline + LOG IN solid */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <a
            href="/#packages"
            className="rounded-[3px] border border-white/30 px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-primary hover:text-primary"
          >
            Order Now
          </a>
          <a
            href="/contact"
            className="rounded-[3px] bg-primary px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-all duration-300 hover:shadow-gold-glow hover:scale-[1.03]"
          >
            Log In
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 text-white"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300",
          open ? "max-h-[480px] bg-black/90 backdrop-blur-xl border-t border-white/10" : "max-h-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 text-[13px] uppercase tracking-[0.2em] text-white/80 hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 flex gap-3">
            <a
              href="/#packages"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-[3px] border border-white/30 px-5 py-2.5 text-center text-[12px] uppercase tracking-[0.18em] text-white"
            >
              Order Now
            </a>
            <a
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-[3px] bg-primary px-5 py-2.5 text-center text-[12px] font-semibold uppercase tracking-[0.18em] text-primary-foreground"
            >
              Log In
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
