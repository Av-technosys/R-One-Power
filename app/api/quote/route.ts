import { NextResponse } from "next/server"
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"

export const runtime = "nodejs"

const SALES_EMAIL = "sales@r1power.com"

const emailClient = new SESClient({
  region: process.env.AWS_SES_REGION,
  credentials:
    process.env.SES_AWS_ACCESS_KEY_ID && process.env.SES_AWS_SECRET_ACCESS_KEY
      ? {
          accessKeyId: process.env.SES_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.SES_AWS_SECRET_ACCESS_KEY,
        }
      : undefined,
})

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

export async function POST(req: Request) {
  try {
    const { name, email, phone, city, requirement } = await req.json()

    if (!name || !email || !phone || !city) {
      return NextResponse.json(
        { success: false, message: "All required fields must be filled" },
        { status: 400 }
      )
    }

    const quoteRequest = {
      name: String(name),
      email: String(email),
      phone: String(phone),
      city: String(city),
      requirement: requirement ? String(requirement) : "Not provided",
    }

    const AWS_REGION = process.env.AWS_SES_REGION
    const SES_EMAIL = process.env.SES_EMAIL

    if (
      !AWS_REGION ||
      !process.env.SES_AWS_ACCESS_KEY_ID ||
      !process.env.SES_AWS_SECRET_ACCESS_KEY ||
      !SES_EMAIL
    ) {
      console.warn("Email service not configured. Returning simulated success.")

      return NextResponse.json({
        success: true,
        message: "Quote request received successfully.",
      })
    }

    const customerEmailCommand = new SendEmailCommand({
      Source: SES_EMAIL,
      Destination: {
        ToAddresses: [quoteRequest.email],
      },
      ReplyToAddresses: [SES_EMAIL],
      Message: {
        Subject: {
          Charset: "UTF-8",
          Data: "We received your quote request",
        },
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `
              <h2>Thank you for contacting R-One Power</h2>
              <p>Hi ${escapeHtml(quoteRequest.name)},</p>
              <p>We received your quote request and our team will contact you soon.</p>
              <p><b>Your submitted details:</b></p>
              <p><b>Phone:</b> ${escapeHtml(quoteRequest.phone)}</p>
              <p><b>City:</b> ${escapeHtml(quoteRequest.city)}</p>
              <p><b>Requirement:</b></p>
              <p>${escapeHtml(quoteRequest.requirement)}</p>
            `,
          },
        },
      },
    })

    const salesEmailCommand = new SendEmailCommand({
      Source: SES_EMAIL,
      Destination: {
        ToAddresses: [SALES_EMAIL],
      },
      ReplyToAddresses: [quoteRequest.email],
      Message: {
        Subject: {
          Charset: "UTF-8",
          Data: `New Quote Request from ${quoteRequest.name}`,
        },
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `
              <h2>New Quote Request</h2>
              <p><b>Name:</b> ${escapeHtml(quoteRequest.name)}</p>
              <p><b>Email:</b> ${escapeHtml(quoteRequest.email)}</p>
              <p><b>Phone:</b> ${escapeHtml(quoteRequest.phone)}</p>
              <p><b>City:</b> ${escapeHtml(quoteRequest.city)}</p>
              <p><b>Requirement:</b></p>
              <p>${escapeHtml(quoteRequest.requirement)}</p>
            `,
          },
        },
      },
    })

    await Promise.race([
      Promise.all([
        emailClient.send(customerEmailCommand),
        emailClient.send(salesEmailCommand),
      ]),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Email send timeout")), 10000)
      ),
    ])

    return NextResponse.json({
      success: true,
      message: "Quote request sent successfully",
    })
  } catch (error) {
    console.error("QUOTE API ERROR:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send quote request",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
