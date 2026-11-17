"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FolderGit2, 
  Layers, 
  ShoppingBag, 
  BookOpen, 
  Settings, 
  LayoutDashboard,
  GraduationCap,
  Sparkles,
  KeyRound
} from "lucide-react";
import { AdminSignoutButton } from "@/components/admin-signout-button";

const navItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderGit2 },
  { label: "Services", href: "/admin/services", icon: Layers },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Blog", href: "/admin/blog", icon: BookOpen },
  { label: "Skills", href: "/admin/skills", icon: Sparkles },
  { label: "Timeline", href: "/admin/timeline", icon: GraduationCap },
  { label: "Security", href: "/admin/security", icon: KeyRound },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center gap-2 border-b border-white/8 py-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "border border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                : "border border-transparent text-slate-400 hover:border-white/10 hover:bg-white/5 hover:text-slate-200"
            }`}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}

      <div className="ml-auto flex items-center gap-2 pl-2">
        <AdminSignoutButton />
      </div>
    </nav>
  );
}

