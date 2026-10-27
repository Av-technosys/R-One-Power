import { SignJWT, jwtVerify } from "jose"

const JWT_SECRET_STRING =
  process.env.JWT_SECRET ||
  process.env.ADMIN_PASSWORD ||
  "ronepower-fallback-secret-key-min-32-chars-long"

const SECRET_KEY = new TextEncoder().encode(JWT_SECRET_STRING)

export interface AdminJwtPayload {
  email: string
  role: "admin"
  iat?: number
  exp?: number
}

export const ADMIN_COOKIE_NAME = "admin_token"

/**
 * Sign a JWT token for admin session (valid for 7 days)
 */
export async function signAdminToken(email: string): Promise<string> {
  return await new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_KEY)
}

/**
 * Verify the admin JWT token
 */
export async function verifyAdminToken(
  token?: string | null
): Promise<AdminJwtPayload | null> {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY, {
      algorithms: ["HS256"],
    })
    return payload as unknown as AdminJwtPayload
  } catch {
    return null
  }
}

