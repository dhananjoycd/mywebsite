import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdminSession();
    const services = await prisma.service.findMany({
      orderBy: { orderIndex: "asc" },
    });
    return NextResponse.json({ ok: true, services });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const data = await request.json();

    const { title, slug, description, points, price, active, orderIndex } = data;

    if (!title || !description || !price) {
      return NextResponse.json(
        { ok: false, error: "Title, description and price are required" },
        { status: 400 }
      );
    }

    const serviceSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const service = await prisma.service.create({
      data: {
        title,
        slug: serviceSlug,
        description,
        points: Array.isArray(points) ? points : [],
        price,
        active: active !== undefined ? Boolean(active) : true,
        orderIndex: Number(orderIndex) || 0,
      },
    });

    revalidatePath("/");
    return NextResponse.json({ ok: true, service });
  } catch (error) {
    console.error("Create service error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to create service" },
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

    const service = await prisma.service.update({
      where: { id },
      data: {
        ...updateData,
        orderIndex: Number(updateData.orderIndex) || 0,
      },
    });

    revalidatePath("/");
    return NextResponse.json({ ok: true, service });
  } catch (error) {
    console.error("Update service error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to update service" },
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

    await prisma.service.delete({ where: { id } });

    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Delete service error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to delete service" },
      { status: 500 }
    );
  }
}

