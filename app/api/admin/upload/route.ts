import { NextResponse } from "next/server";
import { verifyOwnerSession } from "@/app/lib/auth";
import fs from "fs";
import path from "path";

const ALLOWED_MIME_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
  "application/pdf",
]);

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: Request) {
  const auth = await verifyOwnerSession(request);
  if (!auth.authenticated) {
    return NextResponse.json(
      { success: false, message: auth.error },
      { status: auth.statusCode }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const targetFolder = (formData.get("folder") as string) || "images"; // images | resumes | root

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: `Unsupported file type: ${file.type}. Allowed: PNG, JPEG, WEBP, GIF, PDF.`,
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: "File exceeds 10MB limit." },
        { status: 400 }
      );
    }

    // Sanitize filename
    const safeName = file.name
      .replace(/[^a-zA-Z0-9._-]/g, "_")
      .toLowerCase();

    // Determine target directory
    const publicDir = path.join(process.cwd(), "public");
    let destDir = publicDir;
    let urlPrefix = "/";

    if (targetFolder === "images") {
      destDir = path.join(publicDir, "images");
      urlPrefix = "/images/";
    } else if (targetFolder === "resumes") {
      destDir = path.join(publicDir, "resumes");
      urlPrefix = "/resumes/";
    }

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const filePath = path.join(destDir, safeName);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const assetUrl = `${urlPrefix}${safeName}`;

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      assetUrl,
      fileName: safeName,
      size: file.size,
      mimeType: file.type,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to upload file." },
      { status: 500 }
    );
  }
}

