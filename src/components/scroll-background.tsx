"use client";

import { motion, useScroll, useTransform } from "framer-motion";

type ScrollBackgroundProps = {
  variant?: "home" | "blog";
};

export function ScrollBackground({ variant = "home" }: ScrollBackgroundProps) {
  const { scrollYProgress } = useScroll();

  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const blurOrbY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  const leftOrbClass =
    variant === "home"
      ? "absolute left-[8%] top-[18%] h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_72%)] blur-3xl"
      : "absolute left-[10%] top-[22%] h-[16rem] w-[16rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.06),transparent_72%)] blur-3xl";

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <motion.div style={{ y: gridY }} className="absolute inset-0 opacity-[0.1]">
        <div className="h-full w-full bg-[linear-gradient(rgba(148,163,184,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.15)_1px,transparent_1px)] bg-size-[112px_112px] mask-[radial-gradient(circle_at_center,black,transparent_92%)]" />
      </motion.div>

      <motion.div
        animate={{ opacity: [0.18, 0.28, 0.18] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className={leftOrbClass}
      />

      <motion.div
        style={{ y: blurOrbY }}
        animate={{ opacity: [0.12, 0.2, 0.12] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[8%] bottom-[12%] h-72 w-[18rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.10),transparent_74%)] blur-3xl"
      />
    </div>
  );
}