import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdminSession();
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ ok: true, orders });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdminSession();
    const data = await request.json();
    const { id, status, quotationAmount, quotationNotes } = data;

    if (!id) {
      return NextResponse.json({ ok: false, error: "Order ID is required" }, { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id },
      data: {
        status: status !== undefined ? status : undefined,
        quotationAmount: quotationAmount !== undefined ? quotationAmount : undefined,
        quotationNotes: quotationNotes !== undefined ? quotationNotes : undefined,
      },
    });

    return NextResponse.json({ ok: true, order });
  } catch (error) {
    console.error("Update order error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to update order" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdminSession();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ ok: false, error: "ID required" }, { status: 400 });

    await prisma.order.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Failed to delete order" }, { status: 500 });
  }
}

