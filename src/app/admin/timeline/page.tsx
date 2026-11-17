import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayoutShell from "@/components/admin-shell";
import { TimelineManager } from "@/components/admin/timeline-manager";

export const dynamic = "force-dynamic";

export default async function AdminTimelinePage() {
  await requireAdminSession();

  const [experiences, educations] = await Promise.all([
    prisma.experience.findMany({
      orderBy: { orderIndex: "asc" },
    }),
    prisma.education.findMany({
      orderBy: { orderIndex: "asc" },
    }),
  ]);

  return (
    <AdminLayoutShell>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Timeline & Education Management
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Manage your career milestones, work experiences, academic degrees, and mathematical research highlights.
        </p>
      </div>

      <TimelineManager
        initialExperiences={experiences}
        initialEducations={educations}
      />
    </AdminLayoutShell>
  );
}

