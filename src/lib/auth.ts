import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session_token";
const DEFAULT_SECRET = "portfolio-admin-super-secure-jwt-secret-key-2026";

function getJwtSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET || DEFAULT_SECRET;
  return new TextEncoder().encode(secret);
}

export type AdminSessionPayload = {
  userId: string;
  email: string;
  name: string;
  role: string;
};

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSessionToken(payload: AdminSessionPayload): Promise<string> {
  const secret = getJwtSecret();
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifySessionToken(token: string): Promise<AdminSessionPayload | null> {
  try {
    const secret = getJwtSecret();
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as AdminSessionPayload;
  } catch {
    return null;
  }
}

export async function setAdminSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAdminSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function requireAdminSession(): Promise<AdminSessionPayload> {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized: Admin access required.");
  }
  return session;
}

