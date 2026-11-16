import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3, Calendar, Folder } from "lucide-react";

import { ClickRipple } from "@/components/click-ripple";
import { ScrollBackground } from "@/components/scroll-background";
import { Button } from "@/components/ui/button";
import { getBlogPostBySlug, getPublishedBlogPosts } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#050b19_0%,#030816_100%)] text-slate-100">
      <ScrollBackground variant="blog" />
      <ClickRipple />

      <div className="mx-auto max-w-4xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="secondary" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>

        <article className="rounded-[32px] border border-white/8 bg-slate-950/60 p-6 backdrop-blur-xl sm:p-10">
          <header className="border-b border-white/8 pb-8">
            <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.24em] text-cyan-300">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1">
                <Folder className="h-3 w-3" />
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-400">
                <Clock3 className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-400">
                <Calendar className="h-3.5 w-3.5" />
                {formattedDate}
              </span>
            </div>

            <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">
                {post.excerpt}
              </p>
            )}
          </header>

          <div className="prose prose-invert mt-8 max-w-none text-slate-200">
            {post.content.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={index} className="mt-8 text-2xl font-semibold text-white">
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("# ")) {
                return (
                  <h1 key={index} className="mt-10 text-3xl font-bold text-white">
                    {paragraph.replace("# ", "")}
                  </h1>
                );
              }
              if (paragraph.startsWith("- ")) {
                const listItems = paragraph.split("\n").filter((li) => li.startsWith("- "));
                return (
                  <ul key={index} className="my-4 list-disc space-y-2 pl-6 text-slate-300">
                    {listItems.map((li, liIndex) => (
                      <li key={liIndex}>{li.replace("- ", "")}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="my-4 leading-7 text-slate-300">
                  {paragraph}
                </p>
              );
            })}
          </div>

          <footer className="mt-12 border-t border-white/8 pt-8">
            <div className="flex items-center justify-between">
              <Link href="/blog">
                <Button variant="secondary" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  All Articles
                </Button>
              </Link>
              <Link href="/#contact">
                <Button>
                  Let&apos;s Discuss
                </Button>
              </Link>
            </div>
          </footer>
        </article>
      </div>
    </main>
  );
}
