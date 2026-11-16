"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, ExternalLink, Loader2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Project = {
  id: string;
  name: string;
  slug: string;
  summary: string;
  highlights: string[];
  stack: string[];
  tone: string;
  image: string;
  liveClientUrl: string | null;
  liveServerUrl: string | null;
  githubClientUrl: string | null;
  githubServerUrl: string | null;
  featured: boolean;
  orderIndex: number;
};

export function ProjectsManager({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isNew = !editingProject?.id;

  const handleOpenNew = () => {
    setEditingProject({
      name: "",
      slug: "",
      summary: "",
      highlights: ["Feature highlight 1", "Feature highlight 2"],
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      tone: "Platform",
      image: "/images/projects/foodhub.jpg",
      liveClientUrl: "#",
      liveServerUrl: "#",
      githubClientUrl: "#",
      githubServerUrl: "#",
      featured: true,
      orderIndex: projects.length,
    });
    setError(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.name || !editingProject.summary) {
      setError("Project name and summary are required.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/projects", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to save project");

      if (isNew) {
        setProjects([...projects, data.project]);
      } else {
        setProjects(projects.map((p) => (p.id === data.project.id ? data.project : p)));
      }
      setEditingProject(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error saving project";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to delete");
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error deleting";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-6">
        <Button onClick={handleOpenNew} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </div>

      {editingProject && (
        <Card className="mb-8 rounded-3xl border-cyan-400/30 bg-slate-950/80 p-6 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="font-display text-lg font-semibold text-white">
              {isNew ? "Add New Project" : `Edit Project: ${editingProject.name}`}
            </h2>
            <button
              onClick={() => setEditingProject(null)}
              className="text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {error && (
            <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSave} className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400">Name</label>
              <input
                type="text"
                value={editingProject.name || ""}
                onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                placeholder="e.g. FoodHub"
                required
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400">Tone/Badge</label>
              <input
                type="text"
                value={editingProject.tone || ""}
                onChange={(e) => setEditingProject({ ...editingProject, tone: e.target.value })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                placeholder="e.g. Platform, Management"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-wider text-slate-400">Summary</label>
              <textarea
                value={editingProject.summary || ""}
                onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                rows={2}
                placeholder="Brief description of the project"
                required
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400">Image Path</label>
              <input
                type="text"
                value={editingProject.image || ""}
                onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                placeholder="/images/projects/your-image.jpg"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400">Live Client URL</label>
              <input
                type="text"
                value={editingProject.liveClientUrl || ""}
                onChange={(e) => setEditingProject({ ...editingProject, liveClientUrl: e.target.value })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400">GitHub Client URL</label>
              <input
                type="text"
                value={editingProject.githubClientUrl || ""}
                onChange={(e) => setEditingProject({ ...editingProject, githubClientUrl: e.target.value })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                placeholder="https://github.com/..."
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400">GitHub Server URL</label>
              <input
                type="text"
                value={editingProject.githubServerUrl || ""}
                onChange={(e) => setEditingProject({ ...editingProject, githubServerUrl: e.target.value })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                placeholder="https://github.com/..."
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-wider text-slate-400">Tech Stack (comma separated)</label>
              <input
                type="text"
                value={editingProject.stack?.join(", ") || ""}
                onChange={(e) => setEditingProject({ ...editingProject, stack: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                placeholder="Next.js, TypeScript, Tailwind CSS, PostgreSQL"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-wider text-slate-400">Highlights (one per line)</label>
              <textarea
                value={editingProject.highlights?.join("\n") || ""}
                onChange={(e) => setEditingProject({ ...editingProject, highlights: e.target.value.split("\n").filter(Boolean) })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                rows={3}
                placeholder="Built with Next.js App Router&#10;Integrated Stripe payment"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" disabled={isLoading} className="gap-2">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Project
              </Button>
              <Button type="button" variant="secondary" onClick={() => setEditingProject(null)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Projects List Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col overflow-hidden rounded-3xl border-white/8 bg-slate-950/60 p-5">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
              <Image
                src={project.image || "/images/projects/foodhub.jpg"}
                alt={project.name}
                fill
                className="object-cover"
              />
              <span className="absolute left-3 top-3 rounded-full border border-cyan-400/30 bg-slate-950/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-200">
                {project.tone}
              </span>
            </div>

            <div className="mt-4 flex-1">
              <h3 className="font-display text-lg font-semibold text-white">{project.name}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-300 line-clamp-2">{project.summary}</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.slice(0, 4).map((tech) => (
                  <span key={tech} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-slate-300">
                    {tech}
                  </span>
                ))}
                {project.stack.length > 4 && (
                  <span className="text-[10px] text-slate-500">+{project.stack.length - 4}</span>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-4">
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => setEditingProject(project)}
                  className="h-8 w-8 rounded-lg"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => handleDelete(project.id)}
                  className="h-8 w-8 rounded-lg text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>

              {project.liveClientUrl && project.liveClientUrl !== "#" && (
                <a
                  href={project.liveClientUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-cyan-300 hover:underline"
                >
                  Live <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

