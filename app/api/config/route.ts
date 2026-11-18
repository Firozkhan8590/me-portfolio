import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { DEFAULT_PORTFOLIO_CONFIG, PortfolioConfig } from "@/app/lib/config";
import { verifyOwnerSession } from "@/app/lib/auth";

const CONFIG_KEY = "portfolio_config";

export async function GET() {
  try {
    const record = await prisma.systemConfig.findUnique({
      where: { key: CONFIG_KEY },
    });

    if (record && record.value) {
      const dbValue = typeof record.value === "string" ? JSON.parse(record.value) : record.value;
      const mergedConfig: PortfolioConfig = {
        ...DEFAULT_PORTFOLIO_CONFIG,
        ...dbValue,
        hero: {
          ...DEFAULT_PORTFOLIO_CONFIG.hero,
          ...(dbValue.hero || {}),
          animation: {
            ...DEFAULT_PORTFOLIO_CONFIG.hero.animation,
            ...(dbValue.hero?.animation || {}),
          },
          actions: {
            ...DEFAULT_PORTFOLIO_CONFIG.hero.actions,
            ...(dbValue.hero?.actions || {}),
          },
        },
        resumes: {
          ...DEFAULT_PORTFOLIO_CONFIG.resumes,
          ...(dbValue.resumes || {}),
        },
        projects: dbValue.projects || DEFAULT_PORTFOLIO_CONFIG.projects,
        skills: dbValue.skills || DEFAULT_PORTFOLIO_CONFIG.skills,
        experience: dbValue.experience || DEFAULT_PORTFOLIO_CONFIG.experience,
        services: dbValue.services || DEFAULT_PORTFOLIO_CONFIG.services,
        enquirySettings: {
          ...DEFAULT_PORTFOLIO_CONFIG.enquirySettings,
          ...(dbValue.enquirySettings || {}),
        },
        features: {
          ...DEFAULT_PORTFOLIO_CONFIG.features,
          ...(dbValue.features || {}),
        },
      };

      return NextResponse.json({
        success: true,
        source: "database",
        ...mergedConfig,
      });
    }

    // Auto-seed baseline configuration to Neon PostgreSQL if not present
    try {
      await prisma.systemConfig.upsert({
        where: { key: CONFIG_KEY },
        create: {
          key: CONFIG_KEY,
          value: JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_CONFIG)),
        },
        update: {},
      });
    } catch (seedErr) {
      console.warn("Could not seed SystemConfig in DB:", seedErr);
    }

    return NextResponse.json({
      success: true,
      source: "default",
      ...DEFAULT_PORTFOLIO_CONFIG,
    });
  } catch (error) {
    console.error("Config fetch error:", error);
    // Graceful fallback to authoritative defaults
    return NextResponse.json({
      success: true,
      source: "fallback",
      ...DEFAULT_PORTFOLIO_CONFIG,
    });
  }
}

/**
 * PATCH /api/config
 * STRICTLY OWNER-ONLY: Mutates portfolio configuration.
 * Validates Owner session and returns 401 if unauthenticated.
 */
export async function PATCH(request: Request) {
  // 1. Strict Owner Authentication Verification
  const auth = await verifyOwnerSession(request);
  if (!auth.authenticated) {
    return NextResponse.json(
      {
        success: false,
        message: auth.error || "Unauthorized: Owner session required to modify portfolio configuration.",
      },
      { status: auth.statusCode }
    );
  }

  try {
    const body = await request.json();

    const existingRecord = await prisma.systemConfig.findUnique({
      where: { key: CONFIG_KEY },
    });

    const currentConfig: PortfolioConfig = existingRecord?.value
      ? {
        ...DEFAULT_PORTFOLIO_CONFIG,
        ...(typeof existingRecord.value === "string"
          ? JSON.parse(existingRecord.value)
          : existingRecord.value),
      }
      : DEFAULT_PORTFOLIO_CONFIG;

    const updatedConfig: PortfolioConfig = {
      ...currentConfig,
      ...body,
      hero: {
        ...currentConfig.hero,
        ...(body.hero || {}),
        animation: {
          ...currentConfig.hero.animation,
          ...(body.hero?.animation || {}),
        },
        actions: {
          ...currentConfig.hero.actions,
          ...(body.hero?.actions || {}),
        },
      },
      resumes: {
        ...currentConfig.resumes,
        ...(body.resumes || {}),
      },
      projects: body.projects !== undefined ? body.projects : currentConfig.projects,
      skills: body.skills !== undefined ? body.skills : currentConfig.skills,
      experience: body.experience !== undefined ? body.experience : currentConfig.experience,
      services: body.services !== undefined ? body.services : currentConfig.services,
      enquirySettings: {
        ...currentConfig.enquirySettings,
        ...(body.enquirySettings || {}),
      },
      features: {
        ...currentConfig.features,
        ...(body.features || {}),
      },
    };

    const saved = await prisma.systemConfig.upsert({
      where: { key: CONFIG_KEY },
      create: {
        key: CONFIG_KEY,
        value: JSON.parse(JSON.stringify(updatedConfig)),
      },
      update: {
        value: JSON.parse(JSON.stringify(updatedConfig)),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Configuration updated successfully by Owner",
      config: saved.value,
    });
  } catch (error) {
    console.error("Config update error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update configuration" },
      { status: 500 }
    );
  }
}
