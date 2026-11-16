import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayoutShell from "@/components/admin-shell";
import { ServicesManager } from "@/components/admin/services-manager";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  await requireAdminSession();
  const services = await prisma.service.findMany({
    orderBy: { orderIndex: "asc" },
  });

  return (
    <AdminLayoutShell>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-white">Services & Pricing Management</h1>
        <p className="mt-1 text-sm text-slate-400">
          Set up services, adjust prices, and manage deliverables available for client booking.
        </p>
      </div>

      <ServicesManager initialServices={services} />
    </AdminLayoutShell>
  );
}

