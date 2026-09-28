"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "À La Carte", href: "#packages" },
  { label: "Dedicated Editor", href: "#dedicated" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
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
          ? "bg-background/80 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-primary/30 ring-1 ring-primary/20">
            <img
              src="/logo-mustafa.png"
              alt="Mustafa Khaled logo"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-base font-semibold tracking-wide text-foreground">
              Mustafa Khaled
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Cinematic Editor
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Log In
          </a>
          <a
            href="#packages"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-gold-glow hover:scale-[1.02]"
          >
            Order Now
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 border-t border-border/60",
          open ? "max-h-96 bg-background/95 backdrop-blur-xl" : "max-h-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#packages"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-primary px-5 py-2.5 text-center text-sm font-medium text-primary-foreground"
          >
            Order Now
          </a>
        </nav>
      </div>
    </header>
  );
}
