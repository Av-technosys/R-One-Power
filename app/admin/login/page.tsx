"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import {
  IconMail,
  IconLock,
  IconArrowRight,
  IconAlertCircle,
} from "@tabler/icons-react"
import { loginAdmin } from "@/app/actions/authActions"

export default function AdminLoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()

    if (!trimmedEmail || !trimmedPassword) {
      setError("Please enter both email/ID and password.")
      setLoading(false)
      return
    }

    try {
      const res = await loginAdmin({
        email: trimmedEmail,
        password: trimmedPassword,
      })

      if (!res.success) {
        setError(res.error || "Invalid credentials. Please try again.")
        setLoading(false)
      } else {
        // Redirect to admin blogs dashboard
        router.push("/admin/blogs")
        router.refresh()
      }
    } catch {
      setError("An unexpected error occurred during login. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 font-inter bg-[#F7F7F5]">
      
      {/* Left Column: Brand & Hero */}
      <div className="lg:col-span-6 xl:col-span-7 bg-[#1565C0] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top: Logo & Title */}
        <div className="flex items-center gap-3.5 relative z-10">
          <div className="h-11 w-11 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-sm shrink-0">
            <img
              src="/admin-logo-clean.png"
              alt="R-One Power"
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <span className="font-poppins font-bold text-white text-base tracking-tight leading-tight block">
              R-one-power
            </span>
            <span className="text-[11px] font-bold text-blue-100 tracking-wider uppercase font-mono block">
              ADMIN ACCESS
            </span>
          </div>
        </div>

        {/* Middle: Content Operations Statement */}
        <div className="my-16 lg:my-0 max-w-xl relative z-10">
          <span className="text-xs font-bold text-blue-100 uppercase tracking-widest block mb-4">
            CONTENT OPERATIONS
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-poppins text-white tracking-tight leading-[1.08]">
            Manage insights with calm control.
          </h1>
          <p className="text-sm sm:text-base text-blue-100 mt-6 leading-relaxed max-w-lg">
            A focused workspace for publishing engineering stories, maintaining blog content, and keeping the site journal sharp.
          </p>
        </div>

        {/* Bottom: Security Badge */}
        <div className="flex items-center gap-2.5 text-xs text-blue-100 font-medium relative z-10">
          <div className="h-7 w-7 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white font-bold text-[11px]">
            N
          </div>
          <span>Secure blog workspace</span>
          <span className="text-blue-200">/</span>
          <span className="text-white font-semibold">R-ONE Power</span>
        </div>
      </div>

      {/* Right Column: Floating Login Card */}
      <div className="lg:col-span-6 xl:col-span-5 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-lg border border-gray-100 max-w-md w-full">
          
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 font-mono">
            LOGIN
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-poppins tracking-tight">
            Welcome back.
          </h2>
          <p className="text-sm text-slate-500 mt-1 mb-8">
            Sign in to access the admin panel.
          </p>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2 font-medium">
              <IconAlertCircle size={16} className="shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Admin ID / Email
              </label>
              <div className="relative">
                <IconMail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter admin ID or email"
                  className="w-full pl-10 pr-4 py-3 bg-[#F9FAFB] border border-gray-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#1565C0] focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <IconLock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-4 py-3 bg-[#F9FAFB] border border-gray-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#1565C0] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-4 bg-[#1565C0] hover:bg-[#0D47A1] text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/25 active:scale-98 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? "Signing in..." : "Login to Admin"}</span>
              <IconArrowRight size={16} />
            </button>
          </form>

        </div>
      </div>

    </div>
  )
}
