"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Loader2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type SkillGroup = {
  id: string;
  title: string;
  items: string[];
  orderIndex: number;
};

export function SkillsManager({ initialSkillGroups }: { initialSkillGroups: SkillGroup[] }) {
  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>(initialSkillGroups);
  const [editingGroup, setEditingGroup] = useState<Partial<SkillGroup> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isNew = !editingGroup?.id;

  const handleOpenNew = () => {
    setEditingGroup({
      title: "",
      items: ["Technology 1", "Technology 2"],
      orderIndex: skillGroups.length,
    });
    setError(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGroup?.title || !editingGroup.items || editingGroup.items.length === 0) {
      setError("Title and at least one skill item are required.");
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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill group?")) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/skills?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to delete");
      setSkillGroups(skillGroups.filter((g) => g.id !== id));
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
          Add Skill Group
        </Button>
      </div>

      {editingGroup && (
        <Card className="mb-8 rounded-3xl border-cyan-400/30 bg-slate-950/80 p-6 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="font-display text-lg font-semibold text-white">
              {isNew ? "Add Skill Group" : `Edit Group: ${editingGroup.title}`}
            </h2>
            <button
              onClick={() => setEditingGroup(null)}
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

          <form onSubmit={handleSave} className="mt-6 grid gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400">Group Title</label>
              <input
                type="text"
                value={editingGroup.title || ""}
                onChange={(e) => setEditingGroup({ ...editingGroup, title: e.target.value })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                placeholder="e.g. Frontend, DevOps, Database"
                required
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400">Skills / Items (comma separated)</label>
              <input
                type="text"
                value={editingGroup.items?.join(", ") || ""}
                onChange={(e) => setEditingGroup({ ...editingGroup, items: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                placeholder="Next.js 15, React, TypeScript, Tailwind CSS"
                required
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" disabled={isLoading} className="gap-2">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Skill Group
              </Button>
              <Button type="button" variant="secondary" onClick={() => setEditingGroup(null)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Skills Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <Card key={group.id} className="flex flex-col justify-between rounded-3xl border-white/8 bg-slate-950/60 p-6">
            <div>
              <h3 className="font-display text-lg font-semibold text-white">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200"
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
                onClick={() => setEditingGroup(group)}
                className="h-8 w-8 rounded-lg"
              >
                <Edit2 className="h-3.5 w-3.5" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                onClick={() => handleDelete(group.id)}
                className="h-8 w-8 rounded-lg text-red-400 hover:text-red-300"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

