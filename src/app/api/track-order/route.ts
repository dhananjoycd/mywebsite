import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code")?.trim().toUpperCase();

    if (!code) {
      return NextResponse.json(
        { ok: false, error: "Tracking code is required" },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: { trackingCode: code },
      select: {
        trackingCode: true,
        clientName: true,
        serviceTitle: true,
        servicePrice: true,
        status: true,
        quotationAmount: true,
        quotationNotes: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { ok: false, error: "No order found with this tracking code." },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, order });
  } catch (error) {
    console.error("Tracking lookup error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to look up order status" },
      { status: 500 }
    );
  }
}

