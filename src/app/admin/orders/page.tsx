import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayoutShell from "@/components/admin-shell";
import { OrdersManager } from "@/components/admin/orders-manager";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  await requireAdminSession();
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminLayoutShell>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-white">Client Service Orders & Quotes</h1>
        <p className="mt-1 text-sm text-slate-400">
          Review incoming client inquiries, update project statuses, manage quotes, and provide delivery notes.
        </p>
      </div>

      <OrdersManager initialOrders={orders} />
    </AdminLayoutShell>
  );
}

