import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdminSession();
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ ok: true, posts });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const data = await request.json();

    const { title, slug, excerpt, content, coverImage, category, readTime, published } = data;

    if (!title || !content) {
      return NextResponse.json(
        { ok: false, error: "Title and content are required" },
        { status: 400 }
      );
    }

    const postSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug: postSlug,
        excerpt: excerpt || title,
        content,
        coverImage: coverImage || null,
        category: category || "General",
        readTime: readTime || "4 min read",
        published: published !== undefined ? Boolean(published) : true,
      },
    });

    revalidatePath("/");
    revalidatePath("/blog");
    return NextResponse.json({ ok: true, post });
  } catch (error) {
    console.error("Create blog error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdminSession();
    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json({ ok: false, error: "ID is required" }, { status: 400 });
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...updateData,
      },
    });

    revalidatePath("/");
    revalidatePath("/blog");
    if (post.slug) revalidatePath(`/blog/${post.slug}`);
    return NextResponse.json({ ok: true, post });
  } catch (error) {
    console.error("Update blog error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdminSession();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ ok: false, error: "ID is required" }, { status: 400 });
    }

    await prisma.blogPost.delete({ where: { id } });

    revalidatePath("/");
    revalidatePath("/blog");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Delete blog error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}

