import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        userId: session.userId,
        email: session.email,
        name: session.name,
        role: session.role,
      },
    });
  } catch (error) {
    console.error("Admin me endpoint error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

