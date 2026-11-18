import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { extractTokenFromRequest, SESSION_COOKIE_NAME } from "@/app/lib/auth";

export async function POST(request: Request) {
  try {
    const token = extractTokenFromRequest(request);
    if (token) {
      await prisma.adminSession.deleteMany({
        where: { token },
      });
    }

    const response = NextResponse.json({
      success: true,
      message: "Owner session logged out successfully",
    });

    // Clear session cookie
    response.headers.set(
      "Set-Cookie",
      `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
    );

    return response;
  } catch (error) {
    console.error("Logout exception:", error);
    return NextResponse.json(
      { success: false, message: "Error during logout" },
      { status: 500 }
    );
  }
}

