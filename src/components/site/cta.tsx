"use client";

import { ArrowRight, Mail, Phone, MapPin, Instagram, Youtube } from "lucide-react";

export function CTASection() {
  return (
    <section
      id="contact"
      className="relative py-28 lg:py-36 border-t border-border/40 overflow-hidden"
    >
      {/* Backdrop flourish */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(245, 216, 150, 0.4), transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
              Ready When You Are
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.02] text-balance">
              Ready to <span className="italic gold-gradient-text">elevate</span>{" "}
              your content?
            </h2>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              Book a call to discuss your editing needs — packages, dedicated
              editor, or a custom project. Or order directly from the À La Carte
              menu. Either way, your next premium cut starts here.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:hello@mustafakhaled.com"
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
                Order Now
              </a>
            </div>

            {/* Contact info */}
            <div className="mt-12 grid sm:grid-cols-3 gap-6">
              <ContactRow
                icon={<Mail size={16} />}
                label="Email"
                value="hello@mustafakhaled.com"
                href="mailto:hello@mustafakhaled.com"
              />
              <ContactRow
                icon={<Phone size={16} />}
                label="Phone / WhatsApp"
                value="+20 100 000 0000"
                href="tel:+201000000000"
              />
              <ContactRow
                icon={<MapPin size={16} />}
                label="Based In"
                value="Cairo, Egypt"
              />
            </div>
          </div>

          {/* Right: contact card */}
          <div className="lg:col-span-5">
            <div className="gold-border-gradient rounded-2xl p-8 shadow-gold-glow">
              <div className="text-xs uppercase tracking-[0.25em] text-primary mb-4">
                Studio Hours
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Sun – Thu</span>
                  <span className="font-medium">10:00 — 22:00 EET</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Fri – Sat</span>
                  <span className="font-medium">12:00 — 20:00 EET</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-muted-foreground">Response Time</span>
                  <span className="font-medium text-primary">~ 2 hours</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
                  Follow the work
                </div>
                <div className="flex gap-3">
                  {[
                    { icon: <Instagram size={18} />, label: "Instagram" },
                    { icon: <Youtube size={18} />, label: "YouTube" },
                  ].map((s, i) => (
                    <a
                      key={i}
                      href="#"
                      aria-label={s.label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/40 text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const Wrapper: any = href ? "a" : "div";
  return (
    <Wrapper
      href={href}
      className="group flex items-start gap-3"
    >
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-card/40 text-primary">
        {icon}
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </div>
        <div className="mt-1 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
          {value}
        </div>
      </div>
    </Wrapper>
  );
}
