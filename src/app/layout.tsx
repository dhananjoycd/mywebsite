import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

import { HomeFab } from "@/components/home-fab";
import { SiteNavbar } from "@/components/site-navbar";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Your Name | Full-Stack Developer Portfolio",
  description:
    "A modern full-stack developer portfolio built with Next.js 15, Tailwind CSS, Framer Motion, GSAP, and Lenis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} bg-[#030816] font-sans text-slate-100 antialiased`}
      >
        <SmoothScrollProvider />
        <SiteNavbar />
        <HomeFab />
        {children}
      </body>
    </html>
  );
}