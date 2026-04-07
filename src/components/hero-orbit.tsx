"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Braces, Database, Globe, Layers3, Smartphone } from "lucide-react";

const orbitItems = [
  { icon: Braces, label: "React", position: "top-[12%] left-[16%]" },
  { icon: Database, label: "Data", position: "top-[36%] left-[2%]" },
  { icon: Layers3, label: "UI", position: "bottom-[16%] left-[15%]" },
  { icon: Globe, label: "Web", position: "top-[20%] right-[8%]" },
  { icon: Smartphone, label: "UX", position: "bottom-[12%] right-[16%]" },
];

export function HeroOrbit() {
  const orbitRef = useRef<HTMLDivElement>(null);
  const [profileSrc, setProfileSrc] = useState("/images/profile.jpg");

  useEffect(() => {
    if (!orbitRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".orbit-ring", {
        rotation: 360,
        transformOrigin: "50% 50%",
        repeat: -1,
        duration: 60,
        ease: "none",
      });

      gsap.to(".hero-core", {
        y: -6,
        repeat: -1,
        yoyo: true,
        duration: 4.2,
        ease: "sine.inOut",
      });
    }, orbitRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={orbitRef}
      className="relative mx-auto flex aspect-square w-full max-w-115 items-center justify-center"
    >
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.14),transparent_58%)] blur-3xl" />
      <div className="orbit-ring absolute inset-[7%] rounded-full border border-cyan-400/14" />
      <div className="orbit-ring absolute inset-[16%] rounded-full border border-white/8" />
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="hero-core relative flex aspect-square w-[70%] items-center justify-center rounded-full border border-cyan-300/20 bg-[radial-gradient(circle_at_30%_20%,rgba(96,165,250,0.72),rgba(37,99,235,0.24)_48%,rgba(2,6,23,0.98)_85%)] p-6 shadow-[0_0_48px_rgba(37,99,235,0.16)]"
      >
        <div className="absolute inset-3 rounded-full border border-white/12" />
        <div className="relative h-full w-full overflow-hidden rounded-full border border-cyan-200/15 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.08),transparent_40%),linear-gradient(180deg,rgba(2,6,23,0.08),rgba(2,6,23,0.72))]">
          <Image
            src={profileSrc}
            alt="Dhananjoy Chandra Das"
            fill
            sizes="(max-width: 1024px) 260px, 320px"
            className="object-cover"
            onError={() => setProfileSrc("/images/logo.png")}
            priority
          />
        </div>
      </motion.div>
      {orbitItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={`${item.label}-${index}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
            className={`absolute ${item.position} flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/78 text-cyan-300 shadow-[0_8px_24px_rgba(0,0,0,0.22)] backdrop-blur transition-transform duration-500 hover:-translate-y-1`}
          >
            <Icon className="h-5 w-5" />
          </motion.div>
        );
      })}
    </div>
  );
}