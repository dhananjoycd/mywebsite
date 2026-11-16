import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayoutShell from "@/components/admin-shell";
import { ProjectsManager } from "@/components/admin/projects-manager";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  await requireAdminSession();
  const projects = await prisma.project.findMany({
    orderBy: { orderIndex: "asc" },
  });

  return (
    <AdminLayoutShell>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-white">Project Management</h1>
        <p className="mt-1 text-sm text-slate-400">
          Create, edit, and organize portfolio showcase projects. Updates appear instantly on the homepage.
        </p>
      </div>

      <ProjectsManager initialProjects={projects} />
    </AdminLayoutShell>
  );
}

