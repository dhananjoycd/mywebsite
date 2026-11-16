import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdminSession();
    const settings = await prisma.siteSetting.findMany();
    const map: Record<string, string> = {};
    settings.forEach((s) => {
      map[s.key] = s.value;
    });
    return NextResponse.json({ ok: true, settings: map });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const data = await request.json();

    for (const [key, value] of Object.entries(data)) {
      if (typeof key === "string" && typeof value === "string") {
        await prisma.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
      }
    }

    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Failed to update settings" }, { status: 500 });
  }
}

