"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Compass, Home, Orbit, UserRound, Wrench, BriefcaseBusiness, FolderKanban, Mail, BookOpen } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

const items = [
  { label: "Home", href: "#home", icon: Home, x: -128, y: -10 },
  { label: "About", href: "#about", icon: UserRound, x: -116, y: -66 },
  { label: "Skills", href: "#skills", icon: Wrench, x: -84, y: -114 },
  { label: "Experience", href: "#experience", icon: BriefcaseBusiness, x: -28, y: -142 },
  { label: "Projects", href: "#projects", icon: FolderKanban, x: 34, y: -138 },
  { label: "Contact", href: "#contact", icon: Mail, x: 88, y: -104 },
  { label: "Blog", href: "/blog", icon: BookOpen, x: 122, y: -48 },
];

function resolveHref(pathname: string, href: string) {
  if (!href.startsWith("#")) return href;
  return pathname === "/" ? href : `/${href}`;
}

export function HomeFab() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = useMemo(
    () => items.map((item) => ({ ...item, href: resolveHref(pathname, item.href) })),
    [pathname],
  );

  return (
    <div className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2">
      <div className="relative h-16 w-16">
        <AnimatePresence>
          {open
            ? links.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.75, x: 0, y: 0 }}
                    animate={{ opacity: 1, scale: 1, x: item.x, y: item.y }}
                    exit={{ opacity: 0, scale: 0.75, x: 0, y: 0 }}
                    transition={{ duration: 0.34, delay: index * 0.028, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute bottom-0 right-0"
                  >
                    <Link
                      href={item.href}
                      aria-label={item.label}
                      title={item.label}
                      onClick={() => setOpen(false)}
                      className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-950/95 text-slate-100 shadow-[0_14px_30px_rgba(2,6,23,0.24)] backdrop-blur-xl transition hover:border-cyan-400/35 hover:text-cyan-200"
                    >
                      <Icon className="h-4 w-4" />
                    </Link>
                  </motion.div>
                );
              })
            : null}
        </AnimatePresence>

        <motion.div
          animate={{ rotate: open ? 180 : 360 }}
          transition={open ? { duration: 0.45, ease: [0.22, 1, 0.36, 1] } : { duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute rounded-full border border-cyan-400/20 border-dashed opacity-80"
          style={{ inset: "-6px" }}
        />
        <motion.div
          animate={{ scale: open ? 1.08 : [1, 1.04, 1] }}
          transition={open ? { duration: 0.25, ease: "easeOut" } : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.16),transparent_68%)] blur-xl"
          style={{ inset: "-12px" }}
        />

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-label={open ? "Close section navigation" : "Open section navigation"}
          aria-expanded={open}
          className="relative flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/25 bg-slate-950/92 text-cyan-300 shadow-[0_16px_34px_rgba(34,211,238,0.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/45 hover:text-cyan-200"
        >
          <Orbit className="absolute h-5 w-5 opacity-35" />
          {open ? <Compass className="relative h-4 w-4" /> : <Home className="relative h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}