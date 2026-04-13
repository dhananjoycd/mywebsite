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
"I am studing in mathematics and passionate about web development. I very expert in nextjs ,reactjs, typescript, nodejs, expresjsjs, mongodb, mysql, postgresql, prisma and many more. I love to fix a bug and learn new technology. I am a quick learner and always eager to learn new things.",
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
