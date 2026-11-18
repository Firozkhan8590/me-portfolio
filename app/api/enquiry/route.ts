import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { Resend } from "resend";

/* =========================================================
   RESEND
========================================================= */

const resend = new Resend(process.env.RESEND_API_KEY);

/* =========================================================
   ENQUIRY RATE LIMITER (In-Memory IP Limiting)
========================================================= */

const enquiryIpMap = new Map<string, { count: number; resetAt: number }>();

function checkEnquiryRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = enquiryIpMap.get(ip);
  if (!record || now > record.resetAt) {
    enquiryIpMap.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return true;
  }
  if (record.count >= 6) {
    return false;
  }
  record.count += 1;
  return true;
}

/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* =========================================================
   POST /api/enquiry
========================================================= */

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (!checkEnquiryRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many enquiries submitted from this location. Please try again in 10 minutes.",
        },
        { status: 429 }
      );
    }

    /* =====================================================
       GET REQUEST DATA
    ===================================================== */

    const body = await request.json();

    const {
      name,
      email,
      phone,
      projectType,
      budget,
      message,
      country,
      countryCode,
      currency,
    } = body;

    /* =====================================================
       REQUIRED VALIDATION
    ===================================================== */

    if (!name || !email || !projectType || !message) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name, email, project type and message are required.",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       CLEAN DATA
    ===================================================== */

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim();
    const cleanPhone = phone
      ? String(phone).trim()
      : null;

    const cleanProjectType =
      String(projectType).trim();

    const cleanBudget = budget
      ? String(budget).trim()
      : null;

    const cleanMessage =
      String(message).trim();

    const cleanCountry = country
      ? String(country).trim()
      : null;

    const cleanCountryCode = countryCode
      ? String(countryCode).trim().toUpperCase()
      : null;

    const cleanCurrency = currency
      ? String(currency).trim().toUpperCase()
      : null;

    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       SAVE TO NEON
    ===================================================== */

    const enquiry =
      await prisma.enquiry.create({
        data: {
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          projectType: cleanProjectType,
          budget: cleanBudget,
          message: cleanMessage,
          country: cleanCountry,
          countryCode: cleanCountryCode,
          currency: cleanCurrency,
        },
      });

    console.log(
      `New project enquiry saved: ${enquiry.id} (${cleanCountry || "Unknown"} / ${cleanCurrency || "USD"})`
    );

    /* =====================================================
       PREPARE EMAIL DATA
    ===================================================== */

    const emailName = escapeHtml(cleanName);
    const emailAddress = escapeHtml(cleanEmail);
    const emailPhone = cleanPhone
      ? escapeHtml(cleanPhone)
      : "Not provided";

    const emailProjectType =
      escapeHtml(cleanProjectType);

    const emailBudget =
      cleanBudget
        ? escapeHtml(cleanBudget)
        : "Not specified";

    const emailCountry =
      cleanCountry
        ? escapeHtml(cleanCountry)
        : null;

    const emailCountryCode =
      cleanCountryCode
        ? escapeHtml(cleanCountryCode)
        : null;

    const emailCurrency =
      cleanCurrency
        ? escapeHtml(cleanCurrency)
        : null;

    const emailMessage =
      escapeHtml(cleanMessage);

    /* =====================================================
       RESOLVE NOTIFICATION EMAIL
    ===================================================== */

    let recipientEmail = "firoznissar@gmail.com";
    try {
      const configRecord = await prisma.systemConfig.findUnique({
        where: { key: "portfolio_config" },
      });
      if (configRecord && configRecord.value) {
        const val = typeof configRecord.value === "string" ? JSON.parse(configRecord.value) : configRecord.value;
        if (val.enquirySettings?.notificationEmail) {
          recipientEmail = val.enquirySettings.notificationEmail;
        }
      }
    } catch {
      // Fallback to default
    }

    /* =====================================================
       SEND EMAIL VIA RESEND
    ===================================================== */

    let emailDelivered = false;
    let emailId: string | undefined = undefined;

    try {
      const emailResult = await resend.emails.send({
        from:
          "Portfolio Enquiry <onboarding@resend.dev>",

        // Resend recipient address
        to: [recipientEmail],

        // Clicking Reply will reply to the client
        replyTo: cleanEmail,

        subject:
          `New Project Enquiry - ${cleanProjectType}`,

        html: `
          <!DOCTYPE html>

          <html>
            <head>
              <meta charset="UTF-8" />

              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />

              <title>
                New Project Enquiry
              </title>
            </head>

            <body
              style="
                margin: 0;
                padding: 0;
                background-color: #f4f4f5;
                font-family: Arial, Helvetica, sans-serif;
              "
            >

              <div
                style="
                  max-width: 650px;
                  margin: 40px auto;
                  padding: 0 20px;
                "
              >

                <div
                  style="
                    background: #ffffff;
                    border: 1px solid #e4e4e7;
                    border-radius: 16px;
                    padding: 36px;
                  "
                >

                  <!-- HEADER -->

                  <p
                    style="
                      margin: 0 0 8px 0;
                      color: #7c3aed;
                      font-size: 12px;
                      font-weight: 600;
                      letter-spacing: 2px;
                      text-transform: uppercase;
                    "
                  >
                    Portfolio
                  </p>

                  <h1
                    style="
                      margin: 0 0 28px 0;
                      color: #18181b;
                      font-size: 26px;
                      line-height: 1.3;
                    "
                  >
                    New Project Enquiry
                  </h1>

                  <!-- GREETING -->

                  <p
                    style="
                      margin: 0 0 18px 0;
                      color: #27272a;
                      font-size: 15px;
                      line-height: 1.8;
                    "
                  >
                    Hi Firoz,
                  </p>

                  <!-- INTRODUCTION -->

                  <p
                    style="
                      margin: 0 0 18px 0;
                      color: #3f3f46;
                      font-size: 15px;
                      line-height: 1.8;
                    "
                  >
                    You have received a new project enquiry
                    through your portfolio website.
                  </p>

                  <!-- MAIN PARAGRAPH -->

                  <p
                    style="
                      margin: 0 0 18px 0;
                      color: #3f3f46;
                      font-size: 15px;
                      line-height: 1.8;
                    "
                  >
                    <strong style="color: #18181b;">
                      ${emailName}
                    </strong>

                    is interested in discussing a

                    <strong style="color: #18181b;">
                      ${emailProjectType}
                    </strong>

                    project and has provided an estimated
                    budget of

                    <strong style="color: #18181b;">
                      ${emailBudget}
                    </strong>.
                  </p>

                  ${emailCountry
            ? `
                  <!-- DETECTED LOCATION & CURRENCY -->
                  <div
                    style="
                      margin: 0 0 18px 0;
                      padding: 12px 16px;
                      background-color: #f8fafc;
                      border-left: 4px solid #0284c7;
                      border-radius: 6px;
                      font-size: 13px;
                      color: #334155;
                      line-height: 1.6;
                    "
                  >
                    <strong>Client Location:</strong> ${emailCountry} ${emailCountryCode ? `(${emailCountryCode})` : ""
            } &bull; <strong>Detected Currency:</strong> ${emailCurrency || "USD"
            }
                  </div>
                  `
            : ""
          }

                  <!-- CONTACT INFORMATION -->

                  <p
                    style="
                      margin: 0 0 18px 0;
                      color: #3f3f46;
                      font-size: 15px;
                      line-height: 1.8;
                    "
                  >
                    The client can be contacted through
                    <strong style="color: #18181b;">
                      ${emailAddress}
                    </strong>

                    ${cleanPhone
            ? `
                          or phone number

                          <strong style="color: #18181b;">
                            ${emailPhone}
                          </strong>.
                        `
            : "."
          }
                  </p>

                  <!-- REQUIREMENTS -->

                  <p
                    style="
                      margin: 0 0 12px 0;
                      color: #3f3f46;
                      font-size: 15px;
                      line-height: 1.8;
                    "
                  >
                    They shared the following project
                    requirements:
                  </p>

                  <!-- MESSAGE -->

                  <div
                    style="
                      margin: 0 0 22px 0;
                      padding: 18px 20px;
                      background-color: #faf7ff;
                      border-left: 4px solid #8b5cf6;
                      border-radius: 8px;
                    "
                  >

                    <p
                      style="
                        margin: 0;
                        color: #3f3f46;
                        font-size: 14px;
                        line-height: 1.8;
                        white-space: pre-wrap;
                      "
                    >
                      ${emailMessage}
                    </p>

                  </div>

                  <!-- ACTION -->

                  <p
                    style="
                      margin: 0 0 18px 0;
                      color: #3f3f46;
                      font-size: 15px;
                      line-height: 1.8;
                    "
                  >
                    Please review the enquiry and get in
                    touch with the client when convenient.
                  </p>

                  <!-- REPLY -->

                  <p
                    style="
                      margin: 0 0 8px 0;
                      color: #71717a;
                      font-size: 12px;
                      text-transform: uppercase;
                      letter-spacing: 1px;
                    "
                  >
                    Client Email
                  </p>

                  <p
                    style="
                      margin: 0 0 24px 0;
                      font-size: 15px;
                    "
                  >
                    <a
                      href="mailto:${emailAddress}"
                      style="
                        color: #7c3aed;
                        text-decoration: none;
                      "
                    >
                      ${emailAddress}
                    </a>
                  </p>

                  <!-- CLOSING -->

                  <p
                    style="
                      margin: 0;
                      color: #3f3f46;
                      font-size: 15px;
                      line-height: 1.8;
                    "
                  >
                    Best regards,
                  </p>

                </div>

                <!-- FOOTER -->

                <p
                  style="
                    margin: 18px 0 0 0;
                    text-align: center;
                    color: #a1a1aa;
                    font-size: 11px;
                  "
                >
                  This notification was generated by
                  your portfolio enquiry system.
                </p>

              </div>

            </body>
          </html>
        `,
      });

      if (emailResult.error) {
        console.error("RESEND EMAIL ERROR:", emailResult.error);
      } else {
        emailDelivered = true;
        emailId = emailResult.data?.id;
        console.log(`Project enquiry email delivered via Resend. ID: ${emailId}`);
      }
    } catch (emailError) {
      console.error("RESEND DISPATCH EXCEPTION:", emailError);
    }

    /* =====================================================
       RETURN CONFIRMATION
    ===================================================== */

    return NextResponse.json(
      {
        success: true,
        message:
          "Project enquiry submitted successfully.",
        enquiryId: enquiry.id,
        emailDelivered,
        emailId,
        country: cleanCountry,
        countryCode: cleanCountryCode,
        currency: cleanCurrency,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "ENQUIRY API ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}