"use client";

import { ArrowUpRight } from "lucide-react";

export function CTASection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#171410] text-[#f2ecdf]">
      {/* Video backdrop */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/work/clips/listing-update.jpg"
        src="/work/clips/listing-update.mp4"
        className="cta-zoom absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#171410] via-transparent to-[#171410]" />
      <div className="film-grain" />

      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10 py-24 md:py-36 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#ff4d00]">
          ● No more boring listings
        </p>
        <h2 className="mx-auto mt-6 font-display uppercase leading-[0.88] text-[17vw] md:text-[11rem]">
          Let&apos;s make <br />
          <span className="text-[#ff4d00]">the cut</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-base md:text-lg text-[#f2ecdf]/70">
          Book a call to discuss your editing needs —{" "}
          <span className="font-accent italic text-[#f2ecdf]">usually replies within 2 hours.</span>
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-[#ff4d00] px-12 py-5 text-sm font-bold uppercase tracking-[0.2em] text-[#fff8ea] transition-all hover:scale-105 hover:-rotate-1"
          >
            Book a call
            <ArrowUpRight size={18} strokeWidth={2.5} className="transition-transform group-hover:rotate-45" />
          </a>
          <a href="/#packages" className="text-xs font-bold uppercase tracking-[0.25em] text-[#f2ecdf]/70 hover:text-[#ff4d00] transition-colors">
            Or order directly →
          </a>
        </div>
      </div>

      {/* Bottom ticker */}
      <div className="relative overflow-hidden border-t border-[#f2ecdf]/15 bg-[#ff4d00] py-2.5 text-[#fff8ea]">
        <div className="flex w-max animate-scroll-x-fast">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="whitespace-nowrap px-6 font-display text-lg uppercase">
              Ready when you are ✦ Let&apos;s cut ✦
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
