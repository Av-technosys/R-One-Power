"use client"

import React, { useState } from "react"
import { usePathname } from "next/navigation"
import AdminSidebar from "@/component/admin/AdminSidebar"
import { IconMenu2 } from "@tabler/icons-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  // If on login page, render children directly without admin sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>
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
        <div className="lg:hidden h-16 bg-white border-b border-gray-200/80 flex items-center px-4 justify-between sticky top-0 z-30">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 text-slate-700 hover:bg-gray-100 rounded-lg cursor-pointer"
            title="Open menu"
          >
            <IconMenu2 size={22} />
          </button>
          <img
            src="/admin-logo-dark.png"
            alt="R-ONE Power"
            className="h-8 w-auto object-contain"
          />
          <div className="w-8" />
        </div>

        {/* Page Content Viewport */}
        <main className="flex-1 p-3.5 sm:p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  )
}
