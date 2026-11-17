"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Save, X, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DangerConfirmModal } from "@/components/admin/danger-confirm-modal";

export type AdminSkillGroup = {
  id: string;
  title: string;
  items: string[];
  orderIndex: number;
};

export function SkillsManager({ 
  initialGroups,
  initialSkillGroups,
}: { 
  initialGroups?: AdminSkillGroup[];
  initialSkillGroups?: AdminSkillGroup[];
}) {
  const [skillGroups, setSkillGroups] = useState<AdminSkillGroup[]>(initialGroups || initialSkillGroups || []);
  const [editingGroup, setEditingGroup] = useState<Partial<AdminSkillGroup> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Danger delete modal state
  const [groupToDelete, setGroupToDelete] = useState<AdminSkillGroup | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleOpenNew = () => {
    setIsNew(true);
    setEditingGroup({
      title: "",
      items: [],
      orderIndex: skillGroups.length + 1,
    });
    setError(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGroup?.title) {
      setError("Group title is required.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/skills", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingGroup),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to save skill group");

      if (isNew) {
        setSkillGroups([...skillGroups, data.group]);
      } else {
        setSkillGroups(skillGroups.map((g) => (g.id === data.group.id ? data.group : g)));
      }
      setEditingGroup(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error saving skill group";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDeleteGroup = async () => {
    if (!groupToDelete) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/admin/skills?id=${groupToDelete.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to delete");
      setSkillGroups(skillGroups.filter((g) => g.id !== groupToDelete.id));
      setGroupToDelete(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error deleting";
      alert(message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-slate-400">
          Core Competency Categories: <span className="font-semibold text-white">{skillGroups.length}</span>
        </p>
        <Button onClick={handleOpenNew} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Skill Group
        </Button>
      </div>

      {/* Responsive & Scrollable Edit / Add Modal */}
      {editingGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-slate-950 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                  <Sparkles className="h-4 w-4" />
                </div>
                <h2 className="font-display text-lg font-semibold text-white">
                  {isNew ? "Add Skill Group" : `Edit Group: ${editingGroup.title}`}
                </h2>
              </div>
              <button
                onClick={() => setEditingGroup(null)}
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

            <form onSubmit={handleSave} className="mt-6 grid gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Group Title</label>
                <input
                  type="text"
                  value={editingGroup.title || ""}
                  onChange={(e) => setEditingGroup({ ...editingGroup, title: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  placeholder="e.g. Frontend, Motion, DevOps, Database"
                  required
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Skills / Items (comma separated)</label>
                <input
                  type="text"
                  value={editingGroup.items?.join(", ") || ""}
                  onChange={(e) => setEditingGroup({ ...editingGroup, items: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  placeholder="Next.js 15, React, TypeScript, Tailwind CSS, Shadcn UI"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <Button type="button" variant="secondary" onClick={() => setEditingGroup(null)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="gap-2">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save Skill Group
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Skills Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group) => (
          <Card key={group.id} className="flex flex-col justify-between rounded-3xl border-white/8 bg-slate-950/60 p-6 hover:border-white/15 transition">
            <div>
              <h3 className="font-display text-lg font-semibold text-white">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2 border-t border-white/8 pt-4">
              <Button
                size="icon"
                variant="secondary"
                onClick={() => {
                  setIsNew(false);
                  setEditingGroup(group);
                }}
                className="h-8 w-8 rounded-lg"
                title="Edit Group"
              >
                <Edit2 className="h-3.5 w-3.5" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                onClick={() => setGroupToDelete(group)}
                className="h-8 w-8 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10"
                title="Delete Group"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Danger Confirm Delete Modal */}
      <DangerConfirmModal
        isOpen={!!groupToDelete}
        title="Delete Skill Group"
        message={`Are you sure you want to permanently delete the "${groupToDelete?.title}" category? This will remove all its skill badges from the public competencies section.`}
        confirmText="Yes, Delete Category"
        isLoading={deleteLoading}
        onConfirm={confirmDeleteGroup}
        onCancel={() => setGroupToDelete(null)}
      />
    </div>
  );
}
