"use client";

const FEATURES = [
  {
    num: "01",
    title: "Dedicated Editor",
    body: "Your own editor, embedded in your team. They learn your style, your standards, your workflow — not a rotating queue of freelancers.",
  },
  {
    num: "02",
    title: "Pro Infrastructure",
    body: "MacBook workstation, Final Cut Pro plugin ecosystem, internal LUTs, sound libraries, and proven templates. No setup time, just output.",
  },
  {
    num: "03",
    title: "Continuous Training",
    body: "Three structured growth sessions per week — trends, color science, sound design. Your editor doesn&apos;t plateau, they keep getting sharper.",
  },
  {
    num: "04",
    title: "Creative Oversight",
    body: "Every cut is reviewed before delivery. Direct creative direction, quality control, and a second pair of eyes that catches what others miss.",
  },
  {
    num: "05",
    title: "Built for Scale",
    body: "Reserved for companies handling consistent volume and premium work. Reliable throughput at scale — without diluting quality.",
  },
];

export function DedicatedEditor() {
  return (
    <section
      id="dedicated"
      className="relative py-28 lg:py-36 border-t border-border/40 overflow-hidden"
    >
      {/* Background flourish */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/3 -right-1/4 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(245, 216, 150, 0.3), transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
            The Black Label Division
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] text-balance">
            Your Own <span className="italic gold-gradient-text">Dedicated</span>{" "}
            Editor.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            A dedicated editor fully trained on your brand. Integrated into your
            workflow. Consistent quality at scale — for media companies and
            agencies that refuse to look like everyone else.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-border/40 rounded-2xl overflow-hidden border border-border/60">
          {FEATURES.map((f) => (
            <div
              key={f.num}
              className="group relative bg-card/40 backdrop-blur p-7 transition-colors duration-500 hover:bg-card"
            >
              <div className="font-display text-2xl font-semibold text-primary/30 group-hover:text-primary transition-colors">
                {f.num}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                {f.title}
              </h3>
              <p
                className="mt-3 text-sm text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: f.body }}
              />
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#contact"
            className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-gold-glow hover:scale-[1.02]"
          >
            Book A Call
          </a>
          <span className="text-sm text-muted-foreground">
            or browse{" "}
            <a href="#packages" className="text-primary hover:underline">
              per-video packages
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}
