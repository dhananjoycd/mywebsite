import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayoutShell from "@/components/admin-shell";
import { BlogManager } from "@/components/admin/blog-manager";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  await requireAdminSession();
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminLayoutShell>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-white">Blog Article CMS</h1>
        <p className="mt-1 text-sm text-slate-400">
          Write and publish technical articles, case studies, and engineering notes.
        </p>
      </div>

      <BlogManager initialPosts={posts} />
    </AdminLayoutShell>
  );
}

