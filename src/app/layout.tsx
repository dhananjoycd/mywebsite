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
  title: "Dhananjoy Chandra Das | Full Stack Web Developer",
  description:
    "I am studying mathematics and passionate about web development. I am proficient in Next.js, React, TypeScript, Node.js, Express.js, MongoDB, MySQL, PostgreSQL, Prisma, and more. I love fixing bugs and learning new technologies. I am a quick learner and always eager to learn new things.",
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
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
