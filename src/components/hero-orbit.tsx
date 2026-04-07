"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import {
  Braces,
  Database,
  Globe,
  Layers3,
  Smartphone,
} from "lucide-react";

const orbitItems = [
  { icon: Braces, label: "React", position: "top-[10%] left-[15%]" },
  { icon: Database, label: "Prisma", position: "top-[32%] -left-2" },
  { icon: Layers3, label: "UI", position: "bottom-[17%] left-[12%]" },
  { icon: Globe, label: "Web", position: "top-[18%] right-[6%]" },
  { icon: Globe, label: "Web", position: "bottom-[25%] right-[2%]" },
  { icon: Smartphone, label: "UX", position: "bottom-[7%] right-[20%]" },
];

export function HeroOrbit() {
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!orbitRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".orbit-ring", {
        rotation: 360,
        transformOrigin: "50% 50%",
        repeat: -1,
        duration: 26,
        ease: "none",
      });

      gsap.to(".avatar-shell", {
        y: -12,
        repeat: -1,
        yoyo: true,
        duration: 3.6,
        ease: "sine.inOut",
      });
    }, orbitRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={orbitRef}
      className="relative mx-auto flex aspect-square w-full max-w-[540px] items-center justify-center"
    >
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.28),transparent_58%)] blur-3xl" />
      <div className="orbit-ring absolute inset-[6%] rounded-full border border-cyan-400/18" />
      <div className="orbit-ring absolute inset-[15%] rounded-full border border-white/8 [animation-direction:reverse]" />
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="avatar-shell relative flex aspect-square w-[72%] items-center justify-center rounded-full border border-cyan-300/30 bg-[radial-gradient(circle_at_30%_20%,rgba(96,165,250,0.8),rgba(37,99,235,0.35)_48%,rgba(2,6,23,0.98)_85%)] p-6 shadow-[0_0_80px_rgba(37,99,235,0.28)]"
      >
        <div className="absolute inset-3 rounded-full border border-white/12" />
        <div className="relative h-full w-full rounded-full bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.08),transparent_36%),linear-gradient(180deg,rgba(2,6,23,0.1),rgba(2,6,23,0.72))]" />
        <div className="absolute inset-[20%] rounded-full bg-slate-950/95 [clip-path:polygon(44%_12%,56%_12%,67%_18%,74%_29%,73%_44%,64%_57%,58%_70%,64%_87%,52%_94%,40%_92%,35%_80%,28%_68%,29%_48%,32%_31%,38%_19%)] opacity-95" />
      </motion.div>
      {orbitItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * index, duration: 0.45 }}
            className={`absolute ${item.position} flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/75 text-cyan-300 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur`}
          >
            <Icon className="h-6 w-6" />
          </motion.div>
        );
      })}
    </div>
  );
}