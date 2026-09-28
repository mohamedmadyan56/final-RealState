"use client";

import { ArrowRight, ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden grain-overlay"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[oklch(0.10_0.02_60)]" />
        <div
          className="absolute -top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(245, 216, 150, 0.35), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(201, 160, 74, 0.4), transparent 70%)",
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 mb-8 rounded-full border border-border/60 bg-card/40 backdrop-blur px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Available for new projects · Cairo, Egypt
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[0.95] tracking-tight text-balance">
              <span className="block text-foreground">Your Content.</span>
              <span className="block gold-gradient-text italic">Elevated.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              Cinematic video editing crafted for real estate media companies,
              agents, and ambitious creators. Sharper cuts. Stronger story.
              Consistent, premium delivery — every single time.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-gold-glow hover:scale-[1.02]"
              >
                Book A Call
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
              <a
                href="#packages"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/40 backdrop-blur px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-card"
              >
                Order À La Carte
              </a>
            </div>

            {/* Sub note */}
            <div className="mt-10 flex items-center gap-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="h-px w-6 bg-primary/60" /> 2 yrs craft
              </span>
              <span className="flex items-center gap-2">
                <span className="h-px w-6 bg-primary/60" /> 5M+ views
              </span>
              <span className="flex items-center gap-2">
                <span className="h-px w-6 bg-primary/60" /> 30+ clients
              </span>
            </div>
          </div>

          {/* Right side: framed stat / quote card */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="relative">
              <div className="gold-border-gradient rounded-2xl p-8 shadow-gold-glow">
                <div className="text-xs uppercase tracking-[0.25em] text-primary mb-4">
                  Editor&apos;s Note
                </div>
                <p className="font-display text-xl leading-snug text-foreground">
                  &ldquo;Editing isn&apos;t just cutting footage. It&apos;s
                  deciding what the viewer feels next.&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    Mustafa Khaled
                  </span>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-display text-3xl font-semibold gold-gradient-text">
                      2 yrs
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      Craft
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-3xl font-semibold gold-gradient-text">
                      5M+
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      Views Driven
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-5 rounded-full border border-primary/40 bg-background/95 backdrop-blur px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-primary animate-soft-pulse">
                Final Cut Pro · Adobe Suite
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="mt-20 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <ArrowDown size={14} className="animate-bounce" />
          Scroll
        </div>
      </div>
    </section>
  );
}
