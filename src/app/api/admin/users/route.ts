import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";

// GET: List all registered admin accounts
export async function GET() {
  try {
    await requireAdminSession();
    const admins = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ ok: true, admins });
  } catch {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}

// POST: Add new admin user
export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { ok: false, error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { ok: false, error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return NextResponse.json(
        { ok: false, error: "An admin with this email already exists" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newAdmin = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        passwordHash,
        role: "ADMIN",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ ok: true, admin: newAdmin });
  } catch (error) {
    console.error("Create admin error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to create new admin" },
      { status: 500 }
    );
  }
}

// PUT: Change current admin password
export async function PUT(request: Request) {
  try {
    const session = await requireAdminSession();
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { ok: false, error: "Current password and new password are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { ok: false, error: "New password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });

    if (!user) {
      return NextResponse.json({ ok: false, error: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { ok: false, error: "Current password is incorrect" },
        { status: 400 }
      );
    }

    const newHash = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { id: session.userId },
      data: { passwordHash: newHash },
    });

    return NextResponse.json({ ok: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to change password" },
      { status: 500 }
    );
  }
}

// DELETE: Remove an admin
export async function DELETE(request: Request) {
  try {
    const session = await requireAdminSession();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ ok: false, error: "ID required" }, { status: 400 });

    if (id === session.userId) {
      return NextResponse.json(
        { ok: false, error: "You cannot delete your own active admin account" },
        { status: 400 }
      );
    }

    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Failed to delete admin" }, { status: 500 });
  }
}

