import { ArrowRight, BookOpen, Clock3 } from "lucide-react";

import { ClickRipple } from "@/components/click-ripple";
import { ScrollBackground } from "@/components/scroll-background";
import { Card } from "@/components/ui/card";

const posts = [
  {
    title: "How I Structure One-Page Portfolio Layouts",
    excerpt:
      "A practical look at section hierarchy, spacing, and navigation choices that make portfolio sites feel serious and easy to scan.",
    category: "Layout",
    readTime: "4 min read",
  },
  {
    title: "Designing Motion That Respects Attention",
    excerpt:
      "Why subtle transitions, measured reveals, and restrained hover states often create a more professional frontend experience.",
    category: "Animation",
    readTime: "5 min read",
  },
  {
    title: "Keeping UI Clean While Planning for Future Backend Growth",
    excerpt:
      "How to build lightweight portfolio architecture now without blocking future database, auth, or CMS expansion later.",
    category: "Architecture",
    readTime: "6 min read",
  },
];

export default function BlogPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#050b19_0%,#030816_100%)] text-slate-100">
      <ScrollBackground variant="blog" />
      <ClickRipple />
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <header className="rounded-[32px] border border-white/8 bg-slate-950/60 px-6 py-8 backdrop-blur-xl sm:px-8">
<div className="mt-8 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">Blog</p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Clean writing space for future ideas, process, and technical notes
            </h1>
            <p className="mt-4 text-base leading-8 text-slate-300">
              This page is intentionally simple, readable, and content-ready so future articles can grow without redesigning the experience.
            </p>
          </div>
        </header>

        <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.title} className="flex h-full flex-col rounded-[30px] p-6 transition hover:-translate-y-1 hover:border-white/15">
              <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.24em] text-slate-500">
                <span>{post.category}</span>
                <span className="inline-flex items-center gap-1">
                  <Clock3 className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>
              <div className="mt-6 rounded-3xl border border-white/8 bg-slate-950/40 p-4 text-cyan-300">
                <BookOpen className="h-5 w-5" />
              </div>
              <h2 className="mt-6 font-display text-2xl font-medium text-white">{post.title}</h2>
              <p className="mt-4 flex-1 text-sm leading-7 text-slate-300">{post.excerpt}</p>
              <button className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-white">
                Read article
                <ArrowRight className="h-4 w-4" />
              </button>
            </Card>
          ))}
        </section>
      </div>
    </main>
  );
}
