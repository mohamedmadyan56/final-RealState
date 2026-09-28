"use client";

export function About() {
  return (
    <section id="about" className="relative py-28 lg:py-36 border-t border-border/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left: heading */}
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
              About The Editor
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold leading-[1.05] text-balance">
              A craftsman, <span className="italic gold-gradient-text">not a vendor</span>.
            </h2>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-border bg-card/40 px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-soft-pulse" />
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Cairo, Egypt · Working Worldwide
              </span>
            </div>
          </div>

          {/* Right: bio content */}
          <div className="lg:col-span-7 space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Mustafa Khaled is a cinematic video editor based in Cairo, Egypt —
              building a reputation over the past two years for cuts that feel
              intentional, premium, and on-trend. He started where most editors
              start: cutting quick social clips for clients who needed volume.
              What set him apart was the refusal to treat any project as a
              checkbox.
            </p>
            <p>
              Today, Mustafa works with real estate media companies, agents, and
              ambitious brands that care about the same thing he does: that every
              second of footage earns its place in the final cut. His style
              blends cinematic color grading with rhythm-driven pacing — the kind
              of edit that holds attention past the three-second hook and
              actually converts viewers into clients.
            </p>
            <p>
              Two years in, the work has generated over 5 million views across
              platforms and counting. The mission stays the same: build an
              editing practice that operates like a small studio — disciplined,
              reliable, and creatively uncompromising. Every delivery gets
              reviewed. Every cut gets sharpened. No exceptions.
            </p>

            {/* Skills / stack */}
            <div className="pt-6 border-t border-border">
              <div className="text-xs uppercase tracking-[0.25em] text-primary mb-4">
                Tools &amp; Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Final Cut Pro",
                  "Adobe Premiere Pro",
                  "After Effects",
                  "DaVinci Resolve",
                  "Color Grading",
                  "Sound Design",
                  "Motion Graphics",
                  "Reels · TikTok · Shorts",
                ].map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-card/40 px-4 py-1.5 text-xs text-foreground/80"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
