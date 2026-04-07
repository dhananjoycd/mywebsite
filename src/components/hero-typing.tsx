"use client";

import { useEffect, useMemo, useState } from "react";

type HeroTypingProps = {
  items: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
  className?: string;
};

export function HeroTyping({
  items,
  typingSpeed = 85,
  deletingSpeed = 45,
  pauseMs = 1400,
  className = "",
}: HeroTypingProps) {
  const safeItems = useMemo(() => items.filter(Boolean), [items]);
  const [itemIndex, setItemIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (safeItems.length === 0) return;

    const current = safeItems[itemIndex % safeItems.length];

    if (!isDeleting && displayText === current) {
      const timeout = window.setTimeout(() => setIsDeleting(true), pauseMs);
      return () => window.clearTimeout(timeout);
    }

    if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setItemIndex((prev) => (prev + 1) % safeItems.length);
      return;
    }

    const nextText = isDeleting
      ? current.slice(0, displayText.length - 1)
      : current.slice(0, displayText.length + 1);

    const timeout = window.setTimeout(
      () => setDisplayText(nextText),
      isDeleting ? deletingSpeed : typingSpeed,
    );

    return () => window.clearTimeout(timeout);
  }, [
    deletingSpeed,
    displayText,
    isDeleting,
    itemIndex,
    pauseMs,
    safeItems,
    typingSpeed,
  ]);

  if (safeItems.length === 0) return null;

  return (
    <span className={className} aria-label={safeItems[itemIndex % safeItems.length]}>
      {displayText}
      <span className="ml-1 inline-block h-[0.95em] w-px translate-y-[2px] animate-pulse bg-cyan-300 align-middle" />
    </span>
  );
}
