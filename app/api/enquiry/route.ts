import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Resend } from "resend";

/* =========================================================
   PRISMA
========================================================= */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/* =========================================================
   RESEND
========================================================= */

const resend = new Resend(process.env.RESEND_API_KEY);

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
        },
      });

    console.log(
      `New project enquiry saved: ${enquiry.id}`
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

    const emailMessage =
      escapeHtml(cleanMessage);

    /* =====================================================
       SEND EMAIL
       
       IMPORTANT:
       We don't await this operation.

       This means the visitor doesn't have to wait
       for Resend to finish before getting a response.
    ===================================================== */

    void resend.emails
      .send({
        from:
          "Portfolio Enquiry <onboarding@resend.dev>",

        // Resend testing mode allows your own account email
        to: ["firoznissar@gmail.com"],

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

                    ${
                      cleanPhone
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
      })
      .then((result) => {
        if (result.error) {
          console.error(
            "RESEND EMAIL ERROR:",
            result.error
          );
        } else {
          console.log(
            "Project enquiry email sent successfully."
          );
        }
      })
      .catch((error) => {
        console.error(
          "RESEND EMAIL ERROR:",
          error
        );
      });

    /* =====================================================
       RETURN IMMEDIATELY
    ===================================================== */

    return NextResponse.json(
      {
        success: true,
        message:
          "Project enquiry submitted successfully.",
        enquiryId: enquiry.id,
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