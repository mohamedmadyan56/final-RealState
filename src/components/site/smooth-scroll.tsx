"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Lenis بياخد wheel events ويسكرول بـ JS. ده اختيار تصميمي، لكن
    // prefers-reduced-motion معناه المستخدم طلب-native scroll — نلتزم بيه.
    if (prefersReduced) return;

    // lerp بدل duration: الـ lerp بيتعامل مع كل frame بوزنه، فال-result
    // مش متعلق بـ frame rate، وبيحس responsive أكتر بكتير من duration طويل.
    // duration: 1.2 كان بيعمل input ياخد ~1.2 ثانية يرد — ده literally اللي
    // المستخدم كان حاسس بيه إنه "بطيء".
    const lenis = new Lenis({
      lerp: 0.12,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      syncTouch: false,
      // إحنا بنعمل الـ anchor handling بنفسنا تحت
      anchors: false,
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
      lenis.scrollTo(el as HTMLElement, { offset: -70 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
