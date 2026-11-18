import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const headers = new Headers(request.headers);

    // Common CDN / Hosting provider country headers
    const countryCode =
      headers.get("x-vercel-ip-country") ||
      headers.get("cf-ipcountry") ||
      headers.get("x-country-code") ||
      headers.get("cloudfront-viewer-country") ||
      headers.get("x-geoip-country");

    if (countryCode && countryCode.length === 2 && countryCode !== "XX") {
      return NextResponse.json({
        success: true,
        countryCode: countryCode.toUpperCase(),
      });
    }

    return NextResponse.json({
      success: false,
      countryCode: null,
      message: "Country header not present in current environment",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, countryCode: null, error: String(error) },
      { status: 500 }
    );
  }
}

