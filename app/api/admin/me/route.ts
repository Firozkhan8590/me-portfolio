import { NextResponse } from "next/server";
import { verifyOwnerSession } from "@/app/lib/auth";

export async function GET(request: Request) {
  const auth = await verifyOwnerSession(request);
  if (!auth.authenticated) {
    return NextResponse.json(
      { success: false, message: auth.error },
      { status: auth.statusCode }
    );
  }

  return NextResponse.json({
    success: true,
    user: auth.user,
  });
}

