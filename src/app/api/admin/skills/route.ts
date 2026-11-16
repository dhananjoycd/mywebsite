import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdminSession();
    const skills = await prisma.skillGroup.findMany({
      orderBy: { orderIndex: "asc" },
    });
    return NextResponse.json({ ok: true, skills });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const data = await request.json();
    const { title, items, orderIndex } = data;

    if (!title || !Array.isArray(items)) {
      return NextResponse.json({ ok: false, error: "Title and items array are required" }, { status: 400 });
    }

    const group = await prisma.skillGroup.create({
      data: {
        title,
        items,
        orderIndex: Number(orderIndex) || 0,
      },
    });

    revalidatePath("/");
    return NextResponse.json({ ok: true, group });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Failed to create skill group" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdminSession();
    const data = await request.json();
    const { id, title, items, orderIndex } = data;

    if (!id) return NextResponse.json({ ok: false, error: "ID required" }, { status: 400 });

    const group = await prisma.skillGroup.update({
      where: { id },
      data: {
        title,
        items: Array.isArray(items) ? items : undefined,
        orderIndex: orderIndex !== undefined ? Number(orderIndex) : undefined,
      },
    });

    revalidatePath("/");
    return NextResponse.json({ ok: true, group });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Failed to update skill group" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdminSession();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ ok: false, error: "ID required" }, { status: 400 });

    await prisma.skillGroup.delete({ where: { id } });
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Failed to delete skill group" }, { status: 500 });
  }
}

