"use client";

import { Check } from "lucide-react";

type Pkg = {
  name: string;
  price: string;
  duration: string;
  tagline: string;
  useCase: string;
  features: string[];
  highlighted?: boolean;
};

const PACKAGES: Pkg[] = [
  {
    name: "Viral Cut",
    price: "$129",
    duration: "15–75 sec",
    tagline: "Fast, trend-driven",
    useCase: "Reels, TikTok, Shorts",
    features: [
      "Hook-first edit",
      "Trending audio sync",
      "Captions + emoji overlays",
      "48h delivery",
      "2 revisions",
    ],
  },
  {
    name: "Branding Cut",
    price: "$89",
    duration: "15–40 sec",
    tagline: "Text-driven, structured",
    useCase: "Authority & reach",
    features: [
      "Brand-locked motion text",
      "Lower thirds + intros",
      "Color-matched palette",
      "48h delivery",
      "2 revisions",
    ],
  },
  {
    name: "Cinematic Cut",
    price: "$129",
    duration: "20 sec – 2 min",
    tagline: "Elegant, cinematic",
    useCase: "MLS & flagship listings",
    features: [
      "Cinematic color grade",
      "Sound-designed ambient bed",
      "Smooth speed ramps",
      "72h delivery",
      "3 revisions",
    ],
    highlighted: true,
  },
  {
    name: "Groovy Cut",
    price: "$129",
    duration: "15–75 sec",
    tagline: "Creative, rhythmic",
    useCase: "Standout social posts",
    features: [
      "Beat-matched cuts",
      "Creative transitions",
      "Typography in motion",
      "48h delivery",
      "2 revisions",
    ],
  },
  {
    name: "Value Cut",
    price: "$69",
    duration: "Walk-through",
    tagline: "Clean, ambient",
    useCase: "Quick property tours",
    features: [
      "Clean trim & pacing",
      "Ambient music bed",
      "Subtle color correction",
      "24h delivery",
      "1 revision",
    ],
  },
];

export function Packages() {
  return (
    <section
      id="packages"
      className="relative py-28 lg:py-36 border-t border-border/40"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
              À La Carte · Per-Video Editing
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] text-balance">
              Choose your style. <br />
              <span className="gold-gradient-text italic">
                Get your edit.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground leading-relaxed">
            Pick a package, upload your footage, get a polished cut back — no
            retainer, no friction. Built for agents, media companies, and
            creators who need results fast.
          </p>
        </div>

        {/* Packages grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {PACKAGES.map((pkg) => (
            <PackageCard key={pkg.name} pkg={pkg} />
          ))}
        </div>

        {/* Custom CTA */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-border bg-card/40 backdrop-blur px-8 py-7">
          <div>
            <div className="font-display text-xl font-semibold">
              Need something custom?
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Long-form, branded series, recurring content pipelines — let&apos;s
              scope it together.
            </p>
          </div>
          <a
            href="#contact"
            className="rounded-full border border-primary/50 px-6 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Request a custom quote →
          </a>
        </div>
      </div>
    </section>
  );
}

function PackageCard({ pkg }: { pkg: Pkg }) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 ${
        pkg.highlighted
          ? "gold-border-gradient shadow-gold-glow"
          : "border border-border bg-card/40 hover:border-primary/40"
      }`}
    >
      {pkg.highlighted && (
        <div className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold text-primary-foreground">
          Most Chosen
        </div>
      )}

      <div className="text-sm font-semibold text-foreground">{pkg.name}</div>
      <div className="mt-1 text-xs text-muted-foreground">{pkg.tagline}</div>

      <div className="mt-5 flex items-baseline gap-1">
        <span className="font-display text-4xl font-semibold gold-gradient-text">
          {pkg.price}
        </span>
        <span className="text-xs text-muted-foreground">/video</span>
      </div>

      <div className="mt-3 inline-flex w-fit rounded-full border border-border/60 bg-background/40 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
        {pkg.duration}
      </div>

      <div className="mt-5 text-xs uppercase tracking-[0.18em] text-primary/80">
        {pkg.useCase}
      </div>

      <ul className="mt-5 space-y-2.5 flex-1">
        {pkg.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-foreground/85">
            <Check
              size={15}
              className="mt-0.5 shrink-0 text-primary"
              strokeWidth={2.5}
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
          pkg.highlighted
            ? "bg-primary text-primary-foreground hover:shadow-gold-glow"
            : "border border-border text-foreground hover:border-primary/60 hover:text-primary"
        }`}
      >
        Select
      </a>
    </div>
  );
}
