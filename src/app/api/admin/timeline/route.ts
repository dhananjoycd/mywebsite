import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";

// GET: Both experiences and educations
export async function GET() {
  try {
    await requireAdminSession();
    const [experiences, educations] = await Promise.all([
      prisma.experience.findMany({ orderBy: { orderIndex: "asc" } }),
      prisma.education.findMany({ orderBy: { orderIndex: "asc" } }),
    ]);
    return NextResponse.json({ ok: true, experiences, educations });
  } catch {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}

// POST: Add experience or education
export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const { type, data } = await request.json();

    if (type === "experience") {
      const exp = await prisma.experience.create({
        data: {
          title: data.title,
          period: data.period,
          text: data.text,
          highlights: Array.isArray(data.highlights) ? data.highlights : [],
          featured: Boolean(data.featured),
          orderIndex: Number(data.orderIndex) || 0,
        },
      });
      revalidatePath("/");
      return NextResponse.json({ ok: true, item: exp });
    }

    if (type === "education") {
      const edu = await prisma.education.create({
        data: {
          title: data.title,
          institution: data.institution,
          period: data.period,
          summary: data.summary,
          highlights: Array.isArray(data.highlights) ? data.highlights : [],
          meta: data.meta || null,
          orderIndex: Number(data.orderIndex) || 0,
        },
      });
      revalidatePath("/");
      return NextResponse.json({ ok: true, item: edu });
    }

    return NextResponse.json({ ok: false, error: "Invalid type" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Failed to create entry" }, { status: 500 });
  }
}

// PUT: Update experience or education
export async function PUT(request: Request) {
  try {
    await requireAdminSession();
    const { type, id, data } = await request.json();

    if (!id) return NextResponse.json({ ok: false, error: "ID is required" }, { status: 400 });

    if (type === "experience") {
      const exp = await prisma.experience.update({
        where: { id },
        data: {
          title: data.title,
          period: data.period,
          text: data.text,
          highlights: Array.isArray(data.highlights) ? data.highlights : undefined,
          featured: data.featured !== undefined ? Boolean(data.featured) : undefined,
        },
      });
      revalidatePath("/");
      return NextResponse.json({ ok: true, item: exp });
    }

    if (type === "education") {
      const edu = await prisma.education.update({
        where: { id },
        data: {
          title: data.title,
          institution: data.institution,
          period: data.period,
          summary: data.summary,
          highlights: Array.isArray(data.highlights) ? data.highlights : undefined,
          meta: data.meta !== undefined ? data.meta : undefined,
        },
      });
      revalidatePath("/");
      return NextResponse.json({ ok: true, item: edu });
    }

    return NextResponse.json({ ok: false, error: "Invalid type" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Failed to update entry" }, { status: 500 });
  }
}

// DELETE: Delete experience or education
export async function DELETE(request: Request) {
  try {
    await requireAdminSession();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const id = searchParams.get("id");

    if (!id || !type) return NextResponse.json({ ok: false, error: "ID and type required" }, { status: 400 });

    if (type === "experience") {
      await prisma.experience.delete({ where: { id } });
    } else if (type === "education") {
      await prisma.education.delete({ where: { id } });
    }

    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Failed to delete" }, { status: 500 });
  }
}

