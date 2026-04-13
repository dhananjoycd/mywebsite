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
      <h2 className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl md:text-2xl lg:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
          {description}
        </p>
      ) : null}
    </div>
  );
}
