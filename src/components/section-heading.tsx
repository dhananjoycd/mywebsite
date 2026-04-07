import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-3", align === "center" && "text-center")}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/80">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
