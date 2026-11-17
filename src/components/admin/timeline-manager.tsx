"use client";

import { useState } from "react";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Loader2, 
  BriefcaseBusiness, 
  GraduationCap, 
  Calendar, 
  Sparkles,
  Building2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Experience = {
  id: string;
  title: string;
  period: string;
  text: string;
  highlights: string[];
  featured: boolean;
};

type Education = {
  id: string;
  title: string;
  institution: string;
  period: string;
  summary: string;
  highlights: string[];
  meta: string | null;
};

export function TimelineManager({
  initialExperiences,
  initialEducations,
}: {
  initialExperiences: Experience[];
  initialEducations: Education[];
}) {
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [educations, setEducations] = useState<Education[]>(initialEducations);

  const [editingExp, setEditingExp] = useState<Partial<Experience> | null>(null);
  const [editingEdu, setEditingEdu] = useState<Partial<Education> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Experience handlers
  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp?.title || !editingExp?.text) return;
    setIsLoading(true);

    const isNew = !editingExp.id;
    try {
      const res = await fetch("/api/admin/timeline", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "experience", id: editingExp.id, data: editingExp }),
      });
      const data = await res.json();
      if (data.ok) {
        if (isNew) {
          setExperiences([...experiences, data.item]);
        } else {
          setExperiences(experiences.map((x) => (x.id === data.item.id ? data.item : x)));
        }
        setEditingExp(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteExp = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    try {
      await fetch(`/api/admin/timeline?type=experience&id=${id}`, { method: "DELETE" });
      setExperiences(experiences.filter((x) => x.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Education handlers
  const handleSaveEdu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEdu?.title || !editingEdu?.institution) return;
    setIsLoading(true);

    const isNew = !editingEdu.id;
    try {
      const res = await fetch("/api/admin/timeline", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "education", id: editingEdu.id, data: editingEdu }),
      });
      const data = await res.json();
      if (data.ok) {
        if (isNew) {
          setEducations([...educations, data.item]);
        } else {
          setEducations(educations.map((x) => (x.id === data.item.id ? data.item : x)));
        }
        setEditingEdu(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEdu = async (id: string) => {
    if (!confirm("Are you sure you want to delete this education?")) return;
    try {
      await fetch(`/api/admin/timeline?type=education&id=${id}`, { method: "DELETE" });
      setEducations(educations.filter((x) => x.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Switcher Tabs */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex gap-2">
          <button
            onClick={() => { setActiveTab("experience"); setEditingEdu(null); }}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
              activeTab === "experience"
                ? "bg-cyan-400 text-slate-950 font-bold"
                : "border border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            <BriefcaseBusiness className="h-4 w-4" /> Work Experience ({experiences.length})
          </button>
          <button
            onClick={() => { setActiveTab("education"); setEditingExp(null); }}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
              activeTab === "education"
                ? "bg-emerald-400 text-slate-950 font-bold"
                : "border border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            <GraduationCap className="h-4 w-4" /> Academic Journey ({educations.length})
          </button>
        </div>

        {activeTab === "experience" ? (
          <Button
            onClick={() => setEditingExp({
              title: "",
              period: "2024 - Present",
              text: "",
              highlights: ["Key achievement 1", "Key achievement 2"],
              featured: false,
            })}
            className="gap-2 text-xs"
          >
            <Plus className="h-4 w-4" /> Add Experience
          </Button>
        ) : (
          <Button
            onClick={() => setEditingEdu({
              title: "",
              institution: "",
              period: "2022 - Present",
              summary: "",
              highlights: ["Major focus area 1"],
              meta: "CGPA: 4.00",
            })}
            className="gap-2 text-xs bg-emerald-400 text-slate-950 hover:bg-emerald-300 font-bold"
          >
            <Plus className="h-4 w-4" /> Add Education
          </Button>
        )}
      </div>

      {/* Experience Form */}
      {editingExp && (
        <Card className="rounded-3xl border-cyan-400/30 bg-slate-950/90 p-6 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="font-display font-semibold text-white">
              {editingExp.id ? "Edit Work Experience" : "Add Work Experience"}
            </h3>
            <button onClick={() => setEditingExp(null)} className="text-slate-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSaveExp} className="mt-4 space-y-4 text-xs">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-slate-400 uppercase tracking-wider">Job / Role Title</label>
                <input
                  type="text"
                  value={editingExp.title || ""}
                  onChange={(e) => setEditingExp({ ...editingExp, title: e.target.value })}
                  placeholder="e.g. Full-Stack Web Developer"
                  required
                  className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-white text-xs"
                />
              </div>
              <div>
                <label className="text-slate-400 uppercase tracking-wider">Duration / Period</label>
                <input
                  type="text"
                  value={editingExp.period || ""}
                  onChange={(e) => setEditingExp({ ...editingExp, period: e.target.value })}
                  placeholder="e.g. 2023 - Present"
                  required
                  className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 uppercase tracking-wider">Description</label>
              <textarea
                value={editingExp.text || ""}
                onChange={(e) => setEditingExp({ ...editingExp, text: e.target.value })}
                rows={3}
                placeholder="Overview of your responsibilities"
                required
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-white text-xs"
              />
            </div>

            <div>
              <label className="text-slate-400 uppercase tracking-wider">Highlights (One per line)</label>
              <textarea
                value={editingExp.highlights?.join("\n") || ""}
                onChange={(e) => setEditingExp({ ...editingExp, highlights: e.target.value.split("\n").filter(Boolean) })}
                rows={3}
                placeholder="Bullet points of measurable impact"
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-white text-xs"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="expFeatured"
                checked={Boolean(editingExp.featured)}
                onChange={(e) => setEditingExp({ ...editingExp, featured: e.target.checked })}
                className="rounded border-white/20 bg-slate-900 text-cyan-400"
              />
              <label htmlFor="expFeatured" className="text-slate-300">Feature this role prominently</label>
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="submit" disabled={isLoading} className="gap-2 text-xs">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Experience
              </Button>
              <Button type="button" variant="secondary" onClick={() => setEditingExp(null)} className="text-xs">
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Education Form */}
      {editingEdu && (
        <Card className="rounded-3xl border-emerald-400/30 bg-slate-950/90 p-6 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="font-display font-semibold text-white">
              {editingEdu.id ? "Edit Academic Entry" : "Add Academic Entry"}
            </h3>
            <button onClick={() => setEditingEdu(null)} className="text-slate-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSaveEdu} className="mt-4 space-y-4 text-xs">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-slate-400 uppercase tracking-wider">Degree / Program Title</label>
                <input
                  type="text"
                  value={editingEdu.title || ""}
                  onChange={(e) => setEditingEdu({ ...editingEdu, title: e.target.value })}
                  placeholder="e.g. B.Sc. (Hons.) in Mathematics"
                  required
                  className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-white text-xs"
                />
              </div>
              <div>
                <label className="text-slate-400 uppercase tracking-wider">Institution Name</label>
                <input
                  type="text"
                  value={editingEdu.institution || ""}
                  onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                  placeholder="e.g. University of Rajshahi"
                  required
                  className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-white text-xs"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-slate-400 uppercase tracking-wider">Period</label>
                <input
                  type="text"
                  value={editingEdu.period || ""}
                  onChange={(e) => setEditingEdu({ ...editingEdu, period: e.target.value })}
                  placeholder="e.g. 2022 - Present"
                  required
                  className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-white text-xs"
                />
              </div>
              <div>
                <label className="text-slate-400 uppercase tracking-wider">Academic Note / CGPA</label>
                <input
                  type="text"
                  value={editingEdu.meta || ""}
                  onChange={(e) => setEditingEdu({ ...editingEdu, meta: e.target.value })}
                  placeholder="e.g. CGPA: 3.92 / 4.00"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 uppercase tracking-wider">Summary</label>
              <textarea
                value={editingEdu.summary || ""}
                onChange={(e) => setEditingEdu({ ...editingEdu, summary: e.target.value })}
                rows={2}
                placeholder="Overview of focus areas"
                required
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-white text-xs"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="submit" disabled={isLoading} className="gap-2 text-xs bg-emerald-400 text-slate-950 font-bold hover:bg-emerald-300">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Education
              </Button>
              <Button type="button" variant="secondary" onClick={() => setEditingEdu(null)} className="text-xs">
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* List Display */}
      {activeTab === "experience" ? (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <Card key={exp.id} className="rounded-2xl border-white/8 bg-slate-950/60 p-5 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-display font-semibold text-white">{exp.title}</h4>
                  {exp.featured && (
                    <span className="rounded-full bg-cyan-400/20 px-2 py-0.5 text-[10px] text-cyan-300 font-bold">Featured</span>
                  )}
                </div>
                <p className="mt-1 text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-cyan-400" /> {exp.period}
                </p>
                <p className="mt-2 text-xs text-slate-300">{exp.text}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button size="icon" variant="secondary" onClick={() => setEditingExp(exp)} className="h-8 w-8">
                  <Edit2 className="h-3.5 w-3.5" />
                </Button>
                <Button size="icon" variant="secondary" onClick={() => handleDeleteExp(exp.id)} className="h-8 w-8 text-rose-400">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {educations.map((edu) => (
            <Card key={edu.id} className="rounded-2xl border-white/8 bg-slate-950/60 p-5 flex items-start justify-between">
              <div>
                <h4 className="font-display font-semibold text-white">{edu.title}</h4>
                <p className="mt-1 text-xs text-emerald-300 flex items-center gap-1 font-medium">
                  <Building2 className="h-3.5 w-3.5" /> {edu.institution} • <span className="text-slate-400">{edu.period}</span>
                </p>
                <p className="mt-2 text-xs text-slate-300">{edu.summary}</p>
                {edu.meta && (
                  <span className="mt-2 inline-block rounded-lg bg-emerald-400/10 px-2.5 py-1 text-[11px] font-mono text-emerald-200">
                    {edu.meta}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button size="icon" variant="secondary" onClick={() => setEditingEdu(edu)} className="h-8 w-8">
                  <Edit2 className="h-3.5 w-3.5" />
                </Button>
                <Button size="icon" variant="secondary" onClick={() => handleDeleteEdu(edu.id)} className="h-8 w-8 text-rose-400">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

