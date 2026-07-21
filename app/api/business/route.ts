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
    const { name, company, designation, address, mobile, service, message } =
      await req.json()

    // ── Validation ────────────────────────────────────────────────────────
    if (!name || !company || !designation || !address || !mobile || !service) {
      return NextResponse.json(
        { success: false, message: "All required fields must be filled." },
        { status: 400 }
      )
    }

    // ── Log always — data never lost even if email fails ──────────────────
    console.log("🏢 New Business Enquiry:", {
      name, company, designation, address, mobile, service,
      message: message || "(none)",
    })

    // ── No SMTP config → simulated success ───────────────────────────────
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("⚠️  SMTP not configured. Returning simulated success.")
      return NextResponse.json({ success: true, message: "Enquiry received successfully." })
    }

    const transporter = createTransporter()

    // ── Email to Sales team ───────────────────────────────────────────────
    await transporter.sendMail({
      from:    FROM_ADDRESS,
      to:      SALES_EMAIL,
      replyTo: mobile,
      subject: `New B2B Enquiry [${service}] — ${company} | ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px;">
          
          <div style="background:linear-gradient(135deg,#1E88E5,#1565C0);padding:20px 24px;border-radius:8px 8px 0 0;">
            <h1 style="color:#fff;margin:0;font-size:20px;">New Business Enquiry</h1>
            <p style="color:#DBEAFE;margin:4px 0 0;font-size:13px;">
              Service Interest: <strong style="color:#FDEA00;">${escapeHtml(service)}</strong>
            </p>
          </div>

          <div style="padding:24px 0;border-bottom:1px solid #f0f0f0;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;color:#374151;">
              <tr>
                <td style="padding:9px 0;font-weight:bold;width:160px;color:#6B7280;vertical-align:top;">Full Name</td>
                <td style="padding:9px 0;">${escapeHtml(name)}</td>
              </tr>
              <tr style="background:#F9FAFB;">
                <td style="padding:9px 0;font-weight:bold;color:#6B7280;vertical-align:top;">Company</td>
                <td style="padding:9px 0;font-weight:bold;color:#1E88E5;">${escapeHtml(company)}</td>
              </tr>
              <tr>
                <td style="padding:9px 0;font-weight:bold;color:#6B7280;vertical-align:top;">Designation</td>
                <td style="padding:9px 0;">${escapeHtml(designation)}</td>
              </tr>
              <tr style="background:#F9FAFB;">
                <td style="padding:9px 0;font-weight:bold;color:#6B7280;vertical-align:top;">Mobile</td>
                <td style="padding:9px 0;">
                  <a href="tel:${escapeHtml(mobile)}" style="color:#1E88E5;font-weight:bold;">${escapeHtml(mobile)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:9px 0;font-weight:bold;color:#6B7280;vertical-align:top;">Office Address</td>
                <td style="padding:9px 0;">${escapeHtml(address)}</td>
              </tr>
              <tr style="background:#F9FAFB;">
                <td style="padding:9px 0;font-weight:bold;color:#6B7280;vertical-align:top;">Service Interest</td>
                <td style="padding:9px 0;">
                  <span style="background:#1E88E5;color:#fff;padding:3px 12px;border-radius:20px;font-size:12px;font-weight:bold;">
                    ${escapeHtml(service)}
                  </span>
                </td>
              </tr>
            </table>
          </div>

          ${message ? `
          <div style="padding:20px 0;border-bottom:1px solid #f0f0f0;">
            <p style="font-weight:bold;color:#6B7280;font-size:13px;margin:0 0 8px;">Message</p>
            <p style="color:#374151;font-size:14px;line-height:1.6;margin:0;">${escapeHtml(message)}</p>
          </div>` : ""}

          <div style="background:#F3F4F6;padding:12px 16px;border-radius:8px;margin-top:16px;">
            <p style="font-size:12px;color:#9CA3AF;margin:0;">
              Auto-generated from R-One Power Business Portal.
            </p>
          </div>
        </div>
      `,
    })

    console.log(`✅ Business enquiry email sent — ${company} (${service})`)

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully.",
    })

  } catch (error) {
    console.error("BUSINESS API ERROR:", error)
    return NextResponse.json(
      { success: false, message: "Failed to submit enquiry. Please try again." },
      { status: 500 }
    )
  }
}
