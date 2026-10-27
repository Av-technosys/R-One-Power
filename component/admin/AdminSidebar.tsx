"use client"

import React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  IconLayoutDashboard,
  IconFileText,
  IconX,
  IconLogout,
  IconShieldCheck,
  IconExternalLink,
} from "@tabler/icons-react"
import { logoutAdmin } from "@/app/actions/authActions"

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

  const handleLogout = async () => {
    try {
      await logoutAdmin()
    } finally {
      router.push("/admin/login")
      router.refresh()
    }
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
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#1565C0] text-white border-r border-blue-400/20 flex flex-col justify-between transition-transform duration-300 ease-in-out font-inter shadow-2xl ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Logo & Brand Header */}
          <div className="h-20 px-5 border-b border-white/10 flex items-center justify-between bg-black/10">
            <Link
              href="/admin"
              className="flex items-center gap-2.5 group transition-transform active:scale-98"
            >
              <img
                src="/admin-logo-white.png"
                alt="R-ONE Power"
                className="h-10 w-auto object-contain transition-transform group-hover:scale-102 drop-shadow-sm"
              />
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/30 shadow-xs">
                Admin
              </span>
            </Link>

            {/* Mobile Close Button */}
            {setMobileOpen && (
              <button
                onClick={() => setMobileOpen(false)}
                className="lg:hidden p-1.5 text-blue-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                title="Close sidebar"
              >
                <IconX size={20} />
              </button>
            )}
          </div>

          {/* Nav List */}
          <div className="px-4 py-5 space-y-6">
            <div className="space-y-1.5">
              <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-blue-200/70 font-mono block mb-2">
                Main Menu
              </span>
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileOpen?.(false)}
                    className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      item.active
                        ? "bg-white text-[#1565C0] shadow-md shadow-blue-900/20 font-bold"
                        : "text-blue-100 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon
                      size={20}
                      className={item.active ? "text-[#1565C0]" : "text-blue-200"}
                    />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>

            {/* Quick Link to Main Website */}
            <div className="pt-2 border-t border-white/10 space-y-1.5">
              <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-blue-200/70 font-mono block mb-2">
                Live Site
              </span>
              <Link
                href="/"
                target="_blank"
                className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-blue-100 hover:text-white hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <IconExternalLink
                    size={18}
                    className="text-blue-200 group-hover:text-white transition-colors"
                  />
                  <span>View Website</span>
                </div>
                <span className="text-[10px] text-blue-200/80 group-hover:text-white">
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Profile / Logout section */}
        <div className="p-4 border-t border-white/10 bg-black/10">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-white shrink-0 shadow-xs">
                <IconShieldCheck size={18} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-white truncate font-poppins">
                  Administrator
                </span>
                <span className="text-[10px] text-blue-200 truncate font-mono">
                  Super Admin
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-blue-200 hover:text-white hover:bg-white/15 rounded-lg transition-colors cursor-pointer shrink-0"
              title="Logout from Admin"
            >
              <IconLogout size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
