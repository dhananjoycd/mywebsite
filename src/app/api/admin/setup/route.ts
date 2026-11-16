import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const existingAdminCount = await prisma.user.count({
      where: { role: "ADMIN" },
    });

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid payload." },
        { status: 400 }
      );
    }

    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "dhananjoychandradas@gmail.com";
    const password = typeof body.password === "string" ? body.password : "";
    const name = typeof body.name === "string" ? body.name.trim() : "Dhananjoy Chandra Das";
    const secretProvided = request.headers.get("x-admin-secret");

    // If an admin user already exists, require the system secret
    if (existingAdminCount > 0) {
      const systemSecret = process.env.ADMIN_SECRET || process.env.ADMIN_JWT_SECRET;
      if (!systemSecret || secretProvided !== systemSecret) {
        return NextResponse.json(
          { error: "An admin user already exists. Providing valid secret is required." },
          { status: 403 }
        );
      }
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        passwordHash,
        name,
        role: "ADMIN",
      },
      create: {
        email,
        name,
        passwordHash,
        role: "ADMIN",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Admin user configured successfully.",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Admin setup error:", error);
    return NextResponse.json(
      { error: "Internal server error during admin setup." },
      { status: 500 }
    );
  }
}

