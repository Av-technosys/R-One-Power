import { NextResponse } from "next/server"
import { createTransporter, FROM_ADDRESS, SALES_EMAIL } from "@/lib/mailer"

export const runtime = "nodejs"

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

    // Log which email configuration is present (do not print secrets)
    console.info("Email config:", {
      smtpConfigured: !!process.env.SMTP_USER && !!process.env.SMTP_PASS,
      smtpHost: process.env.SMTP_HOST || null,
    })

    // Use Nodemailer transporter (SMTP) for sending quote emails
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("SMTP not configured. Returning simulated success.")
      return NextResponse.json({ success: true, message: "Quote request received successfully." })
    }

    const transporter = createTransporter()

    const customerHtml = `
      <h2>Thank you for contacting R-One Power</h2>
      <p>Hi ${escapeHtml(quoteRequest.name)},</p>
      <p>We received your quote request and our team will contact you soon.</p>
      <p><b>Your submitted details:</b></p>
      <p><b>Phone:</b> ${escapeHtml(quoteRequest.phone)}</p>
      <p><b>City:</b> ${escapeHtml(quoteRequest.city)}</p>
      <p><b>Requirement:</b></p>
      <p>${escapeHtml(quoteRequest.requirement)}</p>
    `

    const salesHtml = `
      <h2>New Quote Request</h2>
      <p><b>Name:</b> ${escapeHtml(quoteRequest.name)}</p>
      <p><b>Email:</b> ${escapeHtml(quoteRequest.email)}</p>
      <p><b>Phone:</b> ${escapeHtml(quoteRequest.phone)}</p>
      <p><b>City:</b> ${escapeHtml(quoteRequest.city)}</p>
      <p><b>Requirement:</b></p>
      <p>${escapeHtml(quoteRequest.requirement)}</p>
    `

    try {
      await Promise.race([
        Promise.all([
          transporter.sendMail({
            from: FROM_ADDRESS,
            to: quoteRequest.email,
            replyTo: SALES_EMAIL,
            subject: "We received your quote request",
            html: customerHtml,
          }),
          transporter.sendMail({
            from: FROM_ADDRESS,
            to: SALES_EMAIL,
            replyTo: quoteRequest.email,
            subject: `New Quote Request from ${quoteRequest.name}`,
            html: salesHtml,
          }),
        ]),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Email send timeout")), 10000)
        ),
      ])
    } catch (err) {
      console.error("SMTP send error:", err)
      throw err
    }

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
