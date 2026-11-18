import crypto from "crypto";
import { prisma } from "@/app/lib/prisma";

export const SESSION_COOKIE_NAME = "firoz_admin_session";
export const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

/**
 * Hash password using PBKDF2 with SHA-512 and 100,000 iterations.
 */
export function hashPassword(password: string, customSalt?: string): { salt: string; hash: string } {
  const salt = customSalt || crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return { salt, hash };
}

/**
 * Verify a password against salt and expected hash using constant-time comparison.
 */
export function verifyPassword(password: string, salt: string, expectedHash: string): boolean {
  try {
    const computedHash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
    const a = Buffer.from(computedHash, "hex");
    const b = Buffer.from(expectedHash, "hex");
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/**
 * Generate a cryptographically secure random session token.
 */
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Extract session token from Request (via Cookie or Bearer header).
 */
export function extractTokenFromRequest(request: Request): string | null {
  // 1. Try Cookie
  const cookieHeader = request.headers.get("cookie");
  if (cookieHeader) {
    const cookies = cookieHeader.split(";").map((c) => c.trim());
    for (const c of cookies) {
      if (c.startsWith(`${SESSION_COOKIE_NAME}=`)) {
        return decodeURIComponent(c.substring(SESSION_COOKIE_NAME.length + 1));
      }
    }
  }

  // 2. Try Authorization Bearer
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
    return authHeader.substring(7).trim();
  }

  return null;
}

export interface AuthSuccess {
  authenticated: true;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  sessionToken: string;
}

export interface AuthFailure {
  authenticated: false;
  error: string;
  statusCode: number;
}

export type AuthResult = AuthSuccess | AuthFailure;

/**
 * Strict server-side verification of Owner session.
 * Used to protect all owner-only management endpoints.
 */
export async function verifyOwnerSession(request: Request): Promise<AuthResult> {
  try {
    const token = extractTokenFromRequest(request);
    if (!token) {
      return {
        authenticated: false,
        error: "Unauthorized: Missing authentication token",
        statusCode: 401,
      };
    }

    const session = await prisma.adminSession.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!session) {
      return {
        authenticated: false,
        error: "Unauthorized: Invalid or expired session",
        statusCode: 401,
      };
    }

    if (new Date() > session.expiresAt) {
      // Clean up expired session asynchronously
      prisma.adminSession.delete({ where: { id: session.id } }).catch(() => {});
      return {
        authenticated: false,
        error: "Unauthorized: Session has expired",
        statusCode: 401,
      };
    }

    if (session.user.role !== "OWNER") {
      return {
        authenticated: false,
        error: "Forbidden: Owner privileges required",
        statusCode: 403,
      };
    }

    return {
      authenticated: true,
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
      },
      sessionToken: token,
    };
  } catch (err) {
    console.error("Session verification failure:", err);
    return {
      authenticated: false,
      error: "Internal security verification error",
      statusCode: 500,
    };
  }
}

/**
 * Handle failed login attempts with database-level rate limiting and lockout.
 */
export async function handleFailedLogin(userId: string, currentFailed: number) {
  const newCount = currentFailed + 1;
  const lockedUntil =
    newCount >= MAX_FAILED_ATTEMPTS
      ? new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000)
      : null;

  await prisma.adminUser.update({
    where: { id: userId },
    data: {
      failedLogins: newCount,
      lockedUntil,
    },
  });

  return {
    isLocked: Boolean(lockedUntil),
    remainingAttempts: Math.max(0, MAX_FAILED_ATTEMPTS - newCount),
  };
}

/**
 * Reset failed login count on successful authentication.
 */
export async function handleSuccessfulLogin(userId: string) {
  await prisma.adminUser.update({
    where: { id: userId },
    data: {
      failedLogins: 0,
      lockedUntil: null,
    },
  });
}

