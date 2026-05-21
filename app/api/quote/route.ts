import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const { name, email, phone, city, requirement } = await req.json()

    if (!name || !email || !phone || !city) {
      return NextResponse.json(
        { success: false, message: "All required fields must be filled" },
        { status: 400 }
      )
    }

    const EMAIL_USER = process.env.EMAIL_USER
    const EMAIL_PASS = process.env.EMAIL_PASS
    const EMAIL_TO = process.env.EMAIL_TO

    if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_TO) {
      console.warn("Email service not configured. Returning simulated success.")

      return NextResponse.json({
        success: true,
        message: "Quote request received successfully.",
      })
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    })

    const sendMailPromise = transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_TO,
      subject: `New Quote Request from ${name}`,
      html: `
        <h2>New Quote Request</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>City:</b> ${city}</p>
        <p><b>Requirement:</b></p>
        <p>${requirement || "Not provided"}</p>
      `,
    })

    await Promise.race([
      sendMailPromise,
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