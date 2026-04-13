"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, MessageCircleMore, X } from "lucide-react";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { Button, buttonVariants } from "@/components/ui/button";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "Blog", href: "/blog" },
];

function resolveHref(pathname: string, href: string) {
  if (!href.startsWith("#")) return href;
  return pathname === "/" ? href : `/${href}`;
}

export function SiteNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = useMemo(
    () => navigation.map((item) => ({ ...item, href: resolveHref(pathname, item.href) })),
    [pathname],
  );

  const ctaHref = pathname === "/" ? "#contact" : "/#contact";
  const resumeHref = "https://drive.google.com/uc?export=download&id=14wDMPhN_NincwEaMl_3B3ikaeJ2Z9Ir1";

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-slate-950/28 backdrop-blur-2xl [mask-image:linear-gradient(to_bottom,black_0%,black_75%,transparent_100%)]"
      />
      <div className="relative px-4 pt-3 sm:px-6 sm:pt-4 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[28px] border border-white/10 bg-slate-950/55 px-4 py-3 shadow-[0_18px_40px_rgba(2,6,23,0.24)] backdrop-blur-2xl supports-[backdrop-filter]:bg-slate-950/45">
        <div className="flex items-center justify-between gap-4">
          <Link href="/#home" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/30 bg-slate-900/90 p-1.5 shadow-[0_0_0_2px_rgba(34,211,238,0.12)]">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <div>
              <p className="font-display text-sm font-semibold tracking-wide text-white">
            Dhananjoy Chandra Das
              </p>
              <p className="text-xs text-slate-400">Full Stack Web Developer</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex">
            {links.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-slate-300 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <a
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "secondary" })}
            >
              Resume
              <Download className="h-4 w-4" />
            </a>
            <Link href={ctaHref}>
              <Button>
                Let&apos;s Talk
                <MessageCircleMore className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition hover:border-cyan-400/30 hover:text-cyan-200 sm:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="mt-4 border-t border-white/8 pt-4 sm:hidden"
            >
              <div className="grid gap-2">
                {links.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl border border-white/8 bg-white/3 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-400/25 hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="mt-4 grid gap-3">
                <a
                  href={resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "secondary", className: "w-full" })}
                >
                  Resume
                  <Download className="h-4 w-4" />
                </a>
                <Link href={ctaHref} onClick={() => setMenuOpen(false)}>
                  <Button className="w-full">
                    Let&apos;s Talk
                    <MessageCircleMore className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
