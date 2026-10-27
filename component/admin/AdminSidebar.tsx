"use client"

import React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  IconLayoutDashboard,
  IconFileText,
  IconX,
  IconLogout,
} from "@tabler/icons-react"

interface AdminSidebarProps {
  mobileOpen?: boolean
  setMobileOpen?: (open: boolean) => void
}

export default function AdminSidebar({
  mobileOpen = false,
  setMobileOpen,
}: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: IconLayoutDashboard,
      active: pathname === "/admin",
    },
    {
      name: "Blogs",
      href: "/admin/blogs",
      icon: IconFileText,
      active: pathname.startsWith("/admin/blogs"),
    },
  ]

  const handleLogout = () => {
    localStorage.removeItem("rone_admin_logged_in")
    document.cookie = "rone_admin_logged_in=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
    router.push("/admin/login")
  }

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen?.(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#1565C0] text-white border-r border-blue-400/30 flex flex-col justify-between transition-transform duration-300 ease-in-out font-inter shadow-xl ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Logo & Header (Full edge-to-edge white header - Logo Only) */}
          <div className="bg-white px-4 pt-0.5 pb-2 border-b border-gray-200 relative flex items-center justify-center">
            {/* Mobile Close Button */}
            {setMobileOpen && (
              <button
                onClick={() => setMobileOpen(false)}
                className="lg:hidden absolute top-1/2 -translate-y-1/2 right-2 p-1 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 z-10 cursor-pointer"
                title="Close sidebar"
              >
                <IconX size={20} />
              </button>
            )}

            <Link href="/admin" className="block group w-full">
              {/* Full Width Edge-to-Edge Logo with slight bottom breathing room */}
              <div className="flex items-center justify-center">
                <img
                  src="/admin-logo-clean.png"
                  alt="R-One Power"
                  className="h-13 w-auto max-w-[220px] object-contain transition-transform group-hover:scale-105"
                />
              </div>
            </Link>
          </div>

          {/* Admin Panel text outside white box, on blue background */}
          <div className="pt-3.5 pb-1 text-center">
            <span className="text-xs font-bold text-white tracking-widest uppercase font-inter">
              Admin Panel
            </span>
          </div>

          {/* Nav List */}
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen?.(false)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    item.active
                      ? "bg-white text-[#1565C0] shadow-md font-bold"
                      : "text-blue-100 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon size={19} className={item.active ? "text-[#1565C0]" : "text-blue-200"} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Bottom Profile / Logout section matching screenshot */}
        <div className="p-4 border-t border-blue-400/30">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-blue-100 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium cursor-pointer"
          >
            <div className="h-7 w-7 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white text-xs font-bold">
              N
            </div>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
