"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function CursorAura() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const x = useSpring(mouseX, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });
  const y = useSpring(mouseY, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    const handleMove = (event: MouseEvent) => {
      mouseX.set(event.clientX - 160);
      mouseY.set(event.clientY - 160);
    };

    const handleLeave = () => {
      mouseX.set(-260);
      mouseY.set(-260);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseout", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseout", handleLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[45] hidden h-80 w-80 rounded-full md:block"
      style={{ x, y }}
    >
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.14),rgba(59,130,246,0.10)_26%,rgba(34,211,238,0.04)_46%,transparent_72%)] blur-3xl" />
      <div className="absolute inset-[22%] rounded-full border border-cyan-300/8 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_72%)] blur-2xl" />
    </motion.div>
  );
}