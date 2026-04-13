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
  const longestItem = useMemo(
    () =>
      safeItems.reduce((longest, item) =>
        item.length > longest.length ? item : longest,
      ""),
    [safeItems],
  );
  const [itemIndex, setItemIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (safeItems.length === 0) return;

    const current = safeItems[itemIndex % safeItems.length];
    const isTypingComplete = !isDeleting && displayText === current;
    const isDeletionComplete = isDeleting && displayText.length === 0;

    const timeout = window.setTimeout(() => {
      if (isTypingComplete) {
        setIsDeleting(true);
        return;
      }

      if (isDeletionComplete) {
        setIsDeleting(false);
        setItemIndex((prev) => (prev + 1) % safeItems.length);
        return;
      }

      const nextText = isDeleting
        ? current.slice(0, displayText.length - 1)
        : current.slice(0, displayText.length + 1);

      setDisplayText(nextText);
    }, isTypingComplete ? pauseMs : isDeleting ? deletingSpeed : typingSpeed);

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
    <span
      className={`relative inline-grid align-top ${className}`}
      aria-label={safeItems[itemIndex % safeItems.length]}
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="invisible col-start-1 row-start-1 whitespace-pre">
        {longestItem}
        <span className="ml-1 inline-block h-[0.95em] w-px" />
      </span>
      <span className="col-start-1 row-start-1 whitespace-pre">
        {displayText}
        <span className="ml-1 inline-block h-[0.95em] w-px translate-y-0.5 animate-pulse bg-cyan-300 align-middle" />
      </span>
    </span>
  );
}
