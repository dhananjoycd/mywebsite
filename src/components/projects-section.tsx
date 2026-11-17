"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Eye, 
  Code2, 
  Server, 
  ChevronLeft, 
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

type Project = {
  id?: string;
  name: string;
  slug?: string;
  summary: string;
  highlights: string[];
  stack: string[];
  tone: string;
  image: string;
  images?: string[];
  liveClientUrl: string | null;
  liveServerUrl?: string | null;
  githubClientUrl: string | null;
  githubServerUrl?: string | null;
  featured?: boolean;
};

// Point 3: Equal Height Project Card
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const imageList = project.images && project.images.length > 0 
    ? project.images 
    : [project.image];

  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev + 1) % imageList.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  const handleDoubleClick = () => {
    if (project.liveClientUrl && project.liveClientUrl !== "#") {
      window.open(project.liveClientUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Card className="group flex h-full flex-col justify-between overflow-hidden rounded-[26px] border-white/10 bg-slate-950/70 p-0 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_12px_35px_rgba(34,211,238,0.12)]">
      {/* Top Image Viewport (Fixed Aspect Ratio with Double-click to open Demo) */}
      <div 
        onDoubleClick={handleDoubleClick}
        title={project.liveClientUrl && project.liveClientUrl !== "#" ? "Double click to open live demo 🚀" : undefined}
        className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-900 border-b border-white/8 cursor-pointer select-none"
      >
        <Image
          src={imageList[activeImgIndex] || project.image}
          alt={project.name}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        {/* Tone Badge */}
        <span className="absolute left-3 top-3 rounded-full border border-cyan-400/30 bg-slate-950/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-300 backdrop-blur-md">
          {project.tone}
        </span>

        {/* Number Badge */}
        <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-slate-950/80 px-2.5 py-0.5 font-mono text-[10px] text-slate-300 backdrop-blur-md">
          0{index + 1}
        </span>

        {/* Multi-image Arrows */}
        {imageList.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={prevImage}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-950/80 text-white backdrop-blur-sm hover:bg-cyan-400 hover:text-slate-950 transition"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextImage}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-950/80 text-white backdrop-blur-sm hover:bg-cyan-400 hover:text-slate-950 transition"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Indicator dots */}
        {imageList.length > 1 && (
          <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1.5">
            {imageList.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  activeImgIndex === i ? "w-4 bg-cyan-400" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Content & Details (Consistent Equal Height Layout) */}
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
            {project.name}
          </h3>

          <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-300 line-clamp-2 min-h-[2.5rem]">
            {project.summary}
          </p>

          {/* Highlights (Standardized 2 Lines) */}
          <div className="mt-3.5 space-y-1.5 border-t border-white/6 pt-3 min-h-[3rem]">
            {project.highlights.slice(0, 2).map((point, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                <span className="line-clamp-1">{point}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack Pills */}
          <div className="mt-3.5 flex flex-wrap gap-1.5 min-h-[2rem]">
            {project.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-slate-300"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="text-[10px] text-slate-500 self-center">
                +{project.stack.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons: Demo, Client, Server */}
        <div className="mt-5 flex items-center gap-2 border-t border-white/8 pt-4">
          {project.liveClientUrl && project.liveClientUrl !== "#" ? (
            <a
              href={project.liveClientUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[75px]"
            >
              <Button size="default" className="w-full gap-1.5 bg-cyan-400 text-slate-950 hover:bg-cyan-300 text-xs font-bold h-8">
                <Eye className="h-3.5 w-3.5" /> Demo
              </Button>
            </a>
          ) : (
            <Button size="default" disabled className="flex-1 min-w-[75px] text-xs h-8 opacity-50">
              <Eye className="h-3.5 w-3.5" /> Demo
            </Button>
          )}

          {project.githubClientUrl && project.githubClientUrl !== "#" ? (
            <a
              href={project.githubClientUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[70px]"
            >
              <Button size="default" variant="secondary" className="w-full gap-1.5 text-xs h-8">
                <Code2 className="h-3.5 w-3.5" /> Client
              </Button>
            </a>
          ) : null}

          {project.githubServerUrl && project.githubServerUrl !== "#" ? (
            <a
              href={project.githubServerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[70px]"
            >
              <Button size="default" variant="secondary" className="w-full gap-1.5 text-xs h-8">
                <Server className="h-3.5 w-3.5" /> Server
              </Button>
            </a>
          ) : null}
        </div>
      </div>
    </Card>
  );
}

export function ProjectsSection({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <div>
      <Reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Commercial Showcase"
            title="Production-grade work with verified demos & source code"
            description="Explore full-stack platforms, client portals, and web applications built with scalable architectures and real-world UI thinking."
          />
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-cyan-300 transition hover:text-white"
          >
            Start a custom build
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>

      {/* Point 3: Equal Height Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
        {projects.map((project, index) => (
          <Reveal key={project.id || project.name} delay={(index % 3) * 0.08} className="h-full">
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
