import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import {
  verifyPassword,
  generateSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  handleFailedLogin,
  handleSuccessfulLogin,
} from "@/app/lib/auth";

// Basic in-memory IP rate limiter: max 10 requests per 5 minutes
const ipAttempts = new Map<string, { count: number; resetAt: number }>();

function checkIpRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = ipAttempts.get(ip);
  if (!record || now > record.resetAt) {
    ipAttempts.set(ip, { count: 1, resetAt: now + 5 * 60 * 1000 });
    return true;
  }
  if (record.count >= 10) {
    return false;
  }
  record.count += 1;
  return true;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (!checkIpRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many login attempts. Please wait 5 minutes and try again.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const user = await prisma.adminUser.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      // Return generic 401 to prevent email enumeration
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check account lockout
    if (user.lockedUntil && new Date() < user.lockedUntil) {
      const waitMinutes = Math.ceil(
        (user.lockedUntil.getTime() - Date.now()) / (60 * 1000)
      );
      return NextResponse.json(
        {
          success: false,
          message: `Account is temporarily locked due to repeated failed attempts. Try again in ${waitMinutes} minute(s).`,
        },
        { status: 423 }
      );
    }

    // Verify Password
    const isValid = verifyPassword(String(password), user.salt, user.passwordHash);

    if (!isValid) {
      const failed = await handleFailedLogin(user.id, user.failedLogins);
      const remainingMsg = failed.isLocked
        ? "Account has been locked for 15 minutes due to multiple failed attempts."
        : `Invalid email or password. ${failed.remainingAttempts} attempt(s) remaining before temporary lockout.`;

      return NextResponse.json(
        { success: false, message: remainingMsg },
        { status: 401 }
      );
    }

    // Reset failed login count
    await handleSuccessfulLogin(user.id);

    // Create session token
    const token = generateSessionToken();
    const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);
    const userAgent = request.headers.get("user-agent") || undefined;

    await prisma.adminSession.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
        ipAddress: ip,
        userAgent,
      },
    });

    // Create HTTP-only Secure Cookie
    const isProd = process.env.NODE_ENV === "production";
    const cookieOptions = [
      `${SESSION_COOKIE_NAME}=${encodeURIComponent(token)}`,
      "Path=/",
      "HttpOnly",
      "SameSite=Lax",
      `Max-Age=${SESSION_MAX_AGE_SECONDS}`,
    ];
    if (isProd) {
      cookieOptions.push("Secure");
    }

    const response = NextResponse.json({
      success: true,
      message: "Owner authenticated successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token, // Also return token for programmatic API usage
    });

    response.headers.set("Set-Cookie", cookieOptions.join("; "));
    return response;
  } catch (error) {
    console.error("Login endpoint exception:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error during authentication" },
      { status: 500 }
    );
  }
}

