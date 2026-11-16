import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdminSession();
    const projects = await prisma.project.findMany({
      orderBy: { orderIndex: "asc" },
    });
    return NextResponse.json({ ok: true, projects });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const data = await request.json();

    const {
      name,
      slug,
      summary,
      highlights,
      stack,
      tone,
      image,
      liveClientUrl,
      liveServerUrl,
      githubClientUrl,
      githubServerUrl,
      featured,
      orderIndex,
    } = data;

    if (!name || !summary) {
      return NextResponse.json(
        { ok: false, error: "Name and summary are required" },
        { status: 400 }
      );
    }

    const projectSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const project = await prisma.project.create({
      data: {
        name,
        slug: projectSlug,
        summary,
        highlights: Array.isArray(highlights) ? highlights : [],
        stack: Array.isArray(stack) ? stack : [],
        tone: tone || "Featured",
        image: image || "/images/projects/foodhub.jpg",
        liveClientUrl: liveClientUrl || "#",
        liveServerUrl: liveServerUrl || "#",
        githubClientUrl: githubClientUrl || "#",
        githubServerUrl: githubServerUrl || "#",
        featured: Boolean(featured),
        orderIndex: Number(orderIndex) || 0,
      },
    });

    revalidatePath("/");
    return NextResponse.json({ ok: true, project });
  } catch (error) {
    console.error("Create project error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to create project" },
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

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...updateData,
        orderIndex: Number(updateData.orderIndex) || 0,
      },
    });

    revalidatePath("/");
    return NextResponse.json({ ok: true, project });
  } catch (error) {
    console.error("Update project error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to update project" },
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

    await prisma.project.delete({ where: { id } });

    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Delete project error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to delete project" },
      { status: 500 }
    );
  }
}

