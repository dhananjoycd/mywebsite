"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, ExternalLink, Loader2, Save, X, Calendar, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  category: string;
  readTime: string;
  published: boolean;
  createdAt: Date | string;
};

export function BlogManager({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isNew = !editingPost?.id;

  const handleOpenNew = () => {
    setEditingPost({
      title: "",
      slug: "",
      excerpt: "",
      content: "## Overview\n\nWrite your article here using markdown...",
      category: "Frontend",
      readTime: "5 min read",
      published: true,
    });
    setError(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost?.title || !editingPost.content) {
      setError("Title and article content are required.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/blog", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPost),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to save blog post");

      if (isNew) {
        setPosts([data.post, ...posts]);
      } else {
        setPosts(posts.map((p) => (p.id === data.post.id ? data.post : p)));
      }
      setEditingPost(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error saving post";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/blog?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to delete");
      setPosts(posts.filter((p) => p.id !== id));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error deleting";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-6">
        <Button onClick={handleOpenNew} className="gap-2">
          <Plus className="h-4 w-4" />
          Write Article
        </Button>
      </div>

      {editingPost && (
        <Card className="mb-8 rounded-3xl border-cyan-400/30 bg-slate-950/80 p-6 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="font-display text-lg font-semibold text-white">
              {isNew ? "Write New Article" : `Edit Article: ${editingPost.title}`}
            </h2>
            <button
              onClick={() => setEditingPost(null)}
              className="text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {error && (
            <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSave} className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-wider text-slate-400">Article Title</label>
              <input
                type="text"
                value={editingPost.title || ""}
                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                placeholder="e.g. Building Scalable Web Apps with Next.js 15"
                required
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400">Category</label>
              <input
                type="text"
                value={editingPost.category || ""}
                onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                placeholder="e.g. Frontend, Architecture, Next.js"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400">Read Time</label>
              <input
                type="text"
                value={editingPost.readTime || ""}
                onChange={(e) => setEditingPost({ ...editingPost, readTime: e.target.value })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                placeholder="e.g. 5 min read"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-wider text-slate-400">Short Excerpt / Preview</label>
              <textarea
                value={editingPost.excerpt || ""}
                onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                rows={2}
                placeholder="A short preview shown on blog cards"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-wider text-slate-400">Full Content (Markdown supported)</label>
              <textarea
                value={editingPost.content || ""}
                onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                className="mt-1 font-mono w-full rounded-xl border border-white/10 bg-slate-900 p-4 text-xs text-white focus:border-cyan-400 focus:outline-none"
                rows={10}
                placeholder="Use # Header, ## Subheader, and - bullet points"
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="publishedCheckbox"
                checked={editingPost.published !== false}
                onChange={(e) => setEditingPost({ ...editingPost, published: e.target.checked })}
                className="h-4 w-4 rounded border-white/20 bg-slate-900 text-cyan-400 focus:ring-0"
              />
              <label htmlFor="publishedCheckbox" className="text-xs text-slate-300">
                Published & Publicly Readable
              </label>
            </div>

            <div className="sm:col-span-2 flex items-center gap-3 pt-2">
              <Button type="submit" disabled={isLoading} className="gap-2">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Article
              </Button>
              <Button type="button" variant="secondary" onClick={() => setEditingPost(null)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Blog Posts List */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.id} className="flex flex-col justify-between rounded-3xl border-white/8 bg-slate-950/60 p-6">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-0.5 text-cyan-300 font-medium">
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock3 className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>

              <h3 className="mt-4 font-display text-lg font-semibold text-white">{post.title}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-300 line-clamp-3">{post.excerpt}</p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-4">
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => setEditingPost(post)}
                  className="h-8 w-8 rounded-lg"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => handleDelete(post.id)}
                  className="h-8 w-8 rounded-lg text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>

              {post.published && (
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-xs text-cyan-300 hover:underline"
                >
                  View <ExternalLink className="h-3 w-3" />
                </Link>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

