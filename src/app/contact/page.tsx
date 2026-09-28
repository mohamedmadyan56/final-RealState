"use client";

import { useState } from "react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { cn } from "@/lib/utils";

const ROLES = ["Agent", "Media Company", "Developer", "Creator", "Other"];

const INFO = [
  { label: "Email", value: "mostafakhaled369852@gmai.com", href: "mailto:mostafakhaled369852@gmai.com" },
  { label: "Phone / WhatsApp", value: "+20 109 699 4582", href: "https://wa.me/201096994582" },
  { label: "Based in", value: "Cairo, Egypt" },
  { label: "Working", value: "Worldwide · Remote" },
  { label: "Response", value: "~ 2 hours" },
  { label: "Instagram", value: "@kiratheunholyx", href: "https://www.instagram.com/kiratheunholyx" },
];

export default function ContactPage() {
  const [role, setRole] = useState("Agent");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    const data = new FormData(e.currentTarget);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      company: data.get("company"),
      role,
      project: data.get("project"),
      website: data.get("website"),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to send.");
      setStatus("sent");
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="relative pt-36 pb-20 border-b border-white/[0.06] bg-black overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            aria-hidden="true"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, #f5d896 0, #f5d896 1px, transparent 1px, transparent 14px)",
            }}
          />
          <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
            <p className="text-[11px] uppercase tracking-[0.35em] text-primary mb-5">
              Contact
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.05] text-white text-balance max-w-3xl">
              Tell me what you&apos;re cutting.
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed max-w-2xl">
              A listing, a launch, a brand. Send the footage and the ambition,
              and I&apos;ll take it from there.
            </p>

            {/* Info blocks */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px rounded-xl overflow-hidden border border-white/[0.07] bg-white/[0.02]">
              {INFO.map((item) => (
                <div key={item.label} className="p-5 bg-black/40">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="mt-2 block text-sm font-medium text-white hover:text-primary transition-colors break-all"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div className="mt-2 text-sm font-medium text-white">
                      {item.value}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Numbered form */}
        <section className="py-20 md:py-28">
          <form
            onSubmit={onSubmit}
            className="mx-auto max-w-3xl px-6 lg:px-10 space-y-0"
          >
            <Field num="01" label="Name" name="name" placeholder="Your full name" required />
            <Field num="02" label="Email" name="email" type="email" placeholder="you@company.com" required />
            <Field num="03" label="Phone / WhatsApp" name="phone" placeholder="+20 ..." />
            <Field num="04" label="Company or brokerage" name="company" placeholder="Company name" />

            <div className="py-8 border-b border-white/10">
              <div className="flex items-baseline gap-4">
                <span className="font-display text-primary/60">05</span>
                <label className="text-[11px] uppercase tracking-[0.3em] text-white/50">
                  You are a
                </label>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {ROLES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={cn(
                      "rounded-full px-5 py-2.5 text-[12px] uppercase tracking-[0.15em] border transition-all duration-300",
                      role === r
                        ? "bg-primary border-primary text-black font-semibold"
                        : "border-white/15 text-white/60 hover:border-primary/60 hover:text-white"
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="py-8 border-b border-white/10">
              <div className="flex items-baseline gap-4">
                <span className="font-display text-primary/60">06</span>
                <label htmlFor="project" className="text-[11px] uppercase tracking-[0.3em] text-white/50">
                  The project
                </label>
              </div>
              <textarea
                id="project"
                name="project"
                required
                rows={5}
                placeholder="Footage type, package (Viral / Cinematic / Dedicated...), deadline, links..."
                className="mt-5 w-full bg-transparent border border-white/15 rounded-lg p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors"
              />
              <input
                name="website"
                placeholder="Website or listing link (optional)"
                className="mt-4 w-full bg-transparent border-b border-white/15 focus:border-primary py-3 text-white placeholder:text-white/30 focus:outline-none transition-colors"
              />
            </div>

            <div className="pt-10">
              <button
                type="submit"
                disabled={status === "sending"}
                className="shine inline-flex items-center justify-center gap-2 rounded-[3px] bg-primary px-10 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:shadow-gold-glow hover:scale-[1.03] disabled:opacity-60 disabled:pointer-events-none"
              >
                {status === "sending" ? "Sending…" : "Send request →"}
              </button>
              {status === "sent" && (
                <p className="mt-4 text-sm text-primary">
                  Request sent! I usually reply within ~2 hours.
                </p>
              )}
              {status === "error" && (
                <p className="mt-4 text-sm text-red-400">
                  {errorMsg} — or reach me directly at mostafakhaled369852@gmai.com
                </p>
              )}
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Field({
  num,
  label,
  name,
  placeholder,
  required,
  type,
}: {
  num: string;
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div className="py-8 border-b border-white/10">
      <div className="flex items-baseline gap-4">
        <span className="font-display text-primary/60">{num}</span>
        <label htmlFor={name} className="text-[11px] uppercase tracking-[0.3em] text-white/50">
          {label}
        </label>
      </div>
      <input
        id={name}
        name={name}
        type={type ?? "text"}
        required={required}
        placeholder={placeholder}
        className="mt-4 w-full bg-transparent border-b border-white/15 focus:border-primary py-3 text-lg text-white placeholder:text-white/25 focus:outline-none transition-colors"
      />
    </div>
  );
}
