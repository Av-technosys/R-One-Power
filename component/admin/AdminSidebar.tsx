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
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#1E88E5] text-white border-r border-blue-400/30 flex flex-col justify-between transition-transform duration-300 ease-in-out font-inter shadow-xl ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Logo & Header */}
          <div className="h-16 px-6 border-b border-blue-400/30 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3 group">
              <div className="h-11 w-11 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-sm shrink-0 transition-transform group-hover:scale-105">
                <img
                  src="/admin-logo-cropped.png"
                  alt="R-One Power"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-poppins font-bold text-white text-base tracking-tight leading-tight">
                  R-one-power
                </span>
                <span className="text-xs text-blue-100 font-medium font-inter">
                  Admin Panel
                </span>
              </div>
            </Link>

            {/* Mobile Close Button */}
            {setMobileOpen && (
              <button
                onClick={() => setMobileOpen(false)}
                className="lg:hidden p-1.5 text-blue-100 hover:text-white rounded-lg hover:bg-white/10"
              >
                <IconX size={20} />
              </button>
            )}
          </div>

          {/* Nav List */}
          <div className="px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen?.(false)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    item.active
                      ? "bg-white text-[#1E88E5] shadow-md font-bold"
                      : "text-blue-100 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon size={19} className={item.active ? "text-[#1E88E5]" : "text-blue-200"} />
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
