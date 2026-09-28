import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Mustafa Khaled · Cinematic Video Editing",
  description:
    "Premium video editing for real estate media companies, agents, and creators. Cinematic quality. Consistent results. Crafted by Mustafa Khaled.",
  keywords: [
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
    icon: "/logo-mustafa.png",
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
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
