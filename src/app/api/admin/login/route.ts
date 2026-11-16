import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSessionToken, setAdminSessionCookie, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    const passwordMatch = await verifyPassword(password, user.passwordHash);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    const payload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const token = await createSessionToken(payload);
    await setAdminSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Internal server error during login." },
      { status: 500 }
    );
  }
}

