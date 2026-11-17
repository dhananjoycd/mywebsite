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
  ChevronRight,
  X,
  ExternalLink,
  Layers,
  Sparkles,
  CheckCircle2,
  FileText
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

// Helper to parse 1-4 images from images array or image field (comma-separated or JSON)
function parseProjectImages(project: Project): string[] {
  if (project.images && Array.isArray(project.images) && project.images.length > 0) {
    return project.images.filter(Boolean);
  }
  if (!project.image) return ["/images/projects/foodhub.jpg"];
  if (project.image.startsWith("[")) {
    try {
      const parsed = JSON.parse(project.image);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed.filter(Boolean);
    } catch {}
  }
  if (project.image.includes(",")) {
    return project.image.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return [project.image];
}

// Project Details Modal Component (Full Text, Complete Highlights, Full Tech Stack)
function ProjectDetailsModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  if (!project) return null;

  const imageList = parseProjectImages(project);

  const nextImage = () => {
    setActiveImgIndex((prev) => (prev + 1) % imageList.length);
  };

  const prevImage = () => {
    setActiveImgIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-cyan-400/30 bg-slate-950 p-6 sm:p-8 shadow-[0_20px_70px_rgba(34,211,238,0.15)] ring-1 ring-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                {project.tone}
              </span>
              <span className="text-xs text-slate-400">Detailed Case Study</span>
            </div>
            <h2 className="mt-1.5 font-display text-2xl sm:text-3xl font-bold text-white">
              {project.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 p-2 text-slate-400 hover:text-white hover:bg-white/5 transition"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Gallery Carousel */}
        <div className="mt-5 relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
          <Image
            src={imageList[activeImgIndex] || project.image || "/images/projects/foodhub.jpg"}
            alt={`${project.name} view ${activeImgIndex + 1}`}
            fill
            className="object-cover object-top"
          />

          {imageList.length > 1 && (
            <>
              <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
                <button
                  type="button"
                  onClick={prevImage}
                  className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/80 text-white backdrop-blur-sm hover:bg-cyan-400 hover:text-slate-950 transition shadow-lg"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/80 text-white backdrop-blur-sm hover:bg-cyan-400 hover:text-slate-950 transition shadow-lg"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Indicator Thumbnails */}
              <div className="absolute bottom-3 inset-x-0 flex justify-center gap-2 z-10">
                {imageList.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImgIndex(i)}
                    className={`relative h-10 w-16 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImgIndex === i ? "border-cyan-400 scale-105 shadow-md" : "border-white/30 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Full Overview & Summary */}
        <div className="mt-6 space-y-5 text-sm">
          <div>
            <h4 className="text-xs uppercase tracking-wider text-cyan-300 font-semibold flex items-center gap-1.5 mb-2">
              <FileText className="h-4 w-4" /> Project Overview & Objective
            </h4>
            <p className="text-slate-200 leading-relaxed bg-slate-900/50 p-4 rounded-2xl border border-white/5">
              {project.summary}
            </p>
          </div>

          {/* Complete Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider text-cyan-300 font-semibold flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Architectural Highlights & Features
              </h4>
              <div className="space-y-2 bg-slate-900/50 p-4 rounded-2xl border border-white/5">
                {project.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Tech Stack Breakdown (All badges, NO truncation) */}
          {project.stack && project.stack.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider text-cyan-300 font-semibold flex items-center gap-1.5 mb-2">
                <Layers className="h-4 w-4" /> Full Technology Stack ({project.stack.length} Technologies)
              </h4>
              <div className="flex flex-wrap gap-2 bg-slate-900/50 p-4 rounded-2xl border border-white/5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-200 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-white/10 pt-5">
          {project.liveClientUrl && project.liveClientUrl !== "#" && (
            <a
              href={project.liveClientUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none"
            >
              <Button className="w-full gap-2 bg-cyan-400 text-slate-950 hover:bg-cyan-300 font-bold">
                <ExternalLink className="h-4 w-4" />
                Launch Live App
              </Button>
            </a>
          )}

          {project.githubClientUrl && project.githubClientUrl !== "#" && (
            <a
              href={project.githubClientUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none"
            >
              <Button variant="secondary" className="w-full gap-2 text-xs">
                <Code2 className="h-4 w-4" />
                Client Code
              </Button>
            </a>
          )}

          {project.githubServerUrl && project.githubServerUrl !== "#" && (
            <a
              href={project.githubServerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none"
            >
              <Button variant="secondary" className="w-full gap-2 text-xs">
                <Server className="h-4 w-4" />
                Server Code
              </Button>
            </a>
          )}

          <Button type="button" variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

// Project Card with Single-Click Demo and "See Details" Modal Trigger
function ProjectCard({ 
  project, 
  index,
  onOpenDetails,
}: { 
  project: Project; 
  index: number;
  onOpenDetails: (project: Project) => void;
}) {
  const imageList = parseProjectImages(project);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev + 1) % imageList.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  // Single-click on photo opens live demo
  const handlePhotoClick = () => {
    if (project.liveClientUrl && project.liveClientUrl !== "#") {
      window.open(project.liveClientUrl, "_blank", "noopener,noreferrer");
    } else {
      onOpenDetails(project);
    }
  };

  return (
    <Card className="group flex h-full flex-col justify-between overflow-hidden rounded-[26px] border-white/10 bg-slate-950/70 p-0 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_12px_35px_rgba(34,211,238,0.12)]">
      {/* Top Image Viewport (Single click to open live demo) */}
      <div 
        onClick={handlePhotoClick}
        title={project.liveClientUrl && project.liveClientUrl !== "#" ? "Click to open live demo web app 🚀" : "Click to view project details"}
        className="group/photo relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-900 border-b border-white/8 cursor-pointer select-none"
      >
        <Image
          src={imageList[activeImgIndex] || project.image || "/images/projects/foodhub.jpg"}
          alt={project.name}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover Click Hint Overlay */}
        {project.liveClientUrl && project.liveClientUrl !== "#" && (
          <div className="absolute inset-0 bg-slate-950/40 opacity-0 transition-opacity duration-300 group-hover/photo:opacity-100 flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400/90 px-3.5 py-1 text-xs font-bold text-slate-950 shadow-xl backdrop-blur-md transition transform scale-95 group-hover/photo:scale-100">
              <Eye className="h-3.5 w-3.5" />
              Open Live App
            </span>
          </div>
        )}

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
          <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <button
              onClick={prevImage}
              className="pointer-events-auto flex h-7 w-7 items-center justify-center rounded-full bg-slate-950/90 text-white backdrop-blur-sm hover:bg-cyan-400 hover:text-slate-950 transition shadow-lg"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextImage}
              className="pointer-events-auto flex h-7 w-7 items-center justify-center rounded-full bg-slate-950/90 text-white backdrop-blur-sm hover:bg-cyan-400 hover:text-slate-950 transition shadow-lg"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Indicator dots */}
        {imageList.length > 1 && (
          <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1.5 z-10">
            {imageList.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImgIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  activeImgIndex === i ? "w-4 bg-cyan-400" : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Content & Details */}
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
            {project.name}
          </h3>

          {/* Equal-length snippet with inline present-color "... see more" CTA */}
          <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-300 min-h-[2.6rem]">
            <span>
              {project.summary.length > 88 
                ? project.summary.slice(0, 88).trimEnd() 
                : project.summary}
            </span>
            {project.summary.length > 88 ? (
              <>
                <span>... </span>
                <button
                  type="button"
                  onClick={() => onOpenDetails(project)}
                  className="inline font-semibold text-cyan-400 hover:text-cyan-300 hover:underline transition focus:outline-none"
                >
                  see more
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => onOpenDetails(project)}
                className="inline ml-1 font-semibold text-cyan-400 hover:text-cyan-300 hover:underline transition focus:outline-none"
              >
                ... see more
              </button>
            )}
          </p>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="mt-3.5 space-y-1.5 border-t border-white/6 pt-3">
              {project.highlights.slice(0, 3).map((point, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                  <span className="line-clamp-1">{point}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack Pills (Displaying ALL tech stack tags with flex wrap, NO +4 cut off) */}
          <div className="mt-3.5 flex flex-wrap gap-1.5 border-t border-white/6 pt-3">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-slate-300 hover:border-cyan-400/30 hover:text-cyan-200 transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons: Demo, Client, Server (Details button removed as requested) */}
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

      {/* Equal Height Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
        {projects.map((project, index) => (
          <Reveal key={project.id || project.name} delay={(index % 3) * 0.08} className="h-full">
            <ProjectCard 
              project={project} 
              index={index} 
              onOpenDetails={(p) => setSelectedProject(p)}
            />
          </Reveal>
        ))}
      </div>

      {/* Dedicated "See More" Project Case Study Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
