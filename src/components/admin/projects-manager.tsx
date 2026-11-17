"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  Save, 
  X, 
  Loader2, 
  ArrowUp, 
  ArrowDown, 
  Image as ImageIcon,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DangerConfirmModal } from "@/components/admin/danger-confirm-modal";

export type AdminProject = {
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

// Helper to parse 1-4 photos from string
function parsePhotos(imageField: string): [string, string, string, string] {
  if (!imageField) return ["", "", "", ""];
  let arr: string[] = [];
  if (imageField.startsWith("[")) {
    try {
      const parsed = JSON.parse(imageField);
      if (Array.isArray(parsed)) arr = parsed;
    } catch {}
  }
  if (arr.length === 0 && imageField.includes(",")) {
    arr = imageField.split(",").map((s) => s.trim()).filter(Boolean);
  } else if (arr.length === 0) {
    arr = [imageField.trim()];
  }
  return [arr[0] || "", arr[1] || "", arr[2] || "", arr[3] || ""];
}

export function ProjectsManager({ initialProjects }: { initialProjects: AdminProject[] }) {
  // Always keep sorted by rank (orderIndex)
  const [projects, setProjects] = useState<AdminProject[]>(
    [...initialProjects].sort((a, b) => a.orderIndex - b.orderIndex)
  );
  const [editingProject, setEditingProject] = useState<Partial<AdminProject> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1-4 Photos state
  const [photo1, setPhoto1] = useState("");
  const [photo2, setPhoto2] = useState("");
  const [photo3, setPhoto3] = useState("");
  const [photo4, setPhoto4] = useState("");

  // Danger delete modal state
  const [projectToDelete, setProjectToDelete] = useState<AdminProject | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleOpenNew = () => {
    setIsNew(true);
    setPhoto1("/images/projects/foodhub.jpg");
    setPhoto2("");
    setPhoto3("");
    setPhoto4("");
    setEditingProject({
      name: "",
      slug: "",
      summary: "",
      highlights: [],
      stack: [],
      tone: "Platform",
      image: "/images/projects/foodhub.jpg",
      liveClientUrl: "",
      liveServerUrl: "",
      githubClientUrl: "",
      githubServerUrl: "",
      featured: false,
      orderIndex: projects.length + 1,
    });
    setError(null);
  };

  const handleOpenEdit = (project: AdminProject) => {
    setIsNew(false);
    const [p1, p2, p3, p4] = parsePhotos(project.image);
    setPhoto1(p1);
    setPhoto2(p2);
    setPhoto3(p3);
    setPhoto4(p4);
    setEditingProject(project);
    setError(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.name || !editingProject.summary) {
      setError("Project name and summary are required.");
      return;
    }

    const validPhotos = [photo1, photo2, photo3, photo4]
      .map((p) => p.trim())
      .filter(Boolean);

    if (validPhotos.length === 0) {
      setError("At least 1 photo is required (Photo 1).");
      return;
    }

    setIsLoading(true);
    setError(null);

    const payload = {
      ...editingProject,
      image: validPhotos.join(", "),
      orderIndex: Number(editingProject.orderIndex) || 1,
    };

    try {
      const res = await fetch("/api/admin/projects", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to save project");

      let updatedList: AdminProject[];
      if (isNew) {
        updatedList = [...projects, data.project];
      } else {
        updatedList = projects.map((p) => (p.id === data.project.id ? data.project : p));
      }
      updatedList.sort((a, b) => a.orderIndex - b.orderIndex);
      setProjects(updatedList);
      setEditingProject(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error saving project";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Quick Rank Swap (Move Up / Move Down)
  const handleQuickRankChange = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const currentProject = projects[index];
    const targetProject = projects[targetIndex];

    const currentRank = currentProject.orderIndex;
    const targetRank = targetProject.orderIndex;

    const newTargetRank = currentRank === targetRank ? (direction === "up" ? currentRank - 1 : currentRank + 1) : currentRank;
    const newCurrentRank = targetRank;

    // Optimistic update
    const updated = [...projects];
    updated[index] = { ...currentProject, orderIndex: newCurrentRank };
    updated[targetIndex] = { ...targetProject, orderIndex: newTargetRank };
    updated.sort((a, b) => a.orderIndex - b.orderIndex);
    setProjects(updated);

    try {
      await Promise.all([
        fetch("/api/admin/projects", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: currentProject.id, orderIndex: newCurrentRank }),
        }),
        fetch("/api/admin/projects", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: targetProject.id, orderIndex: newTargetRank }),
        }),
      ]);
    } catch (err) {
      console.error("Failed to persist rank reorder:", err);
    }
  };

  const confirmDeleteProject = async () => {
    if (!projectToDelete) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/admin/projects?id=${projectToDelete.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to delete");
      setProjects(projects.filter((p) => p.id !== projectToDelete.id));
      setProjectToDelete(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error deleting";
      alert(message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-xl font-bold text-white">Commercial Projects Showcase</h2>
          <p className="text-xs text-slate-400">
            Total Projects: <span className="font-semibold text-white">{projects.length}</span> (Sorted by Priority Rank: 1 = Top)
          </p>
        </div>
        <Button onClick={handleOpenNew} className="gap-2 shrink-0">
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </div>

      {/* Responsive & Scrollable Edit / Add Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-slate-950 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="font-display text-lg font-bold text-white">
                {isNew ? "Add New Project" : `Edit Project: ${editingProject.name}`}
              </h2>
              <button
                onClick={() => setEditingProject(null)}
                className="rounded-xl border border-white/10 p-1.5 text-slate-400 hover:text-white"
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
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Project Title *</label>
                <input
                  type="text"
                  value={editingProject.name || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  placeholder="e.g. FoodHub"
                  required
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Display Rank / Priority Order *
                </label>
                <div className="relative mt-1.5">
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={editingProject.orderIndex || 1}
                    onChange={(e) => setEditingProject({ ...editingProject, orderIndex: Number(e.target.value) || 1 })}
                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm font-mono text-cyan-300 focus:border-cyan-400 focus:outline-none"
                    required
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-400">
                    1 = Appears First
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Tone / Badge</label>
                <input
                  type="text"
                  value={editingProject.tone || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, tone: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  placeholder="e.g. Platform, E-Commerce, Management"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Live Web App URL</label>
                <input
                  type="text"
                  value={editingProject.liveClientUrl || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, liveClientUrl: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  placeholder="https://..."
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Project Summary *</label>
                <textarea
                  value={editingProject.summary || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  rows={2}
                  placeholder="Brief description of the application and problems solved"
                  required
                />
              </div>

              {/* 1 to 4 Photo Management Section */}
              <div className="sm:col-span-2 rounded-2xl border border-cyan-400/20 bg-slate-900/40 p-4 sm:p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-cyan-400" />
                  <h4 className="font-display text-sm font-bold text-white">
                    Project Gallery Photos (Minimum 1, Maximum 4)
                  </h4>
                </div>
                <p className="text-[11px] text-slate-400">
                  Add between 1 to 4 images. Visitors can flip through them on the project card. Photo 1 serves as the primary cover photo.
                </p>

                <div className="grid gap-3 sm:grid-cols-2 pt-2">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold flex items-center justify-between">
                      <span>Photo 1 (Primary Cover) *</span>
                      {photo1 && <span className="text-[10px] text-cyan-400">Previewed</span>}
                    </label>
                    <input
                      type="text"
                      value={photo1}
                      onChange={(e) => setPhoto1(e.target.value)}
                      placeholder="/images/projects/foodhub.jpg or https://..."
                      className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      Photo 2 (Gallery View 2 - Optional)
                    </label>
                    <input
                      type="text"
                      value={photo2}
                      onChange={(e) => setPhoto2(e.target.value)}
                      placeholder="/images/projects/view-2.jpg or https://..."
                      className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      Photo 3 (Gallery View 3 - Optional)
                    </label>
                    <input
                      type="text"
                      value={photo3}
                      onChange={(e) => setPhoto3(e.target.value)}
                      placeholder="/images/projects/view-3.jpg or https://..."
                      className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      Photo 4 (Gallery View 4 - Optional)
                    </label>
                    <input
                      type="text"
                      value={photo4}
                      onChange={(e) => setPhoto4(e.target.value)}
                      placeholder="/images/projects/view-4.jpg or https://..."
                      className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Live Mini Preview Strip */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                  {[photo1, photo2, photo3, photo4].filter(Boolean).map((src, i) => (
                    <div key={i} className="relative h-12 w-20 rounded-lg overflow-hidden border border-white/15 bg-slate-950">
                      <Image
                        src={src}
                        alt={`Photo ${i + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <span className="absolute bottom-0.5 right-1 rounded bg-black/70 px-1 text-[9px] text-cyan-300 font-mono">
                        #{i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">GitHub Client URL</label>
                <input
                  type="text"
                  value={editingProject.githubClientUrl || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, githubClientUrl: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  placeholder="https://github.com/..."
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">GitHub Server URL (Optional)</label>
                <input
                  type="text"
                  value={editingProject.githubServerUrl || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, githubServerUrl: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  placeholder="https://github.com/..."
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  value={editingProject.stack?.join(", ") || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, stack: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  placeholder="Next.js, TypeScript, Tailwind CSS, PostgreSQL, Prisma"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Highlights (one per line)</label>
                <textarea
                  value={editingProject.highlights?.join("\n") || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, highlights: e.target.value.split("\n").filter(Boolean) })}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  rows={3}
                  placeholder="Built with Next.js App Router&#10;Integrated Stripe payment&#10;Role-based dashboard"
                />
              </div>

              <div className="sm:col-span-2 flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <Button type="button" variant="secondary" onClick={() => setEditingProject(null)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="gap-2">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save Project
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Projects List Grid (with Rank Badges and Quick Reorder) */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => {
          const photos = parsePhotos(project.image).filter(Boolean);
          const coverPhoto = photos[0] || "/images/projects/foodhub.jpg";

          return (
            <Card key={project.id} className="flex flex-col overflow-hidden rounded-3xl border border-white/8 bg-slate-950/60 p-5 hover:border-white/15 transition">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
                <Image
                  src={coverPhoto}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                
                {/* Tone Badge */}
                <div className="absolute right-3 top-3">
                  <span className="rounded-full border border-white/10 bg-black/70 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-300 backdrop-blur-md">
                    {project.tone}
                  </span>
                </div>

                {/* Priority Rank Badge */}
                <div className="absolute left-3 top-3">
                  <span className="rounded-full border border-cyan-400/30 bg-cyan-950/80 px-2.5 py-0.5 text-[10px] font-mono font-bold text-cyan-300 backdrop-blur-md shadow-lg">
                    Rank #{project.orderIndex}
                  </span>
                </div>

                {/* Photo Count Pill */}
                {photos.length > 1 && (
                  <div className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-0.5 text-[9px] font-semibold text-white backdrop-blur-md">
                    {photos.length} Photos
                  </div>
                )}
              </div>

              <div className="mt-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-white">{project.name}</h3>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleQuickRankChange(index, "up")}
                      className="rounded p-1 text-slate-400 hover:text-cyan-300 hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none"
                      title="Move Project Up (Higher Priority)"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={index === projects.length - 1}
                      onClick={() => handleQuickRankChange(index, "down")}
                      className="rounded p-1 text-slate-400 hover:text-cyan-300 hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none"
                      title="Move Project Down (Lower Priority)"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-300 line-clamp-2">{project.summary}</p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-white/5 bg-white/5 px-2 py-0.5 text-[10px] text-slate-300"
                    >
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
                    onClick={() => handleOpenEdit(project)}
                    className="h-8 w-8 rounded-lg"
                    title="Edit Project"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => setProjectToDelete(project)}
                    className="h-8 w-8 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    title="Delete Project"
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
                    Live Demo <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Danger Confirm Delete Modal */}
      <DangerConfirmModal
        isOpen={!!projectToDelete}
        title="Delete Project"
        message={`Are you sure you want to permanently delete "${projectToDelete?.name}"? This action cannot be undone and will remove it from the public portfolio.`}
        confirmText="Yes, Delete Project"
        isLoading={deleteLoading}
        onConfirm={confirmDeleteProject}
        onCancel={() => setProjectToDelete(null)}
      />
    </div>
  );
}
