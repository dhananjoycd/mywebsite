import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose/jwt/verify";

const COOKIE_NAME = "admin_session_token";
const DEFAULT_SECRET = "portfolio-admin-super-secure-jwt-secret-key-2026";

function getJwtSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET || DEFAULT_SECRET;
  return new TextEncoder().encode(secret);
}

async function isValidSession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const secret = getJwtSecret();
    const { payload } = await jwtVerify(token, secret);
    return Boolean(payload && payload.userId);
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin and /api/admin routes
  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  const isLoginPage = pathname === "/admin/login";
  const isLoginApi = pathname === "/api/admin/login";
  const isSetupApi = pathname === "/api/admin/setup"; // Initial admin creation endpoint

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const authenticated = await isValidSession(token);

  // If already logged in and visiting login page, redirect to /admin dashboard
  if (isLoginPage && authenticated) {
    const dashboardUrl = new URL("/admin", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Allow login page and login API without auth
  if (isLoginPage || isLoginApi || isSetupApi) {
    return NextResponse.next();
  }

  // If not authenticated
  if (!authenticated) {
    if (isAdminApi) {
      return NextResponse.json(
        { error: "Unauthorized. Admin session required." },
        { status: 401 }
      );
    }

    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
