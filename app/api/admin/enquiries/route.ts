import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { verifyOwnerSession } from "@/app/lib/auth";

export async function GET(request: Request) {
  const auth = await verifyOwnerSession(request);
  if (!auth.authenticated) {
    return NextResponse.json(
      { success: false, message: auth.error },
      { status: auth.statusCode }
    );
  }

  try {
    const url = new URL(request.url);
    const status = url.searchParams.get("status");
    const search = url.searchParams.get("search");

    const where: Record<string, unknown> = {};
    if (status && status !== "ALL") {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { message: { contains: search, mode: "insensitive" } },
        { projectType: { contains: search, mode: "insensitive" } },
      ];
    }

    const enquiries = await prisma.enquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    const totalCount = await prisma.enquiry.count();
    const newCount = await prisma.enquiry.count({ where: { status: "NEW" } });

    return NextResponse.json({
      success: true,
      enquiries,
      stats: {
        total: totalCount,
        new: newCount,
      },
    });
  } catch (error) {
    console.error("Admin enquiries error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve enquiries" },
      { status: 500 }
    );
  }
}

