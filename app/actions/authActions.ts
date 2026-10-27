"use server"

import { cookies } from "next/headers"
import {
  signAdminToken,
  verifyAdminToken,
  ADMIN_COOKIE_NAME,
} from "@/lib/auth"

interface LoginResult {
  success: boolean
  error?: string
}

/**
 * Authenticate admin using credentials defined in .env
 */
export async function loginAdmin(data: {
  email: string
  password: string
}): Promise<LoginResult> {
  try {
    const inputEmail = data.email?.trim().toLowerCase()
    const inputPassword = data.password?.trim()

    if (!inputEmail || !inputPassword) {
      return {
        success: false,
        error: "Please provide both ID/Email and Password.",
      }
    }

    const envEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase()
    const envPassword = process.env.ADMIN_PASSWORD?.trim()

    if (!envEmail || !envPassword) {
      console.error("ADMIN_EMAIL or ADMIN_PASSWORD is not set in environment variables")
      return {
        success: false,
        error: "Server authentication error: Admin credentials are not configured.",
      }
    }

    // Match credentials
    const isEmailValid = inputEmail === envEmail
    const isPasswordValid = inputPassword === envPassword

    if (!isEmailValid || !isPasswordValid) {
      return {
        success: false,
        error: "Invalid Admin ID or Password. Please try again.",
      }
    }

    // Generate JWT token
    const token = await signAdminToken(envEmail)

    // Set HTTP-only secure cookie
    const cookieStore = await cookies()
    cookieStore.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return { success: true }
  } catch (error) {
    console.error("Login action error:", error)
    return {
      success: false,
      error: "An unexpected error occurred during login. Please try again.",
    }
  }
}

/**
 * Logout admin by clearing the JWT session cookie
 */
export async function logoutAdmin(): Promise<{ success: boolean }> {
  try {
    const cookieStore = await cookies()
    cookieStore.delete(ADMIN_COOKIE_NAME)
    return { success: true }
  } catch (error) {
    console.error("Logout action error:", error)
    return { success: false }
  }
}

/**
 * Verify current admin session
 */
export async function getAdminSession(): Promise<{
  authenticated: boolean
  email?: string
}> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value

    if (!token) {
      return { authenticated: false }
    }

    const payload = await verifyAdminToken(token)
    if (!payload) {
      return { authenticated: false }
    }

    return { authenticated: true, email: payload.email }
  } catch {
    return { authenticated: false }
  }
}

