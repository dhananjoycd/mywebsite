"use client";

import { useState } from "react";
import { 
  Loader2, 
  Save, 
  CheckCircle2, 
  Globe, 
  User, 
  Share2, 
  FileText, 
  ShieldAlert, 
  Sparkles,
  Mail,
  Clock,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AdminSignoutButton } from "@/components/admin-signout-button";

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
    <div className="space-y-8">
      {success && (
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-xs font-medium text-emerald-300 shadow-lg">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
          <span>All Site & Footer settings updated successfully! Live website and metadata refreshed.</span>
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Profile & Hero Configuration */}
        <Card className="rounded-3xl border-white/8 bg-slate-950/60 p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex items-center gap-2.5 pb-5 border-b border-white/8">
            <User className="h-5 w-5 text-cyan-400" />
            <div>
              <h2 className="font-display text-base font-bold text-white">Profile & Identity</h2>
              <p className="text-xs text-slate-400">Personal branding, hero headline, and about bio.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Full Name</label>
              <input
                type="text"
                value={settings.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                placeholder="e.g. Dhananjoy Chandra Das"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Availability Status</label>
              <input
                type="text"
                value={settings.availabilityLabel || ""}
                onChange={(e) => handleChange("availabilityLabel", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                placeholder="e.g. Open to internships, jobs, and freelance work"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Hero Tagline / Heading</label>
              <input
                type="text"
                value={settings.heroLabel || ""}
                onChange={(e) => handleChange("heroLabel", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                placeholder="e.g. Web Developer | Educator | Research Enthusiast"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Full Bio / About Paragraph</label>
              <textarea
                value={settings.bio || ""}
                onChange={(e) => handleChange("bio", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm leading-relaxed text-white focus:border-cyan-400 focus:outline-none"
                rows={4}
                placeholder="Detailed biography displayed on portfolio about section..."
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Resume Download URL</label>
              <input
                type="text"
                value={settings.resumeUrl || ""}
                onChange={(e) => handleChange("resumeUrl", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                placeholder="Google Drive direct download link or PDF URL"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Contact Email</label>
              <input
                type="email"
                value={settings.contactEmail || ""}
                onChange={(e) => handleChange("contactEmail", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                placeholder="dhananjoychandradas@gmail.com"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Response Time Label</label>
              <input
                type="text"
                value={settings.responseTime || "24/7"}
                onChange={(e) => handleChange("responseTime", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                placeholder="e.g. 24/7 or Within 24 hours"
              />
            </div>
          </div>
        </Card>

        {/* Footer & Social Media Customization Section */}
        <Card className="rounded-3xl border-white/8 bg-slate-950/60 p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex items-center gap-2.5 pb-5 border-b border-white/8">
            <Share2 className="h-5 w-5 text-cyan-400" />
            <div>
              <h2 className="font-display text-base font-bold text-white">Footer & Social Media Management</h2>
              <p className="text-xs text-slate-400">Configure public footer bio, copyright, and all social media channels.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Footer Bio / Tagline (Under Name)
              </label>
              <textarea
                value={settings.footerBio || ""}
                onChange={(e) => handleChange("footerBio", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                rows={2}
                placeholder="Full-Stack Web Developer & Educator. Building scalable platforms with Next.js, PostgreSQL, and modern motion."
              />
              <p className="mt-1 text-[11px] text-slate-500">Short summary shown on the left column of the footer.</p>
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Footer Copyright Text
              </label>
              <input
                type="text"
                value={settings.footerCopyright || ""}
                onChange={(e) => handleChange("footerCopyright", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                placeholder="Dhananjoy Chandra Das. All rights reserved."
              />
              <p className="mt-1 text-[11px] text-slate-500">Shown in the copyright bar at the bottom: © [Year] [Copyright Text]</p>
            </div>

            {/* Social Links */}
            <div>
              <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-400 font-semibold">
                <svg className="h-3.5 w-3.5 fill-current text-slate-300" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub Profile URL
              </label>
              <input
                type="url"
                value={settings.githubUrl || ""}
                onChange={(e) => handleChange("githubUrl", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                placeholder="https://github.com/dhananjoycd"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-400 font-semibold">
                <svg className="h-3.5 w-3.5 fill-current text-sky-400" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                value={settings.linkedinUrl || ""}
                onChange={(e) => handleChange("linkedinUrl", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                placeholder="https://linkedin.com/in/dhananjoycd"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-400 font-semibold">
                <svg className="h-3.5 w-3.5 fill-current text-blue-400" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
                Facebook Profile / Page URL
              </label>
              <input
                type="url"
                value={settings.facebookUrl || ""}
                onChange={(e) => handleChange("facebookUrl", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                placeholder="https://facebook.com/dhananjoycd"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-400 font-semibold">
                <svg className="h-3.5 w-3.5 fill-current text-rose-400" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
                YouTube Channel URL
              </label>
              <input
                type="url"
                value={settings.youtubeUrl || ""}
                onChange={(e) => handleChange("youtubeUrl", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                placeholder="https://youtube.com/@dhananjoycd"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-400 font-semibold">
                <svg className="h-3.5 w-3.5 fill-current text-slate-200" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Twitter / X Profile URL
              </label>
              <input
                type="url"
                value={settings.twitterUrl || ""}
                onChange={(e) => handleChange("twitterUrl", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                placeholder="https://x.com/dhananjoycd"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end border-t border-white/8 pt-6">
            <Button type="submit" disabled={isLoading} className="gap-2 px-6 py-2.5 font-semibold shadow-lg shadow-cyan-950/40">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save All Settings
            </Button>
          </div>
        </Card>
      </form>

      {/* Administrator Session & Sign Out at the VERY BOTTOM */}
      <Card className="rounded-3xl border border-rose-500/20 bg-rose-950/10 p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-500/10 text-rose-400">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-white">Administrator Session</h3>
              <p className="mt-1 max-w-lg text-xs leading-relaxed text-slate-400">
                You are currently signed in with elevated administrator privileges. To protect your dashboard and prevent unauthorized access, click the button to terminate your active session and return to the login screen.
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <AdminSignoutButton className="w-full sm:w-auto px-6 py-3 text-xs tracking-wider font-bold shadow-lg shadow-rose-950/50" />
          </div>
        </div>
      </Card>
    </div>
  );
}
