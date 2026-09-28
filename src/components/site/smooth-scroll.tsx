"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lenis = new Lenis({
      // lerp = inertia بدل مدة ثابتة → إحساس silky أتحف وأنعم
      lerp: prefersReduced ? 1 : 0.085,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      syncTouch: true,
      autoRaf: true,
    });

    // Anchor links (/#about, #packages...) via lenis
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href*="#"]');
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      // Same-page anchors only (/#id on home, or #id)
      const url = new URL(href, window.location.origin);
      if (url.pathname !== window.location.pathname) return;
      const el = document.querySelector(url.hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -70, duration: 1.6 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
