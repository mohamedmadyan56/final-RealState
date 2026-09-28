import type { Metadata } from "next";
import { Anton, Instrument_Serif, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { Loader } from "@/components/site/loader";

const display = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const accent = Instrument_Serif({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const sans = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mustafa Khaled · Cinematic Video Editing",
  description:
    "Premium video editing for real estate media companies, agents, and creators. Cinematic quality. Consistent results. Crafted by Mustafa Khaled.",  keywords: [
    "video editing",
    "real estate video",
    "cinematic editing",
    "Mustafa Khaled",
    "Egypt video editor",
    "reels editing",
    "TikTok editing",
    "MLS video",
  ],
  authors: [{ name: "Mustafa Khaled" }],
  icons: {
    icon: "/logo-mk.png",
    apple: "/logo-mk.png",
  },
  openGraph: {
    title: "Mustafa Khaled · Cinematic Video Editing",
    description:
      "Premium video editing for real estate media companies, agents, and creators. Cinematic quality. Consistent results.",
    url: "https://mustafakhaled.com",
    siteName: "Mustafa Khaled",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mustafa Khaled · Cinematic Video Editing",
    description:
      "Premium video editing for real estate media companies, agents, and creators.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${display.variable} ${accent.variable} ${sans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll />
        <Loader />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
