"use client"

import React, { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import AdminSidebar from "@/component/admin/AdminSidebar"
import { IconMenu2 } from "@tabler/icons-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    const isAuth = localStorage.getItem("rone_admin_logged_in") === "true"

    if (isLoginPage) {
      if (isAuth) {
        router.replace("/admin")
      } else {
        setIsAuthenticated(false)
      }
      return
    }

    if (isAuth) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
      router.replace("/admin/login")
    }
  }, [pathname, router, isLoginPage])

  // If on login page, render children directly without admin sidebar/shell
  if (isLoginPage) {
    return <>{children}</>
  }

  // Loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center font-inter">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-slate-300 border-t-[#1565C0] rounded-full animate-spin" />
          <span className="text-xs font-semibold text-slate-400">Verifying admin access...</span>
        </div>
      </div>
    )
  }

  // If not authenticated, return null while redirecting to /admin/login
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-inter">
      {/* Admin Sidebar */}
      <AdminSidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area (offset on desktop by sidebar width) */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Mobile-only toggle bar */}
        <div className="lg:hidden h-14 bg-white border-b border-gray-200 flex items-center px-4 justify-between">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            title="Open menu"
          >
            <IconMenu2 size={22} />
          </button>
          <span className="font-poppins font-bold text-slate-900 text-sm">
            R-One Power
          </span>
        </div>

        {/* Page Content Viewport */}
        <main className="flex-1 p-3.5 sm:p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  )
}
