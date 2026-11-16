import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayoutShell from "@/components/admin-shell";
import { SkillsManager } from "@/components/admin/skills-manager";

export const dynamic = "force-dynamic";

export default async function AdminSkillsPage() {
  await requireAdminSession();
  const skillGroups = await prisma.skillGroup.findMany({
    orderBy: { orderIndex: "asc" },
  });

  return (
    <AdminLayoutShell>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-white">Skills & Technologies</h1>
        <p className="mt-1 text-sm text-slate-400">
          Organize your tech stack into groups (Frontend, Backend, Tools, etc.) with drag-and-drop clarity.
        </p>
      </div>

      <SkillsManager initialSkillGroups={skillGroups} />
    </AdminLayoutShell>
  );
}

