"use client";

import { GraduationCap, BriefcaseBusiness, Calendar, Building2, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

type ExperienceItem = {
  id?: string;
  title: string;
  period: string;
  text: string;
  highlights: string[];
  featured?: boolean;
};

type EducationItem = {
  id?: string;
  title: string;
  institution: string;
  period: string;
  summary: string;
  highlights: string[];
  meta?: string | null;
};

export function TimelineSection({
  experiences,
  educations,
}: {
  experiences: ExperienceItem[];
  educations: EducationItem[];
}) {
  return (
    <div className="space-y-16">
      {/* 1. Experience Timeline */}
      <div>
        <Reveal>
          <SectionHeading
            eyebrow="Work & Leadership"
            title="Practical experience shaped by engineering, teaching, & research"
            description="Proven track record in full-stack architecture, university instruction, and quantitative mathematical modeling."
          />
        </Reveal>

        <div className="relative mt-10 space-y-8 pl-6 before:absolute before:bottom-2 before:left-2 before:top-2 before:w-[2px] before:bg-gradient-to-b before:from-cyan-400 before:via-blue-500 before:to-transparent">
          {experiences.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <div className="relative group">
                {/* Timeline Glow Node */}
                <span className="absolute -left-[30px] top-6 flex h-4 w-4 items-center justify-center rounded-full border-2 border-cyan-400 bg-slate-950 shadow-[0_0_12px_rgba(34,211,238,0.8)] transition group-hover:scale-125" />

                <Card
                  className={`rounded-3xl p-6 sm:p-8 transition duration-300 hover:border-cyan-400/40 ${
                    item.featured
                      ? "border-cyan-400/25 bg-[linear-gradient(135deg,rgba(34,211,238,0.08),rgba(2,6,23,0.7))] shadow-[0_10px_35px_rgba(34,211,238,0.06)]"
                      : "border-white/8 bg-slate-950/60"
                  }`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                        <BriefcaseBusiness className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {item.title}
                        </h3>
                        {item.featured && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
                            <Sparkles className="h-3 w-3" /> Core Professional Focus
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-slate-300 sm:self-center">
                      <Calendar className="h-3 w-3 text-cyan-400" />
                      {item.period}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    {item.text}
                  </p>

                  <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {item.highlights.map((point) => (
                      <div
                        key={point}
                        className="flex items-start gap-2.5 rounded-xl border border-white/6 bg-white/[0.02] p-3 text-xs text-slate-200"
                      >
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* 2. Education Timeline */}
      <div>
        <Reveal>
          <SectionHeading
            eyebrow="Academic Background"
            title="Rigorous mathematics & analytical foundation"
            description="Higher education background that powers algorithm design, optimization, and structured problem-solving."
          />
        </Reveal>

        <div className="relative mt-10 space-y-8 pl-6 before:absolute before:bottom-2 before:left-2 before:top-2 before:w-[2px] before:bg-gradient-to-b before:from-emerald-400 before:via-cyan-500 before:to-transparent">
          {educations.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <div className="relative group">
                {/* Timeline Glow Node */}
                <span className="absolute -left-[30px] top-6 flex h-4 w-4 items-center justify-center rounded-full border-2 border-emerald-400 bg-slate-950 shadow-[0_0_12px_rgba(52,211,153,0.8)] transition group-hover:scale-125" />

                <Card className="rounded-3xl border-white/8 bg-slate-950/60 p-6 sm:p-8 transition duration-300 hover:border-emerald-400/40">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                        <GraduationCap className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {item.title}
                        </h3>
                        <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
                          <Building2 className="h-3.5 w-3.5" />
                          {item.institution}
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-slate-300 sm:self-center">
                      <Calendar className="h-3 w-3 text-emerald-400" />
                      {item.period}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    {item.summary}
                  </p>

                  <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {item.highlights.map((point) => (
                      <div
                        key={point}
                        className="flex items-start gap-2.5 rounded-xl border border-white/6 bg-white/[0.02] p-3 text-xs text-slate-200"
                      >
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  {item.meta && (
                    <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-200">
                      <span>Academic Note:</span>
                      <span className="font-mono text-white">{item.meta}</span>
                    </div>
                  )}
                </Card>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

