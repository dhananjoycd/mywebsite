import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayoutShell from "@/components/admin-shell";
import { SettingsManager } from "@/components/admin/settings-manager";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  await requireAdminSession();
  const settings = await prisma.siteSetting.findMany();
  const map: Record<string, string> = {};
  settings.forEach((s) => {
    map[s.key] = s.value;
  });

  return (
    <AdminLayoutShell>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-white">Profile & Site Settings</h1>
        <p className="mt-1 text-sm text-slate-400">
          Update your public profile, hero text, resume download URL, footer content, social media links, and admin session.
        </p>
      </div>

      <SettingsManager initialSettings={map} />
    </AdminLayoutShell>
  );
}

