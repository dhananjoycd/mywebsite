"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, MessageCircleMore, X, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

// Point 2: Clean 1/2 words meaningful non-duplicate navigation
const navigation = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Works", href: "#projects" },
  { label: "Journey", href: "#timeline" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
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

  const servicesHref = pathname === "/" ? "#services" : "/#services";

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-slate-950/40 backdrop-blur-2xl [mask-image:linear-gradient(to_bottom,black_0%,black_75%,transparent_100%)]"
      />
      <div className="relative px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[28px] border border-white/10 bg-slate-950/70 px-4 py-2.5 shadow-[0_18px_40px_rgba(2,6,23,0.3)] backdrop-blur-2xl">
          <div className="flex items-center justify-between gap-4">
            {/* Logo & Name */}
            <Link href="/#home" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-slate-900/90 p-1 shadow-[0_0_0_2px_rgba(34,211,238,0.15)]">
                <Image
                  src="/images/logo.png"
                  alt="Dhananjoy"
                  width={34}
                  height={34}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
              <div>
                <p className="font-display text-xs sm:text-sm font-semibold tracking-wide text-white">
                  Dhananjoy Chandra Das
                </p>
                <p className="text-[10px] text-cyan-300">Full-Stack Web Developer</p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden items-center gap-5 xl:flex">
              {links.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-xs font-medium text-slate-300 transition hover:text-cyan-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Quick Action Buttons */}
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                href="/track-order"
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-cyan-400/30 hover:bg-white/10 hover:text-white"
              >
                Track Order
              </Link>
              <Link href={servicesHref}>
                <Button size="default" className="rounded-full h-8 px-3.5 text-xs font-bold gap-1.5 bg-cyan-400 text-slate-950 hover:bg-cyan-300">
                  <ShoppingBag className="h-3.5 w-3.5" /> Book Service
                </Button>
              </Link>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:text-white xl:hidden"
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Flyout Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-3 rounded-[24px] border border-white/10 bg-slate-950/95 p-5 shadow-2xl backdrop-blur-2xl xl:hidden"
            >
              <nav className="flex flex-col gap-2.5">
                {links.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-cyan-300"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
                  <Link
                    href="/track-order"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-center text-xs font-medium text-slate-200"
                  >
                    Track Order Status
                  </Link>
                  <Link
                    href={servicesHref}
                    onClick={() => setMenuOpen(false)}
                  >
                    <Button className="w-full justify-center gap-2 rounded-xl text-xs font-bold bg-cyan-400 text-slate-950 h-9">
                      <ShoppingBag className="h-3.5 w-3.5" /> Book Service
                    </Button>
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
