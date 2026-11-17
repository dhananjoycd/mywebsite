import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayoutShell from "@/components/admin-shell";
import { SecurityManager } from "@/components/admin/security-manager";

export const dynamic = "force-dynamic";

export default async function AdminSecurityPage() {
  const session = await requireAdminSession();

  const admins = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminLayoutShell>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Security & Access Control
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Manage your login credentials, password policies, and authorized administrators.
        </p>
      </div>

      <SecurityManager initialAdmins={admins} currentUserId={session.userId} />
    </AdminLayoutShell>
  );
}

