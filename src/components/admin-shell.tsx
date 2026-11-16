import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { requireAdminSession } from "@/lib/auth";
import { AdminSignoutButton } from "@/components/admin-signout-button";
import { AdminNav } from "@/components/admin-nav";

export default async function AdminLayoutShell({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireAdminSession();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.12),transparent_32%),linear-gradient(180deg,#050b19_0%,#020617_100%)] text-slate-100">
      <header className="border-b border-white/8 bg-slate-950/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/10 text-cyan-300">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <span className="font-display font-semibold text-white">Dhananjoy Admin</span>
              <span className="ml-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-300">
                Connected
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 text-xs text-slate-400 transition hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              View Public Site
            </Link>
            <AdminSignoutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AdminNav />
        <div className="mt-6">{children}</div>
      </main>
    </div>
  );
}

