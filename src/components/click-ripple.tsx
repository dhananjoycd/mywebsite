"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Ripple = {
  id: number;
  x: number;
  y: number;
};

const INTERACTIVE_SELECTOR = "a,button,input,textarea,select,label,summary,[role='button']";

export function ClickRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest(INTERACTIVE_SELECTOR)) return;

      const id = Date.now() + Math.random();
      const ripple = { id, x: event.clientX, y: event.clientY };

      setRipples((current) => [...current, ripple]);
      window.setTimeout(() => {
        setRipples((current) => current.filter((item) => item.id !== id));
      }, 700);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-60 overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ opacity: 0.26, scale: 0.2 }}
            animate={{ opacity: 0, scale: 1.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="absolute h-28 w-28 rounded-full border border-cyan-300/30 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.16),rgba(34,211,238,0.06)_36%,transparent_72%)] blur-sm"
            style={{ left: ripple.x - 56, top: ripple.y - 56 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}