import * as React from "react";

import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-white/8 bg-white/[0.03] shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl transition-all duration-500 ease-out",
        className,
      )}
      {...props}
    />
  );
}