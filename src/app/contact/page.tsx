"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
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
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f2ecdf] text-[#171410]">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-32 md:pt-40 pb-14">
          <div className="film-grain" />
          <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-[#ff4d00]">
              ( Contact ) — ~2 hrs response
            </p>
            <h1 className="mt-3 font-display uppercase leading-[0.88] text-[20vw] md:text-[10rem]">
              Say <span className="text-[#ff4d00]">cut.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base md:text-lg leading-relaxed text-[#171410]/70">
              A listing, a launch, a brand. Send the footage and the ambition —{" "}
              <span className="font-accent italic text-[#171410]">I&apos;ll take it from there.</span>
            </p>

            <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {INFO.map((item) => (
                <div key={item.label} className="rounded-xl border-2 border-[#171410] bg-[#fff8ea] p-4 transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0_#171410]">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6f6656]">
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="mt-2 block break-all text-sm font-bold hover:text-[#ff4d00] transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div className="mt-2 text-sm font-bold">{item.value}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24 md:pb-32">
          <form onSubmit={onSubmit} className="mx-auto max-w-3xl px-5 md:px-10">
            <div className="rounded-2xl border-2 border-[#171410] bg-[#fff8ea] p-6 md:p-10 shadow-[8px_8px_0_#171410]">
              <Field num="01" label="Name" name="name" placeholder="Your full name" required />
              <Field num="02" label="Email" name="email" type="email" placeholder="you@company.com" required />
              <Field num="03" label="Phone / WhatsApp" name="phone" placeholder="+20 ..." />
              <Field num="04" label="Company or brokerage" name="company" placeholder="Company name" />

              <div className="py-7 border-b-2 border-[#171410]/15">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-2xl text-[#ff4d00]">05</span>
                  <label className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-[#6f6656]">
                    You are a
                  </label>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {ROLES.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={cn(
                        "rounded-full px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] border-2 transition-all",
                        role === r
                          ? "bg-[#ff4d00] border-[#ff4d00] text-[#fff8ea]"
                          : "border-[#171410]/25 hover:border-[#171410]"
                      )}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="py-7">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-2xl text-[#ff4d00]">06</span>
                  <label htmlFor="project" className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-[#6f6656]">
                    The project
                  </label>
                </div>
                <textarea
                  id="project"
                  name="project"
                  required
                  rows={5}
                  placeholder="Footage type, package (Viral / Cinematic / Dedicated...), deadline, links..."
                  className="mt-4 w-full rounded-xl border-2 border-[#171410]/25 bg-[#f2ecdf] p-4 placeholder:text-[#171410]/35 focus:outline-none focus:border-[#ff4d00] transition-colors"
                />
                <input
                  name="website"
                  placeholder="Website or listing link (optional)"
                  className="mt-4 w-full border-b-2 border-[#171410]/25 bg-transparent py-3 placeholder:text-[#171410]/35 focus:border-[#ff4d00] focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#171410] px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] text-[#f2ecdf] transition-all hover:bg-[#ff4d00] hover:text-[#fff8ea] disabled:opacity-60 disabled:pointer-events-none"
              >
                {status === "sending" ? "Sending…" : "Send request"}
                <ArrowUpRight size={17} strokeWidth={2.5} className="transition-transform group-hover:rotate-45" />
              </button>
              {status === "sent" && (
                <p className="mt-4 text-sm font-bold text-[#ff4d00]">
                  ✓ Request sent! I usually reply within ~2 hours.
                </p>
              )}
              {status === "error" && (
                <p className="mt-4 text-sm font-bold text-red-600">
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

function Field({ num, label, name, placeholder, required, type }: {
  num: string; label: string; name: string; placeholder: string; required?: boolean; type?: string;
}) {
  return (
    <div className="py-6 border-b-2 border-[#171410]/15">
      <div className="flex items-baseline gap-4">
        <span className="font-display text-2xl text-[#ff4d00]">{num}</span>
        <label htmlFor={name} className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-[#6f6656]">
          {label}
        </label>
      </div>
      <input
        id={name}
        name={name}
        type={type ?? "text"}
        required={required}
        placeholder={placeholder}
        className="mt-3 w-full border-b-2 border-[#171410]/25 bg-transparent py-2.5 text-lg placeholder:text-[#171410]/30 focus:border-[#ff4d00] focus:outline-none transition-colors"
      />
    </div>
  );
}
