"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import {
  IconFileText,
  IconArrowRight,
  IconPlus,
} from "@tabler/icons-react"
import { initialBlogs, Blog } from "@/lib/adminBlogData"

export default function AdminDashboardPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    const storedBlogs = localStorage.getItem("rone_admin_blogs")
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs))
    } else {
      setBlogs(initialBlogs)
    }
  }, [])

  const publishedCount = blogs.filter((b) => !b.isDraft).length
  const draftCount = blogs.filter((b) => b.isDraft).length
  const totalCount = blogs.length

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-inter py-2">
      
      {/* Header */}
      <div>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono block mb-1">
          OVERVIEW
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-poppins text-slate-900 tracking-tight">
          Welcome to the Dashboard
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-2xl leading-relaxed">
          Here is your content overview. Monitor your published posts and manage your drafts to keep your website up to date.
        </p>
      </div>

      {/* Two Main Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Card: Active Module - Blogs */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-2xs relative flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
                  ACTIVE MODULE
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-slate-900 mt-1">
                  Blogs
                </h2>
              </div>

              {/* Pink/Red document icon badge */}
              <div className="h-11 w-11 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-600 shrink-0">
                <IconFileText size={22} />
              </div>
            </div>

            <p className="text-sm text-slate-500 mt-3 max-w-md leading-relaxed">
              Add new articles, edit existing entries, and keep content organized from the Blogs section.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-8 pt-4">
            <Link
              href="/admin/blogs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#1565C0] hover:bg-[#0D47A1] transition-all shadow-md shadow-blue-500/20 active:scale-95"
            >
              <span>Open Blogs</span>
              <IconArrowRight size={15} />
            </Link>

            <Link
              href="/admin/blogs/new"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-900 bg-white border border-slate-300 hover:bg-gray-50 transition-all active:scale-95"
            >
              <span>Add Blog</span>
              <IconPlus size={16} />
            </Link>
          </div>
        </div>

        {/* Right Card: Blog Statistics */}
        <div className="lg:col-span-5 bg-[#1565C0] text-white rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-blue-100 font-mono block mb-5">
              BLOG STATISTICS
            </span>

            {/* Metrics Dual Boxes */}
            <div className="grid grid-cols-2 gap-4">
              {/* Published */}
              <div className="bg-white/15 border border-white/25 rounded-xl p-4 backdrop-blur-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-100 font-mono block">
                  PUBLISHED
                </span>
                <span className="text-3xl sm:text-4xl font-black text-white mt-1 block font-poppins">
                  {publishedCount}
                </span>
              </div>

              {/* Drafts */}
              <div className="bg-white/15 border border-white/25 rounded-xl p-4 backdrop-blur-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-100 font-mono block">
                  DRAFTS
                </span>
                <span className="text-3xl sm:text-4xl font-black text-white mt-1 block font-poppins">
                  {draftCount}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Total Posts */}
          <div className="border-t border-blue-400/30 pt-4 mt-8 flex items-center justify-between text-xs text-blue-100 font-medium">
            <span>Total Posts</span>
            <span className="font-bold text-white text-base font-poppins">
              {totalCount}
            </span>
          </div>
        </div>

      </div>

    </div>
  )
}
