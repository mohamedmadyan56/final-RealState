"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          ob.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    ob.observe(node);
    return () => ob.disconnect();
  }, []);

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/[0.06] min-h-[80vh] flex items-center"
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/demos/cinematic_cut.jpg"
        src="/demos/cinematic_cut.mp4"
        className="cta-zoom absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

      {/* Content */}
      <div
        ref={ref}
        className={cn(
          "relative z-10 mx-auto max-w-4xl px-6 py-24 md:py-32 text-center transition-all duration-1000",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <h2 className="font-display font-medium uppercase leading-[1.02] tracking-[-0.005em] text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-balance">
          Ready to elevate your content?
        </h2>
        <p className="mt-8 text-base md:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
          Book a call to discuss your editing needs.
        </p>
        <div className="mt-12">
          <a
            href="mailto:mostafakhaled369852@gmai.com"
            className="shine inline-flex items-center justify-center rounded-[3px] bg-primary px-12 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-all duration-300 hover:shadow-gold-glow hover:scale-[1.04]"
          >
            Book A Call
          </a>
        </div>
        <p className="mt-8 text-[11px] uppercase tracking-[0.3em] text-white/50">
          Or order directly.{" "}
          <a href="/#packages" className="text-primary hover:underline underline-offset-4">
            Order Now
          </a>
        </p>
      </div>
    </section>
  );
}
