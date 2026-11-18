import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { verifyOwnerSession } from "@/app/lib/auth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyOwnerSession(request);
  if (!auth.authenticated) {
    return NextResponse.json(
      { success: false, message: auth.error },
      { status: auth.statusCode }
    );
  }

  try {
    const { id } = await params;
    const enquiryId = parseInt(id, 10);
    if (isNaN(enquiryId)) {
      return NextResponse.json(
        { success: false, message: "Invalid enquiry ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status } = body;

    const updated = await prisma.enquiry.update({
      where: { id: enquiryId },
      data: {
        ...(status ? { status: String(status).toUpperCase() } : {}),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Enquiry updated successfully",
      enquiry: updated,
    });
  } catch (error) {
    console.error("Update enquiry error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update enquiry" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyOwnerSession(request);
  if (!auth.authenticated) {
    return NextResponse.json(
      { success: false, message: auth.error },
      { status: auth.statusCode }
    );
  }

  try {
    const { id } = await params;
    const enquiryId = parseInt(id, 10);
    if (isNaN(enquiryId)) {
      return NextResponse.json(
        { success: false, message: "Invalid enquiry ID" },
        { status: 400 }
      );
    }

    await prisma.enquiry.delete({
      where: { id: enquiryId },
    });

    return NextResponse.json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    console.error("Delete enquiry error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete enquiry" },
      { status: 500 }
    );
  }
}

