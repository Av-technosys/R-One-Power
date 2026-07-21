import nodemailer from "nodemailer"

/**
 * Creates a Nodemailer transporter.
 * Reads config from env variables — works with Gmail, Zoho, or any SMTP.
 *
 * Required .env.local:
 *   SMTP_HOST     = smtp.gmail.com        (or smtp.zoho.in, etc.)
 *   SMTP_PORT     = 465                   (465 for SSL, 587 for TLS/STARTTLS)
 *   SMTP_USER     = youraddress@gmail.com
 *   SMTP_PASS     = xxxx xxxx xxxx xxxx   (Gmail App Password — NOT your login password)
 *   SMTP_FROM     = "R-One Power" <youraddress@gmail.com>
 */
export function createTransporter() {
  const port = Number(process.env.SMTP_PORT) || 465

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,           // true for 465 (SSL), false for 587 (STARTTLS)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export const FROM_ADDRESS =
  process.env.SMTP_FROM ||
  `"R-One Power" <${process.env.SMTP_USER}>`

export const SALES_EMAIL = "sales@r1power.com"
