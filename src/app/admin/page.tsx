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
  Clock,
  Sparkles,
  GraduationCap,
  KeyRound,
  Settings,
  PlusCircle,
  ExternalLink,
  ShieldCheck,
  UserCheck
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminLayoutShell from "@/components/admin-shell";
import { AdminSignoutButton } from "@/components/admin-signout-button";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await requireAdminSession();

  const [
    projectCount,
    serviceCount,
    orderCount,
    blogCount,
    skillCount,
    experienceCount,
    educationCount,
    pendingOrderCount,
    recentOrders,
    adminCount,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.service.count(),
    prisma.order.count(),
    prisma.blogPost.count(),
    prisma.skillGroup.count(),
    prisma.experience.count(),
    prisma.education.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count(),
  ]);

  const stats = [
    { 
      label: "Commercial Projects", 
      value: projectCount, 
      icon: FolderGit2, 
      href: "/admin/projects",
      subtext: "Showcased on portfolio",
      color: "text-cyan-400 group-hover:bg-cyan-400/20"
    },
    { 
      label: "Active Services", 
      value: serviceCount, 
      icon: Layers, 
      href: "/admin/services",
      subtext: "Commercial packages",
      color: "text-blue-400 group-hover:bg-blue-400/20"
    },
    { 
      label: "Client Inquiries", 
      value: orderCount, 
      badge: pendingOrderCount > 0 ? `${pendingOrderCount} Pending` : undefined,
      icon: ShoppingBag, 
      href: "/admin/orders",
      subtext: "Direct bookings & quotes",
      color: "text-amber-400 group-hover:bg-amber-400/20"
    },
    { 
      label: "Blog Articles", 
      value: blogCount, 
      icon: BookOpen, 
      href: "/admin/blog",
      subtext: "Engineering notes & CMS",
      color: "text-purple-400 group-hover:bg-purple-400/20"
    },
    { 
      label: "Core Competencies", 
      value: skillCount, 
      icon: Sparkles, 
      href: "/admin/skills",
      subtext: "Skill groups & badges",
      color: "text-emerald-400 group-hover:bg-emerald-400/20"
    },
    { 
      label: "Career Timeline", 
      value: `${experienceCount + educationCount}`, 
      icon: GraduationCap, 
      href: "/admin/timeline",
      subtext: `${experienceCount} Roles • ${educationCount} Degrees`,
      color: "text-sky-400 group-hover:bg-sky-400/20"
    },
  ];

  const quickActions = [
    { label: "New Project", href: "/admin/projects", icon: FolderGit2, desc: "Add demo, tech stack & repo" },
    { label: "New Service", href: "/admin/services", icon: Layers, desc: "Create or edit pricing package" },
    { label: "Write Blog", href: "/admin/blog", icon: BookOpen, desc: "Publish engineering article" },
    { label: "Update Skills", href: "/admin/skills", icon: Sparkles, desc: "Add tools & framework badges" },
    { label: "Add Milestone", href: "/admin/timeline", icon: GraduationCap, desc: "Work or academic record" },
    { label: "Change Password", href: "/admin/security", icon: KeyRound, desc: "Security & admin management" },
    { label: "Profile Settings", href: "/admin/settings", icon: Settings, desc: "Bio, social links & resume" },
  ];

  return (
    <AdminLayoutShell>
      {/* Welcome Banner */}
      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-950/70 p-6 sm:p-8 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Live CMS Control Center
          </div>
          <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Welcome back, {session.name}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Signed in as <span className="font-mono text-cyan-300">{session.email}</span> • Database: <span className="text-emerald-300 font-medium">Neon PostgreSQL Synced</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {pendingOrderCount > 0 && (
            <Link
              href="/admin/orders"
              className="inline-flex items-center gap-2 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-amber-300 shadow-lg shadow-amber-950/30 transition hover:bg-amber-400/20"
            >
              <Clock className="h-4 w-4" />
              {pendingOrderCount} Pending Inquiries
            </Link>
          )}

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
          >
            <ExternalLink className="h-3.5 w-3.5 text-cyan-400" />
            Preview Portfolio
          </Link>

          <AdminSignoutButton />
        </div>
      </div>

      {/* Quick Launchpad Action Grid */}
      <div className="mt-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Quick Launchpad
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {quickActions.map((qa) => {
            const Icon = qa.icon;
            return (
              <Link
                key={qa.label}
                href={qa.href}
                className="group flex flex-col justify-between rounded-2xl border border-white/8 bg-slate-950/60 p-4 transition hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-slate-900/80"
              >
                <div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-slate-300 transition group-hover:bg-cyan-400/20 group-hover:text-cyan-300">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="mt-3 text-xs font-semibold text-white group-hover:text-cyan-300 transition">
                    {qa.label}
                  </h3>
                  <p className="mt-1 text-[11px] leading-4 text-slate-400">
                    {qa.desc}
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[10px] font-semibold uppercase text-slate-500 group-hover:text-cyan-300">
                  Open <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Interactive Metric Cards Grid */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Platform Insights & Metrics
          </h2>
          <span className="text-xs text-slate-500">Click any card to manage</span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link key={stat.label} href={stat.href}>
                <Card className="group relative overflow-hidden rounded-3xl border-white/10 bg-slate-950/60 p-6 backdrop-blur-sm transition duration-300 hover:border-cyan-400/40 hover:bg-slate-900/60 hover:shadow-[0_10px_30px_rgba(34,211,238,0.06)]">
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">{stat.label}</p>
                    <div className={`rounded-xl border border-white/8 bg-white/5 p-2 transition ${stat.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="mt-4 flex items-baseline justify-between">
                    <p className="font-display text-3xl font-bold text-white tracking-tight">{stat.value}</p>
                    {stat.badge && (
                      <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-300">
                        {stat.badge}
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-white/6 pt-3 text-xs">
                    <span className="text-slate-400">{stat.subtext}</span>
                    <span className="inline-flex items-center gap-1 font-medium text-cyan-300 opacity-0 transition duration-200 group-hover:opacity-100">
                      Manage <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Client Inquiries Section */}
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-white">Recent Client Inquiries</h2>
            <p className="text-xs text-slate-400">Latest service bookings submitted via public pricing section</p>
          </div>
          <Link 
            href="/admin/orders" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300 hover:underline"
          >
            All Orders ({orderCount})
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-4 overflow-hidden rounded-3xl border border-white/8 bg-slate-950/60 shadow-xl">
          {recentOrders.length > 0 ? (
            <div className="divide-y divide-white/8">
              {recentOrders.map((order) => (
                <Link
                  key={order.id}
                  href="/admin/orders"
                  className="flex flex-col gap-4 p-5 transition hover:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between group"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-semibold text-cyan-300">{order.trackingCode}</span>
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
                    <p className="mt-2 text-sm font-semibold text-white group-hover:text-cyan-300 transition">
                      {order.clientName} <span className="font-normal text-slate-400">— {order.serviceTitle}</span>
                    </p>
                    <p className="text-xs text-slate-400">{order.clientEmail} • {order.clientPhone}</p>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                    <p className="font-display font-bold text-cyan-300">{order.servicePrice}</p>
                    <p className="text-[11px] text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-sm text-slate-400">
              No service orders yet. Submissions from the public pricing section will show up here.
            </div>
          )}
        </div>
      </div>

      {/* System Security & Sync Status */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Card className="rounded-3xl border-emerald-400/20 bg-emerald-950/10 p-5 backdrop-blur-sm">
          <div className="flex items-start gap-3.5">
            <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-2.5 text-emerald-300">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-white">
                PostgreSQL & Prisma Engine Synced
              </h3>
              <p className="mt-1 text-xs leading-5 text-slate-300">
                All changes to Projects, Services, Timeline, Skills, and Blog are reflected in real-time on your live site.
              </p>
            </div>
          </div>
        </Card>

        <Card className="rounded-3xl border-cyan-400/20 bg-cyan-950/10 p-5 backdrop-blur-sm">
          <div className="flex items-start gap-3.5">
            <div className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 p-2.5 text-cyan-300">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-white">
                Multi-Factor Security Active ({adminCount} Admin{adminCount > 1 ? "s" : ""})
              </h3>
              <p className="mt-1 text-xs leading-5 text-slate-300">
                JWT HTTP-only cookie sessions, bcrypt salted hashing, and forgot password verification code active.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayoutShell>
  );
}
