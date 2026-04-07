"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full border text-sm font-semibold transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/80 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-cyan-400/60 bg-cyan-400 text-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.22)] hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-[0_10px_30px_rgba(34,211,238,0.16)]",
        secondary:
          "border-white/10 bg-white/5 text-slate-100 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/10 hover:shadow-[0_12px_28px_rgba(2,6,23,0.18)]",
        ghost:
          "border-transparent bg-transparent text-slate-300 hover:text-white",
      },
      size: {
        default: "h-11 px-5",
        lg: "h-12 px-6 text-sm",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { Button, buttonVariants };