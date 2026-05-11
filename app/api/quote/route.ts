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

    console.log(process.env.EMAIL_USER)
    console.log(process.env.EMAIL_PASS)

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
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