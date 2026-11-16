"use client";

import { useState } from "react";
import { Loader2, Save, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function SettingsManager({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [settings, setSettings] = useState(initialSettings);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to update settings");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error saving";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="rounded-3xl border-white/8 bg-slate-950/60 p-6 sm:p-8">
      {success && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-xs font-medium text-emerald-300">
          <CheckCircle2 className="h-5 w-5" />
          Settings saved successfully! Homepage and metadata have been refreshed.
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSave} className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="text-xs uppercase tracking-wider text-slate-400">Full Name</label>
          <input
            type="text"
            value={settings.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-slate-400">Availability Status</label>
          <input
            type="text"
            value={settings.availabilityLabel || ""}
            onChange={(e) => handleChange("availabilityLabel", e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs uppercase tracking-wider text-slate-400">Hero Tagline / Heading</label>
          <input
            type="text"
            value={settings.heroLabel || ""}
            onChange={(e) => handleChange("heroLabel", e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs uppercase tracking-wider text-slate-400">Bio / About paragraph</label>
          <textarea
            value={settings.bio || ""}
            onChange={(e) => handleChange("bio", e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
            rows={4}
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-slate-400">Resume Download URL</label>
          <input
            type="text"
            value={settings.resumeUrl || ""}
            onChange={(e) => handleChange("resumeUrl", e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-slate-400">Contact Email</label>
          <input
            type="email"
            value={settings.contactEmail || ""}
            onChange={(e) => handleChange("contactEmail", e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-slate-400">LinkedIn URL</label>
          <input
            type="text"
            value={settings.linkedinUrl || ""}
            onChange={(e) => handleChange("linkedinUrl", e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-slate-400">GitHub Profile URL</label>
          <input
            type="text"
            value={settings.githubUrl || ""}
            onChange={(e) => handleChange("githubUrl", e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2 pt-4">
          <Button type="submit" disabled={isLoading} className="gap-2">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Site Settings
          </Button>
        </div>
      </form>
    </Card>
  );
}

