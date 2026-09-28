"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";
import { LogoMark } from "@/components/site/logo";

const NAV_GROUPS = [
  {
    title: "Sitemap",
    links: [
      { label: "Showreel", href: "#work" },
      { label: "Packages", href: "#packages" },
      { label: "The Editor", href: "#about" },
      { label: "Dedicated", href: "#dedicated" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Cuts",
    links: [
      { label: "Viral — $279", href: "#packages" },
      { label: "Branding — $189", href: "#packages" },
      { label: "Groovy — $279", href: "#packages" },
      { label: "Cinematic — $279", href: "#packages" },
      { label: "Value — $149", href: "#packages" },
    ],
  },
  {
    title: "Socials",
    links: [
      { label: "Instagram ↗", href: "https://www.instagram.com/kiratheunholyx" },
      { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/mustafa-khaled-2348413b5" },
      { label: "WhatsApp ↗", href: "https://wa.me/201096994582" },
      { label: "YouTube ↗", href: "#" },
      { label: "TikTok ↗", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#171410] text-[#f2ecdf]">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 pt-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <a href="/#home" className="flex items-center gap-3">
              <LogoMark className="h-12 w-12" />
              <span className="font-display text-2xl uppercase">Mustafa Khaled</span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#f2ecdf]/60">
              Premium video editing for real estate media companies, agents, and
              creators who refuse to look like everyone else.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#f2ecdf]/25 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff4d00] animate-soft-pulse" />
              Available for new projects
            </div>
            <div className="mt-6 space-y-1 text-sm text-[#f2ecdf]/70">
              <a href="mailto:mostafakhaled369852@gmai.com" className="block hover:text-[#ff4d00] transition-colors">
                mostafakhaled369852@gmai.com
              </a>
              <a href="tel:+201096994582" className="block hover:text-[#ff4d00] transition-colors">
                +20 109 699 4582
              </a>
              <span className="block">Cairo, Egypt → Worldwide</span>
            </div>
          </div>

          {NAV_GROUPS.map((group) => (
            <div key={group.title} className="lg:col-span-2">
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#ff4d00]">
                {group.title}
              </div>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-[#f2ecdf]/70 transition-colors hover:text-[#ff4d00]">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-1 flex lg:justify-end items-start">
            <a
              href="#home"
              aria-label="Back to top"
              className="group grid h-14 w-14 place-items-center rounded-full border-2 border-[#f2ecdf]/30 transition-all hover:border-[#ff4d00] hover:bg-[#ff4d00]"
            >
              <ArrowUp size={20} className="transition-transform group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="mt-14 select-none overflow-hidden border-t border-[#f2ecdf]/15 pt-6" aria-hidden="true">
          <div className="whitespace-nowrap font-display uppercase leading-[0.85] text-[12.5vw] text-outline-paper opacity-40">
            Mustafa Khaled ✦ Cuts
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-t border-[#f2ecdf]/15 py-6 text-xs text-[#f2ecdf]/50">
          <span>© {new Date().getFullYear()} Mustafa Khaled. All rights reserved.</span>
          <span className="flex items-center gap-5">
            <a href="#" className="hover:text-[#f2ecdf] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#f2ecdf] transition-colors">Terms</a>
            <a href="/contact" className="inline-flex items-center gap-1 font-bold text-[#ff4d00]">
              Start a project <ArrowUpRight size={13} />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
