import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { 
  FolderGit2, 
  Layers, 
  ShoppingBag, 
  BookOpen, 
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Clock
} from "lucide-react";
import { Card } from "@/components/ui/card";
import AdminLayoutShell from "@/components/admin-shell";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await requireAdminSession();

  const [
    projectCount,
    serviceCount,
    orderCount,
    blogCount,
    pendingOrderCount,
    recentOrders,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.service.count(),
    prisma.order.count(),
    prisma.blogPost.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const stats = [
    { label: "Total Projects", value: projectCount, icon: FolderGit2, href: "/admin/projects" },
    { label: "Active Services", value: serviceCount, icon: Layers, href: "/admin/services" },
    { label: "Service Orders", value: orderCount, icon: ShoppingBag, href: "/admin/orders" },
    { label: "Blog Posts", value: blogCount, icon: BookOpen, href: "/admin/blog" },
  ];

  return (
    <AdminLayoutShell>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white">
            Welcome back, {session.name}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Signed in as <span className="text-cyan-300">{session.email}</span> (Neon PostgreSQL Connected)
          </p>
        </div>
        {pendingOrderCount > 0 && (
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-amber-300"
          >
            <Clock className="h-4 w-4" />
            {pendingOrderCount} Pending Inquiries
          </Link>
        )}
      </div>

      {/* Stats Grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href}>
              <Card className="group rounded-3xl border-white/10 bg-slate-950/60 p-6 backdrop-blur-sm transition hover:border-cyan-400/30">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-wider text-slate-400">{stat.label}</p>
                  <div className="rounded-xl border border-white/8 bg-white/5 p-2 text-cyan-300 transition group-hover:bg-cyan-400/20">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <p className="font-display text-3xl font-bold text-white">{stat.value}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-cyan-300 opacity-0 transition group-hover:opacity-100">
                    Manage <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Recent Orders Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-white">Recent Service Inquiries</h2>
          <Link href="/admin/orders" className="text-xs text-cyan-300 hover:underline">
            View All ({orderCount})
          </Link>
        </div>

        <div className="mt-4 overflow-hidden rounded-3xl border border-white/8 bg-slate-950/60">
          {recentOrders.length > 0 ? (
            <div className="divide-y divide-white/8">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-cyan-300">{order.trackingCode}</span>
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                        order.status === "PENDING"
                          ? "border border-amber-400/30 bg-amber-400/10 text-amber-300"
                          : order.status === "COMPLETED"
                          ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                          : "border border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-medium text-white">{order.clientName} — <span className="text-slate-400">{order.serviceTitle}</span></p>
                    <p className="text-xs text-slate-400">{order.clientEmail} • {order.clientPhone}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-semibold text-cyan-300">{order.servicePrice}</p>
                    <p className="text-[11px] text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-sm text-slate-400">
              No service orders yet. Submissions from the public pricing section will show up here.
            </div>
          )}
        </div>
      </div>

      {/* Database Health Box */}
      <Card className="mt-8 rounded-3xl border-cyan-400/20 bg-cyan-950/20 p-6 backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-3 text-emerald-300">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-white">
              CMS Engine Active & Synced
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-300">
              Your public portfolio is actively streaming from Neon PostgreSQL. Any changes you make in Projects, Services, Skills, or Blog are updated in real-time.
            </p>
          </div>
        </div>
      </Card>
    </AdminLayoutShell>
  );
}
