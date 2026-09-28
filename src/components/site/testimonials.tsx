"use client";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Mustafa created a style that many try to imitate, but none can match. Truly the best in the business.",
    name: "Ahmed Salem",
    title: "Founder · Resonate Media",
  },
  {
    quote:
      "The solution we all needed. Fast, cinematic, and consistent. Every single cut just hits.",
    name: "Mariam Hassan",
    title: "Creative Director · Studio 910",
  },
  {
    quote:
      "The difference between Mustafa and other editors is his relentless pursuit of improvement. He&apos;s built, trained, and operates like one of the best in the industry.",
    name: "Youssef Tarek",
    title: "Founder · JT Visuals",
  },
  {
    quote:
      "The editing quality is superior to anyone else I&apos;ve worked with, and I exclusively use him for all my videos. Communication is seamless, delivery is always on time.",
    name: "Chris Glenn",
    title: "Broker · Glenn & Associates",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-28 lg:py-36 border-t border-border/40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
            What Clients Say
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] text-balance">
            Words from{" "}
            <span className="italic gold-gradient-text">the field</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={i}
              className="relative rounded-2xl border border-border bg-card/40 backdrop-blur p-8 transition-all duration-500 hover:border-primary/40 hover:bg-card"
            >
              <div className="absolute top-6 right-7 font-display text-7xl text-primary/15 leading-none select-none">
                &ldquo;
              </div>
              <blockquote
                className="relative font-display text-lg leading-relaxed text-foreground/90"
                dangerouslySetInnerHTML={{ __html: `&ldquo;${t.quote}&rdquo;` }}
              />
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-background text-sm font-semibold gold-gradient-text">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {t.name}
                  </div>
                  <div
                    className="text-xs text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: t.title }}
                  />
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
