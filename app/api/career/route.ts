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
    const formData = await req.formData()

    const name       = String(formData.get("name")       || "")
    const email      = String(formData.get("email")      || "")
    const phone      = String(formData.get("phone")      || "")
    const position   = String(formData.get("position")   || "")
    const experience = String(formData.get("experience") || "")
    const message    = String(formData.get("message")    || "")
    const resumeFile = formData.get("resume") as File | null

    // ── Validation ────────────────────────────────────────────────────────
    if (!name || !email || !phone || !position || !experience) {
      return NextResponse.json(
        { success: false, message: "All required fields must be filled." },
        { status: 400 }
      )
    }

    // ── Log submission always (data never lost even if email fails) ────────
    console.log("📋 New Career Application:", { name, email, phone, position, experience })

    // ── Check SMTP config ─────────────────────────────────────────────────
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("⚠️  SMTP not configured. Add SMTP_USER and SMTP_PASS to .env.local")
      return NextResponse.json({ success: true, message: "Application received successfully." })
    }

    // ── Prepare resume attachment (if uploaded) ────────────────────────────
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const attachments: any[] = []
    if (resumeFile && resumeFile.size > 0) {
      const buffer = Buffer.from(await resumeFile.arrayBuffer())
      attachments.push({
        filename: resumeFile.name,
        content:  buffer,
      })
    }

    const transporter = createTransporter()

    // ── Email 1: Notification to HR (sales@r1power.com) ───────────────────
    await transporter.sendMail({
      from:        FROM_ADDRESS,
      to:          SALES_EMAIL,
      replyTo:     email,
      subject:     `New Career Application: ${position} — ${name}`,
      attachments,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px;">
          <div style="background:#1E88E5;padding:20px 24px;border-radius:8px 8px 0 0;">
            <h1 style="color:#fff;margin:0;font-size:20px;">New Career Application</h1>
            <p style="color:#DBEAFE;margin:4px 0 0;font-size:13px;">R-One Power | Hiring</p>
          </div>

          <div style="padding:24px 0;border-bottom:1px solid #f0f0f0;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;color:#374151;">
              <tr>
                <td style="padding:8px 0;font-weight:bold;width:140px;color:#6B7280;">Full Name</td>
                <td style="padding:8px 0;">${escapeHtml(name)}</td>
              </tr>
              <tr style="background:#F9FAFB;">
                <td style="padding:8px 0;font-weight:bold;color:#6B7280;">Email</td>
                <td style="padding:8px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#1E88E5;">${escapeHtml(email)}</a></td>
              </tr>
              <tr>
                <td style="padding:8px 0;font-weight:bold;color:#6B7280;">Phone</td>
                <td style="padding:8px 0;"><a href="tel:${escapeHtml(phone)}" style="color:#1E88E5;">${escapeHtml(phone)}</a></td>
              </tr>
              <tr style="background:#F9FAFB;">
                <td style="padding:8px 0;font-weight:bold;color:#6B7280;">Position</td>
                <td style="padding:8px 0;color:#1E88E5;font-weight:bold;">${escapeHtml(position)}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;font-weight:bold;color:#6B7280;">Experience</td>
                <td style="padding:8px 0;">${escapeHtml(experience)}</td>
              </tr>
            </table>
          </div>

          ${message ? `
          <div style="padding:20px 0;border-bottom:1px solid #f0f0f0;">
            <p style="font-weight:bold;color:#6B7280;font-size:13px;margin:0 0 8px;">Cover Note</p>
            <p style="color:#374151;font-size:14px;line-height:1.6;margin:0;">${escapeHtml(message)}</p>
          </div>` : ""}

          ${attachments.length > 0 ? `
          <div style="padding:16px 0;">
            <p style="font-weight:bold;color:#6B7280;font-size:13px;margin:0 0 6px;">Resume</p>
            <p style="color:#374151;font-size:14px;margin:0;">📎 ${escapeHtml(resumeFile!.name)} — attached to this email</p>
          </div>` : `
          <div style="padding:16px 0;">
            <p style="color:#9CA3AF;font-size:13px;margin:0;">No resume uploaded.</p>
          </div>`}

          <div style="background:#F3F4F6;padding:12px 16px;border-radius:8px;margin-top:8px;">
            <p style="font-size:12px;color:#9CA3AF;margin:0;">This email was auto-generated from the R-One Power career application form.</p>
          </div>
        </div>
      `,
    })

    // ── Email 2: Confirmation to applicant ────────────────────────────────
    await transporter.sendMail({
      from:    FROM_ADDRESS,
      to:      email,
      replyTo: SALES_EMAIL,
      subject: "We received your application — R-One Power",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px;">
          <div style="background:#1E88E5;padding:20px 24px;border-radius:8px 8px 0 0;">
            <h1 style="color:#fff;margin:0;font-size:20px;">Application Received!</h1>
            <p style="color:#DBEAFE;margin:4px 0 0;font-size:13px;">R-One Power | Careers</p>
          </div>

          <div style="padding:24px 0;">
            <p style="color:#374151;font-size:15px;">Hi <strong>${escapeHtml(name)}</strong>,</p>
            <p style="color:#374151;font-size:14px;line-height:1.6;">
              Thank you for applying for the <strong style="color:#1E88E5;">${escapeHtml(position)}</strong> position at R-One Power.
              We have received your application and our HR team will review your profile personally.
            </p>
            <div style="background:#EFF6FF;border-left:4px solid #1E88E5;padding:16px;border-radius:0 8px 8px 0;margin:20px 0;">
              <p style="margin:0;font-size:14px;color:#1E40AF;font-weight:bold;">What happens next?</p>
              <ul style="margin:8px 0 0;padding-left:20px;color:#374151;font-size:13px;line-height:1.8;">
                <li>Our HR team reviews your application</li>
                <li>Shortlisted candidates are contacted within <strong>5 working days</strong></li>
                <li>Technical / HR interview round</li>
                <li>Offer letter & onboarding</li>
              </ul>
            </div>
            <p style="color:#374151;font-size:14px;">
              Questions? Email us at <a href="mailto:${SALES_EMAIL}" style="color:#1E88E5;">${SALES_EMAIL}</a> 
              or call <a href="tel:+919660077814" style="color:#1E88E5;">+91 96600 77814</a>.
            </p>
          </div>

          <div style="border-top:1px solid #f0f0f0;padding-top:16px;text-align:center;">
            <p style="color:#1E88E5;font-weight:bold;font-size:15px;margin:0;">R-One Power Team</p>
            <p style="color:#9CA3AF;font-size:12px;margin:4px 0 0;">MNRE Certified Solar EPC Company | Jaipur, Rajasthan</p>
          </div>
        </div>
      `,
    })

    console.log(`✅ Career emails sent successfully for ${name} → ${email}`)

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully.",
    })

  } catch (error) {
    console.error("CAREER API ERROR:", error)
    return NextResponse.json(
      { success: false, message: "Failed to submit application. Please try again." },
      { status: 500 }
    )
  }
}
