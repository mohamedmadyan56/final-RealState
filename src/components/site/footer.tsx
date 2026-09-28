"use client";

const NAV_GROUPS = [
  {
    title: "Navigate",
    links: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Black Label", href: "#dedicated" },
      { label: "À La Carte", href: "#packages" },
      { label: "Work", href: "#work" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Packages",
    links: [
      { label: "Viral Cut — $129", href: "#packages" },
      { label: "Branding Cut — $89", href: "#packages" },
      { label: "Cinematic Cut — $129", href: "#packages" },
      { label: "Groovy Cut — $129", href: "#packages" },
      { label: "Value Cut — $69", href: "#packages" },
      { label: "Dedicated Editor", href: "#dedicated" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Instagram", href: "#" },
      { label: "YouTube", href: "#" },
      { label: "TikTok", href: "#" },
      { label: "Behance", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "WhatsApp", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        {/* Top */}
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Brand block */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-full border border-primary/30">
                <img
                  src="/logo-mustafa.png"
                  alt="Mustafa Khaled logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="font-display text-base font-semibold">
                  Mustafa Khaled
                </div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Cinematic Editor
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm text-muted-foreground leading-relaxed">
              Premium video editing for real estate media companies, agents, and
              creators who refuse to look like everyone else.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-soft-pulse" />
              Available for new projects
            </div>
          </div>

          {/* Nav columns */}
          {NAV_GROUPS.map((group) => (
            <div key={group.title} className="lg:col-span-2">
              <div className="text-[10px] uppercase tracking-[0.25em] text-primary mb-4">
                {group.title}
              </div>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact mini-card */}
          <div className="lg:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.25em] text-primary mb-4">
              Get In Touch
            </div>
            <div className="space-y-2 text-sm">
              <a
                href="mailto:hello@mustafakhaled.com"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                hello@mustafakhaled.com
              </a>
              <a
                href="tel:+201000000000"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                +20 100 000 0000
              </a>
              <div className="text-muted-foreground">Cairo, Egypt</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-border/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Mustafa Khaled. All rights reserved.
          </div>
          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
