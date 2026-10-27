import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only intercept /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value
  const session = await verifyAdminToken(token)
  const isAuthenticated = Boolean(session)

  const isLoginPage = pathname === "/admin/login"

  // If already authenticated and visiting /admin/login, redirect to /admin/blogs
  if (isLoginPage) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/blogs", request.url))
    }
    return NextResponse.next()
  }

  // If not authenticated and trying to access any protected /admin route, redirect to /admin/login
  if (!isAuthenticated) {
    const loginUrl = new URL("/admin/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

